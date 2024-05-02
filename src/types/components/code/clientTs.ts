const code = `import { Client, loadSecret } from "scoopika"
import { tools } from "./tools" // where the tools are defined

// Initialize the client
client = new Client({
    token: "SCOOPIKA_TOKEN",
    tools: tools,
    llm: {
        host: "together", 
        api_key: loadSecret("TOGETHER_KEY"), // load from platform
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1"
    },
})

// Invoke the client
client.invoke({
    input: "Look up most popular remixes for Get Lucky by Daft Punk",
})

// The invoke will run the tool "search-songs" and return its result
// arguments:
// title="Get Lucky"
// artists=["Daft Punk"]
// query="popular remixes for Get Lucky"
// order={"field": "views", "desc": true}
`;

export default code;
