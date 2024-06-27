import {
  Agent,
  Client,
  RunAudioPlayer,
  VoiceRecorder,
  VoiceVisualizer,
} from "@scoopika/client";
import { UseChatStateOptions, useChatState } from "./state";
import { useEffect, useState } from "react";
import { Hooks, RunInputs, RunOptions } from "@scoopika/types";

export interface UseVoiceChatStateOptions extends UseChatStateOptions {
  auto_play_audio?: boolean;
  agent_voice?: {
    audio: HTMLAudioElement | string;
    canvas: HTMLCanvasElement | string;
    wave_color?: string;
  };
}

function useVoiceChatState(
  client: Client,
  agent: Agent,
  state_options?: UseVoiceChatStateOptions
) {
  const [chatState] = useState(useChatState(client, agent, state_options));
  const [agentVoicePlayer, setAgentVoicePlayer] = useState<RunAudioPlayer>();
  const [voiceRecorder, setVoiceRecorder] = useState<VoiceRecorder>();
  const [playing, setPlaying] = useState<boolean>(false);
  const [visualizer, setVisualizer] = useState<VoiceVisualizer | null>(null);
  const [recorderState, setRecorderState] = useState<
    "recording" | "paused" | "stopped"
  >("stopped");
  const [playerPaused, setPlayerPaused] = useState<boolean>(false);
  const [working, setWorking] = useState<boolean>(false);
  const [recognizedText, setRecognizedText] = useState<string>("");
  const [supportRecognition, setSupportRecognition] = useState<boolean | null>(
    null
  );

  const pauseAgent = () => {
    if (!agentVoicePlayer) return;
    agentVoicePlayer.pause();
    setPlayerPaused(true);
  };

  const resumeAgent = () => {
    if (!agentVoicePlayer) return;
    agentVoicePlayer.resume();
    setPlayerPaused(false);
  };

  const updateRecognizedText = (text: string) => {
    if (voiceRecorder) voiceRecorder.stop();
    if (voiceRecorder) voiceRecorder.text = text;
    setRecognizedText(text);
  };

  useEffect(() => {
    const visualize = state_options?.agent_voice;
    setVoiceRecorder(
      new VoiceRecorder({
        onStateChange: (state) => setRecorderState(state),
        onText: (text) => setRecognizedText(text),
      })
    );

    if (voiceRecorder) {
      setSupportRecognition(voiceRecorder.recognition !== null);
    }

    if (visualize) {
      setVisualizer(
        new VoiceVisualizer(
          visualize.audio,
          visualize.canvas,
          visualize.wave_color
        )
      );
    }
  }, []);

  const newRequest = async ({
    inputs,
    options,
    hooks,
  }: {
    inputs?: RunInputs;
    options?: RunOptions;
    hooks?: Hooks;
  } = {}) => {
    try {
      if (agentVoicePlayer?.started) {
        agentVoicePlayer.pause();
        setPlaying(false);
        setPlayerPaused(false);
      }

      let player: RunAudioPlayer | null = null;

      if (voiceRecorder) voiceRecorder.stop();

      if (!inputs && voiceRecorder) {
        inputs = await voiceRecorder.asRunInput();
      }

      if (!inputs) {
        throw new Error("No inputs provided to be processed by the agent");
      }

      setWorking(true);
      options = { voice: true, ...(options || {}) };
      if (state_options?.agent_voice) {
        player = new RunAudioPlayer(state_options.agent_voice.audio);
        setAgentVoicePlayer(player);
      }

      if (visualizer) visualizer.getReady();

      const all_hooks: Hooks = {
        ...(hooks || {}),
        onAudio: (stream) => {
          if (state_options?.auto_play_audio !== false) {
            setPlaying(true);
            if (player) player.queue(stream);
          }

          if (hooks?.onAudio) hooks.onAudio(stream);
        },
      };

      const response = await chatState.newRequest({
        inputs,
        options,
        hooks: all_hooks,
      });

      setWorking(false);
      if (player && response) await player.finish(response.audio.length);

      setPlaying(false);
      return response;
    } finally {
      setWorking(false);
      setPlaying(false);
    }
  };

  return {
    ...chatState,
    voiceRecorder,
    setVoiceRecorder,

    playing,
    setPlaying,

    agentVoicePlayer,
    setAgentVoicePlayer,

    newRequest,

    visualizer,
    setVisualizer,

    recorderState,
    setRecorderState,

    recognizedText,
    setRecognizedText,

    supportRecognition,
    setSupportRecognition,

    updateRecognizedText,

    working,
    setWorking,

    pauseAgent,
    resumeAgent,

    playerPaused,
    setPlayerPaused,
  };
}

export default useVoiceChatState;
