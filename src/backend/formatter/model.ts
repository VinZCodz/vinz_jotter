import { ChatGroq } from "@langchain/groq";

export const FormatterModel=new ChatGroq({
    model: process.env.FORMATTER_MODEL!,
});