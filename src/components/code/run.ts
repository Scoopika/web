const code = `import { Scoopika, Agent } from '@scoopika/scoopika'

const scoopika = new Scoopika()
const agent = new Agent('ID', scoopika)

agent.run({
    inputs: {
        message: "Schedule a call..",
        audio: [],
        images: [],
        urls: []
    },
    hooks: {
        onToken: (token) => {...},
        onToolCall: (call) => {...},
    }
})`;

export default code;
