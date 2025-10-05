import { Annotation } from "@langchain/langgraph";

export const SupervisorState = Annotation.Root({
    topic: Annotation<string>, //All Agents
    audience: Annotation<string>, //All Agents
    depth: Annotation<string>, // All Agents

    researchData: Annotation<string[]>, //Analyzer and Writer 

    tone: Annotation<string>, //Writer and Editor
    keyFeatures: Annotation<string[]>, //Writer and Editor

    formatting: Annotation<string>, // Formatter
    finalDraft: Annotation<string>, // Formatter

    finalWriteUp: Annotation<string>,

    nextAgent: Annotation<string>
});