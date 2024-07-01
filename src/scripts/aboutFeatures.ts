const aboutFeatures: Record<string, string> = {
  loads:
    "When you run an agent from your app it needs to be loaded from our platform to your server or device, this is called an agent load. this is cached and only executed every ~15 times when running a Scoopika endpoint (cache timing is configurable)",
  speech:
    "Agents in Scoopika can speak (return audio output in real-time). the audio output is measured by character. notice that audio input is not included here and only agent 'audio' output counts to this",
  store:
    "You can connect your agent with a Serverless data store to save chat sessions and keep track of history. you can assign sessions to users, list sessions, and sessions messages easily from both server-side and client-side",
  store_read:
    "You can connect your agent with a Serverless data store to save chat sessions and keep track of history. each time you read a session, list a user sessions, or read a session message it counts towards read operations. 4Kb of read data = 1 operation",
  store_write:
    "You can connect your agent with a Serverless data store to save chat sessions and keep track of history. once you start running your agent with a connected store It will start using it to save chat messages (user request and agent response). 1Kb of written data = 1 operation",
  knowledge:
    "You can connect your agents with custom knowledge (PDF files for example). Everytime you run an agent that has custom knowledge it counts as a request to our vector database to retreive information using RAG. if you hit the monthly limit, the cached knowledge will not be available for the agent until the next month",
  listen:
    "When you send an audio into an agent run (for voice chatting for example), Scoopika needs to extract text from the audio to pass it to the agent, this is called an audio input process. There is fast mode (~2s latency) and slow mode (~10s latency). The free plan supports only slow mode (slow mode is always unlimited), while paid plans support a number of minuts/month for fast mode. once you reach the limit for fast mode it will fallback to slow mode untill the next month",
  tools:
    "You can equip your agents with tools that they can use to perform actions or fetch data. API tools are tools added from the platform with no-code and can be used by the agent to communicate with external APIs, while custom functions are functions passed to the agent from your code and can be used for anything you want the agent to do. (supports server-side & client-side tools)",
};

export default aboutFeatures;
