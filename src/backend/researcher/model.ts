import { ChatGroq } from "@langchain/groq";

export const GenerationModel=new ChatGroq({
    model: process.env.!,
});