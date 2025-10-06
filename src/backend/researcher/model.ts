import { ChatGroq } from "@langchain/groq";
import { availableTools } from "./tools.ts";

export const ResearcherModel=new ChatGroq({
    model: process.env.RESEARCHER_MODEL!,
}).bindTools(availableTools);