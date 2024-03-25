const code = `import { Tasks } from "scoopika";
import search from "./search"; // a search function

const tasks = new Tasks({
    token: "SCOOPIKA_TOKEN",
    llm: {
        host: "openai",
        api_key: "OPENAI_API_KEY",
        model: "gpt-3.5-turbo",
    }
});

// Summarize is Built in
tasks.run("summarize", "TEXT TO SUMMARIZE");

// Add a custom task (method 1)
tasks.extend(search, {
    name: "search",
    description: "Search something",
    type: "function",
    parameters: {
        query: {
            type: "string",
            description: "The query to search for",
            required: true,
        },
        engine: {
            type: "string",
            description: "The search engine to use",
            required: true,
            default: "google",
            accept: ["google", "bing", "duckduckgo"],
        }
    },
})

// Run the task
tasks.run("search", {
    input: "Search for Scoopika on Google",
})

// Add a custom task (method 2)
tasks.extend(search, {
    name: "custom_summarize",
    description: "Summarize something",
    type: "prompt",
    prompt: "Summarize: <input>",
})

// Run the task
tasks.run("custom_summarize", {
    input: "TEXT TO SUMMARIZE",
})
`;

export default code;
