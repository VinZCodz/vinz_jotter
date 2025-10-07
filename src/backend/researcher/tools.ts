import { TavilySearch } from "@langchain/tavily";

const search = new TavilySearch({
    maxResults: 20,
    topic: "general",
});

export const availableTools = [
    search
];