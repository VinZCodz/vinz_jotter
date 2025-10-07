import { StateGraph } from "@langchain/langgraph"
import { WriterState } from "./state.ts"
import * as model from "./model.ts"
import { PromptTemplate } from "@langchain/core/prompts";
import fs from "fs/promises";

const THRESHOLD_GRADE = 80;

const Writer = async (state: typeof WriterState.State) => {
    console.log(`\n\n------------WriterAgent--------------`);

    const promptFromTemplate = PromptTemplate.fromTemplate((await fs.readFile("./src/backend/writer/prompt/writer.txt", "utf-8")));
    const formattedPrompt = await promptFromTemplate.format({
        researchData: state.researchData,
        draft: state.draft ?? "",
        grade: state.grade ?? 0,
        feedbacks: state.feedbacks ?? []
    });

    const response = await model.WriterModel.invoke([formattedPrompt, ...state.messages]);

    console.log(response.content);
    
    return { draft: response.content }
}

const Critique = async (state: typeof WriterState.State) => {
    console.log(`\n\n------------CritiqueAgent--------------`);

    const promptFromTemplate = PromptTemplate.fromTemplate((await fs.readFile("./src/backend/writer/prompt/critique.txt", "utf-8")));
    const formattedPrompt = await promptFromTemplate.format({ draft: state.draft });

    const response = await model.CritiqueModel.invoke(
        [formattedPrompt, ...state.messages],
        { response_format: { type: 'json_object' } }
    );

    return JSON.parse(response.content as string);
}

const isDraftReady = async (state: typeof WriterState.State) => {
    console.log(JSON.stringify(state));
    return "__end__";

    if (state.grade < THRESHOLD_GRADE) {
        return "Writer";
    }
    else {
        return "__end__"
    }
}

const graph = new StateGraph(WriterState)
    .addNode("Writer", Writer)
    .addNode("Critique", Critique)
    .addEdge("__start__", "Writer")
    .addEdge("Writer", "Critique")
    .addConditionalEdges("Critique", isDraftReady);

export const WriterAgent = graph.compile();