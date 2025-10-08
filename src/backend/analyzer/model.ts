import { ChatGroq } from "@langchain/groq";

export const AnalyzerModel = new ChatGroq({
    model: process.env.ANALYZER_MODEL!,
});