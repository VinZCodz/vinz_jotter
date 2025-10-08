import { StateGraph } from "@langchain/langgraph"
import { AnalyzerState } from "./state.ts"
import *  as model from "./model.ts"
import fs from "fs/promises";
import { PromptTemplate } from "@langchain/core/prompts";

const Analyzer = async (state: typeof AnalyzerState.State) => {
    console.log(`\n\n------------AnalyzerAgent--------------`);

    const promptFromTemplate = PromptTemplate.fromTemplate((await fs.readFile("./src/backend/analyzer/prompt/analyzer.txt", "utf-8")));
    const formattedPrompt = await promptFromTemplate.format({ researchData: state.researchData });

    const response = await model.AnalyzerModel.invoke([formattedPrompt, ...state.messages],
        { response_format: { type: 'json_object' } }
    );

    return JSON.parse(response.content as string);
}

const graph = new StateGraph(AnalyzerState)
    .addNode("Analyzer", Analyzer)
    .addEdge("__start__", "Analyzer")
    .addEdge("Analyzer", "__end__")

export const AnalyzerAgent = graph.compile();