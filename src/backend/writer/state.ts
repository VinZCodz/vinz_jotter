import { Annotation, MessagesAnnotation } from "@langchain/langgraph";

export const WriterState = Annotation.Root({
    ...MessagesAnnotation.spec,
    researchData: Annotation<string[]>,

    draft: Annotation<string>,
    
    feedbacks: Annotation<string[]>,
    grade: Annotation<number>
});