import { TavilySearch } from "@langchain/tavily";

const search = new TavilySearch({
    maxResults: 10,
    topic: "general",
});

export const availableTools = [
    search
];