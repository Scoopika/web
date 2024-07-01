import { Agent, Client } from "@scoopika/client";
import {
  AgentRunHistory,
  AudioRes,
  Hooks,
  LLMToolCall,
  RunHistory,
  RunInputs,
  RunOptions,
  UserRunHistory,
} from "@scoopika/types";
import { useState } from "react";

export interface UseChatStateOptions {
  session_id?: string;
  user_id?: string;
  agent_name?: string;
  scroll?: () => any;
  auto_play_audio?: boolean;
}

function sleep(ms?: number) {
  if (typeof ms !== "number") {
    ms = 0;
  }

  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const setupRequest = (
  session_id: string,
  inputs: RunInputs,
  run_id?: string,
  user_id?: string,
) => {
  const req: UserRunHistory = {
    role: "user",
    at: Date.now(),
    session_id,
    run_id: run_id || crypto.randomUUID(),
    user_id,
    request: inputs,
    resolved_message: "PLACEHOLDER",
  };

  return req;
};

const agentPlaceholder = ({
  id,
  session_id,
  run_id,
  name,
  audio,
  tools_calls,
  content,
}: {
  id: string;
  session_id: string;
  run_id: string;
  audio: AudioRes[];
  tools_calls: { call: LLMToolCall; result: any }[];
  name?: string;
  content: string;
}) => {
  const placeholder: AgentRunHistory = {
    role: "agent",
    at: Date.now(),
    session_id,
    run_id,
    agent_id: id,
    agent_name: name || "",
    tools: [],
    response: {
      run_id,
      session_id,
      audio,
      tools_calls,
      content,
    },
  };

  return placeholder;
};

const sortedMessages = (messages: RunHistory[]) =>
  messages.sort((a, b) => a.at - b.at);

export function useChatState(
  client: Client,
  agent: Agent,
  state_options?: UseChatStateOptions,
) {
  const [clientInstance] = useState(client);
  const [agentInstance] = useState(agent);

  // state
  const [session, setSession] = useState<string>(
    state_options?.session_id ?? "session_" + crypto.randomUUID(),
  );
  const [status, setStatus] = useState<string | undefined>();
  const [generating, setGenerating] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<RunHistory[]>([]);
  const [streamPlaceholder, setStreamPlaceholder] = useState<
    AgentRunHistory | undefined
  >(undefined);

  const changeSession = async (session?: string) => {
    const id = session ?? crypto.randomUUID();
    const runs = await clientInstance.store.getSessionRuns(id);
    setSession(id);
    setMessages(runs);
  };

  const newRequest = async ({
    inputs,
    options,
    hooks,
  }: {
    inputs: RunInputs;
    options?: RunOptions;
    hooks?: Hooks;
  }) => {
    try {
      while (generating || loading) {
        await sleep(5);
      }

      setLoading(true);
      options = { ...(options || {}) };
      options.session_id = session;
      const request = setupRequest(session, inputs, options?.run_id);
      let run_id = request.run_id;

      setStreamPlaceholder(
        agentPlaceholder({
          id: agent.id,
          session_id: session,
          run_id,
          audio: [],
          content: "",
          tools_calls: [],
        }),
      );
      setMessages((prev) => [...sortedMessages(prev), request]);
      setStatus("Thinking...");

      const all_hooks: Hooks = {
        ...(hooks || {}),
        onStart: (info) => {
          run_id = info.run_id;
          if (state_options?.scroll) state_options.scroll();
        },
        onToken: (token) => {
          if (loading) setLoading(false);
          if (!generating) setGenerating(true);
          if (status) setStatus(undefined);

          setStreamPlaceholder((prev) => {
            if (!prev) return;
            return {
              ...prev,
              response: {
                ...prev.response,
                content: prev.response.content + token,
              },
            };
          });

          if (hooks?.onToken) hooks.onToken(token);
          if (state_options?.scroll) state_options.scroll();
        },
        onToolCall: (call) => {
          setStatus(`Talking with ${call.function.name}`);
          if (hooks?.onToolCall) hooks.onToolCall(call);
        },
        onToolResult: (res) => {
          setStatus(undefined);
          setStreamPlaceholder((prev) => {
            if (!prev) return;

            return {
              ...prev,
              tools: [...prev.tools, res],
              response: {
                ...prev.response,
                tools_calls: [...prev.response.tools_calls, res],
              },
            };
          });
          if (hooks?.onToolResult) hooks.onToolResult(res);
        },
        onFinish: async () => {
          setStatus(undefined);
          const messages = await clientInstance.store.getSessionRuns(session);
          setStreamPlaceholder(undefined);
          setMessages(sortedMessages(messages));
        },
      };

      const response = await agentInstance.run({
        inputs,
        options,
        hooks: all_hooks,
      });

      return response;
    } catch (err: any) {
      if (hooks?.onError)
        hooks.onError({
          healed: false,
          error: typeof err.message ?? "Unexpected error",
        });
      console.error(err);
    } finally {
      setStatus(undefined);
      setLoading(false);
      setGenerating(false);
      const messages = await clientInstance.store.getSessionRuns(session);
      setMessages(messages);
      if (state_options?.scroll) state_options.scroll();
    }
  };

  return {
    generating,
    loading,
    status,
    streamPlaceholder,

    messages,
    newRequest,
    agent,

    session,
    changeSession,
  };
}
