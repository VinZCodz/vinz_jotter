import { PromptTemplate } from "@langchain/core/prompts";
import { StateGraph } from "@langchain/langgraph"
import { SupervisorState } from "./state.ts"
import { ResearchAgent } from "../researcher/graph.ts"
import { AnalyzerAgent } from "../analyzer/graph.ts"
import { WriterAgent } from "../writer/graph.ts"
// import { FormatterAgent } from "../formatter/graph.ts"
import *  as model from "./model.ts"
import fs from "fs/promises";

const Supervisor = async (state: typeof SupervisorState.State) => {
    console.log(`\n\n------------Supervisor: Assigning Task to Next Agent--------------\n\n`);

    const promptFromTemplate = PromptTemplate.fromTemplate((await fs.readFile("./src/backend/supervisor/prompt/supervisor.txt", "utf-8")));
    const formattedPrompt = await promptFromTemplate.format({
        isResearchDone: !!state.researchData,
        isAnalysesDone: !!state.keyFeatures,
        isFinalDraftDone: !!state.finalDraft,
        isFinalWriteUpDone: !!state.finalWriteUp
    });

    const response = await model.SupervisorModel.invoke(
        [formattedPrompt],
        { response_format: { type: 'json_object' } }
    );

    return JSON.parse(response.content as string);
}

const ResearcherHandoff = async (state: typeof SupervisorState.State) => {
    console.log(`------------Researching!--------------`);

    const { researchData } = await ResearchAgent.invoke({ messages: [{ role: "user", content: JSON.stringify(state, ['topic', 'audience', 'depth'])}] });
    return { researchData, nextAgent: 'Supervisor' };
}

const AnalyzerHandoff = async (state: typeof SupervisorState.State) => {
    console.log(`------------Analyzing!--------------`);

     const { keyFeatures, hookLines } = await AnalyzerAgent.invoke({ messages: [{ role: "user", content: JSON.stringify(state, ['topic', 'audience', 'depth', 'tone'])}], researchData: state.researchData});
    return { keyFeatures,hookLines, nextAgent: 'Supervisor' };
}

const WriterHandoff = async (state: typeof SupervisorState.State) => {
    console.log(`------------Writing!--------------`);

    const { finalDraft: draft } = await WriterAgent.invoke({ messages: [{ role: "user", content: JSON.stringify(state, ['topic', 'audience', 'depth', 'tone']) }], researchData: state.researchData, keyFeatures: state.keyFeatures, hookLines: state.hookLines  });
    return { finalDraft, nextAgent: 'Supervisor' };
}

const FormatterHandoff = async (state: typeof SupervisorState.State) => {
    console.log(`------------Formatting!--------------`);

    // const response = await FormatterAgent.invoke({ state.formatting, state.finalDraft });
    // return { response.finalWriteUp, nextAgent: 'Supervisor' };

    return { finalWriteUp: "WIP", nextAgent: 'Supervisor' };
}

const NextAgent = (state: typeof SupervisorState.State) => {
    switch (state.nextAgent) {
        case 'Supervisor':
            return "Supervisor";
        case 'Researcher':
            return "ResearcherHandoff";
        case 'Analyzer':
            return "AnalyzerHandoff";
        case 'Writer':
            return "WriterHandoff";
        case 'Formatter':
            return "FormatterHandoff";
        case 'End':
            return "__end__";
        default:
            return "__end__";
    }
}

const graph = new StateGraph(SupervisorState)
    .addNode("Supervisor", Supervisor)
    .addNode("ResearcherHandoff", ResearcherHandoff)
    .addNode("AnalyzerHandoff", AnalyzerHandoff)
    .addNode("WriterHandoff", WriterHandoff)
    .addNode("FormatterHandoff", FormatterHandoff)
    .addEdge("__start__", "Supervisor")
    .addConditionalEdges("Supervisor", NextAgent)
    .addConditionalEdges("ResearcherHandoff", NextAgent)
    .addConditionalEdges("AnalyzerHandoff", NextAgent)
    .addConditionalEdges("WriterHandoff", NextAgent)
    .addConditionalEdges("FormatterHandoff", NextAgent);

export const SupervisorAgent = graph.compile();