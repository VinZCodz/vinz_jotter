import { Annotation, MessagesAnnotation } from "@langchain/langgraph";

export const ResearcherState = Annotation.Root({
    ...MessagesAnnotation.spec,

    topic: Annotation<string>, 
    audience: Annotation<string>, 
    depth: Annotation<string>, 

    researchData: Annotation<string[]>
});