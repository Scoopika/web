const code = `import { Client, Tasks, VectorStore } from "scoopika"
import { tools } from "./tools" // function-calling tools are defined
import db from "./db" // where the database is defined

// Initialize the vector store with your database (eg. Upstash Vector)
vectorStore = new VectorStore({ db })

// Use with function calling client for history
client = new Client({
    token: "SCOOPIKA_TOKEN",
    tools: tools,
    stores: {main: vectorStore},
    llm: {
        host: "together", 
        api_key: "TOGETHER_KEY",
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1"
    },
})

client.invoke({
    input: "Search for Get Lucky by Daft Punk",
    options: {
        store: "main",
        session: "session_123"
    }
})

client.invoke({
    input: "Look up most recent remixes for the song I just searched for",
    options: {
        store: true,
        storeName: "main",
        session: "session_123"
    }
})

// Use with tasks
const tasks = new Tasks({
    token: "SCOOPIKA_TOKEN",
    stores: {main: vectorStore},
    llm: {
        api_key: "OPENAI_API_KEY",
        model: "gpt-3.5-turbo",
    }
});
`;

export default code;
