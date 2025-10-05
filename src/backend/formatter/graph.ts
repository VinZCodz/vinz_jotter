import { StateGraph } from "@langchain/langgraph"
import { ReflectionState } from "./state.ts"
import * as model from "./model.ts"
import { PromptTemplate } from "@langchain/core/prompts";
import fs from "fs/promises";


const Writer = async (state: typeof ReflectionState.State) => {
    console.log(`\n\n------------ResearcherAgent--------------`);

}

const graph = new StateGraph()

export const ResearcherAgent = graph.compile();