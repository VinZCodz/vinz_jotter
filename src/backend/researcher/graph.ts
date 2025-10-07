import { StateGraph } from "@langchain/langgraph"
import { ResearcherState } from "./state.ts"
import *  as model from "./model.ts"
import fs from "fs/promises";
import { availableTools } from "./tools.ts";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import type { AIMessage } from "@langchain/core/messages";

const researcherPrompt = { role: "system", content: (await fs.readFile("./src/backend/researcher/prompt/researcher.txt", "utf-8")) };

const Researcher = async (state: typeof ResearcherState.State) => {
    console.log(`\n\n------------ResearchAgent--------------`);

    const response = await model.ResearcherModel.invoke([researcherPrompt, ...state.messages]);
    return { messages: response, researchData: response.content };
}

const Tools = new ToolNode(availableTools);

const isToolCall = (state: typeof ResearcherState.State) => {
    const lastResponse = state.messages.at(-1) as AIMessage;
    
    if (lastResponse.tool_calls?.length)
        return "Tools";
    else
        return "__end__"
}

const graph = new StateGraph(ResearcherState)
    .addNode("Researcher", Researcher)
    .addEdge("__start__", "Researcher")
    .addNode("Tools", Tools)
    .addConditionalEdges("Researcher", isToolCall)
    .addEdge("Tools", "Researcher")

export const ResearchAgent = graph.compile();