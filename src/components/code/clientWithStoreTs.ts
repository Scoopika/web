const code = `import { Client, loadSecret, VectorStore } from "scoopika"
import { tools } from "./tools" // where the tools are defined
import db from "./db" // where the database is defined

// Initialize the vector store with your database (eg. Upstash Vector)
vectorStore = new VectorStore({ db })

// Initialize the client
client = new Client({
    token: "SCOOPIKA_TOKEN",
    tools: tools,
    stores: {main: vectorStore},
    llm: {
        host: "together", 
        api_key: loadSecret("TOGETHER_KEY"), // load from platform
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1"
    },
})

// First invoke
client.invoke({
    input: "Search for Get Lucky by Daft Punk",
    options: {
        store: "main",
        session: "session_123"
    }
})

// Second invoke
client.invoke({
    input: "Look up most recent remixes for the song I just searched for",
    options: {
        store: "main",
        session: "session_123"
    }
})

// First invoke:
// The invoke will run the tool "search-songs" and return its result
// arguments:
// title="Get Lucky"
// artists=["Daft Punk"]
// query="Get Lucky by Daft Punk"
// order={"field": "views", "desc": true} (default values)

// Second invoke:
// The invoke will run the tool "search-songs" and return its result
// arguments:
// title="Get Lucky"
// artists=["Daft Punk"]
// query="popular remixes for Get Lucky by Daft Punk"
// order={"field": "date", "desc": true}
`;

export default code;
