const code = `agent.run({
    inputs: {
        message: "Schedule a call...",
    },
    hooks: {
        onToken: (token) => {...},
        onToolCall: (call) => {...},
    }
})`;

export default code;
