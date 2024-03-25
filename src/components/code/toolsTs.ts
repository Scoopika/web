const code = `import { Tool } from "scoopika"

type SearchSong = {
    title?: string;
    artists?: string[];
    query: string;
    order: {
        field: "views" | "date";
        desc: boolean;
    }
}

function searchSongs({ title, artists, query, order }: SearchSong) {
    // search for the song
}

searchSongsTool = new Tool(searchSongs, {
    name: "search-songs",
    description: "Search for songs",
    pass_as_object: true,
    parameters: {
        title: {
            type: "string",
            description: "The title of the song",
            required: false,
        },
        artists: {
            type: "array",
            description: "The artists of the song",
            required: false,
        },
        query: {
            type: "string",
            description: "The query to search for",
            required: true,
        },
        order: {
            type: "object",
            description: "The order of the results",
            required: true,
            properties: {
                field: {
                    type: "string",
                    description: "The field to order by",
                    required: true,
                    accept: ["views", "date"],
                    default: "views",
                },
                desc: {
                    type: "boolean",
                    description: "Whether to sort in descending order",
                    required: true,
                    default: true,
                }
            }
        }
    }
})

// in real cases should be +2 tools
tools = [searchSongsTool]

// export the tools
export { tools }
`;

export default code;
