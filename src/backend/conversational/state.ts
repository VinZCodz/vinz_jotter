import { Annotation, MessagesAnnotation } from "@langchain/langgraph";

export const ConversationState = Annotation.Root({
    ...MessagesAnnotation.spec,

    topic: Annotation<string>,
    audience: Annotation<string>,
    tone: Annotation<string>,,
    depth: Annotation<string>,
    formatting: Annotation<string>,
    isInfoCollected: Annotation<boolean>
});


