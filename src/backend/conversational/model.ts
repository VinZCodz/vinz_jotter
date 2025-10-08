import { ChatGroq } from "@langchain/groq";

export const ConversationModel = new ChatGroq({
    model: process.env.CONVERSATION_MODEL!,
});