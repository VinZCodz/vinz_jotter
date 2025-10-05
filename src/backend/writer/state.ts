import { Annotation, MessagesAnnotation } from "@langchain/langgraph";

export const ResearcherState = Annotation.Root({
    ...MessagesAnnotation.spec,

    topic: Annotation<string>,
    researchData: Annotation<string[]>
});