import { Annotation, MessagesAnnotation } from "@langchain/langgraph";

export const FormatterState = Annotation.Root({
    ...MessagesAnnotation.spec,
    
    finalWriteUp: Annotation<string>
});