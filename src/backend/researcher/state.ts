import { Annotation, MessagesAnnotation } from "@langchain/langgraph";

export const ResearcherState = Annotation.Root({
    ...MessagesAnnotation.spec,

    researchData: Annotation<string[]>
});