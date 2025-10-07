import { Annotation, MessagesAnnotation } from "@langchain/langgraph";

export const AnalyzerState = Annotation.Root({
    ...MessagesAnnotation.spec,
    researchData: Annotation<string[]>,

    keyFeatures: Annotation<string[]>,
    hookLines: Annotation<string[]>
});