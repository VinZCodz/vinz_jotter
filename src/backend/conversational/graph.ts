import { StateGraph, MemorySaver } from "@langchain/langgraph"
import { ConversationState } from "./state.ts"
import { SupervisorAgent } from "../supervisor/graph.ts"
import * as model from "./model.ts"
import fs from "fs/promises";

const conversationPrompt = { role: "system", content: (await fs.readFile("./src/backend/conversational/prompt/conversational.txt", "utf-8")) };

const Conversation = async (state: typeof ConversationState.State) => {
    console.log(`\n------------Conversation--------------`);

    const response = await model.ConversationModel.invoke(
        [conversationPrompt, ...state.messages],
        { response_format: { type: 'json_object' } }
    );

    return JSON.parse(response.content as string);
}

const isReadyToHandoff = (state: typeof ConversationState.State) => {
    switch (state.isInfoCollected) {
        case true:
            return "SupervisorHandoff";
        case false:
            return "__end__";
        default:
            return "__end__";
    }
}

const SupervisorHandoff = async (state: typeof ConversationState.State) => {
    console.log(`\n\n------------SupervisorHandoff--------------`);
    const response = await SupervisorAgent.invoke({ state.topic, state.audience, state.tone, state.depth, state.formatting });
    return { messages: response.finalWriteUp };
};

const processPostWriteUp = async (state: typeof ConversationState.State) => {
    console.log(`\n\n------------processPostWriteUp--------------`);
    // Clear the state.
    return "__end__";
};

const graph = new StateGraph(ConversationState)
    .addNode("Conversation", Conversation)
    .addEdge("__start__", "Conversation")
    .addNode("SupervisorHandoff", SupervisorHandoff)
    .addConditionalEdges("Conversation", isReadyToHandoff)
    .addConditionalEdges("SupervisorHandoff", processPostWriteUp)

export const JotterAgent = graph.compile({ checkpointer: new MemorySaver() });