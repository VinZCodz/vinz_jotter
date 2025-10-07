import { ChatGroq } from "@langchain/groq";

export const WriterModel=new ChatGroq({
    model: process.env.WRITER_MODEL!,
});

export const CritiqueModel=new ChatGroq({
    model: process.env.CRITIQUE_MODEL!,
});