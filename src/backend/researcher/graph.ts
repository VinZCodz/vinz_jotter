import { PromptTemplate } from "@langchain/core/prompts";
import { StateGraph } from "@langchain/langgraph"
import { ResearcherState } from "./state.ts"
import *  as model from "./model.ts"
import fs from "fs/promises";
import { availableTools } from "./tools.ts";
import { ToolNode } from "@langchain/langgraph/prebuilt";

const researcherPrompt = { role: "system", content: (await fs.readFile("./src/backend/researcher/prompt/researcher.txt", "utf-8")) };

const Researcher = async (state: typeof ResearcherState.State) => {
    console.log(`\n\n------------ResearcherAgent--------------`);

    const response = await model.ResearcherModel.invoke([researcherPrompt,state.messages]);
    return {researchData: response.content};
}

const Tools = new ToolNode(availableTools);

const isToolCall = ({ messages }) => {
    if (messages.at(-1).tool_calls?.length)
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

export const ResearcherAgent = graph.compile();