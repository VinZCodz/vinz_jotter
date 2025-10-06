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

    { role: "user", content: `${state.topic}`}
    const response = await model.ResearcherModel.invoke(
        [researcherPrompt, ],
    );

    return JSON.parse(response.content as string);
}
const Tools = new ToolNode(availableTools);

const callModel = async (state) => {
    const response = await model.invoke(state.messages);
    return { messages: [response] };
}

const isToolCall = ({ messages }) => {
    const lastMessages = messages.at(-1);
    if (lastMessages.tool_calls?.length)
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