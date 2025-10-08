import { StateGraph } from "@langchain/langgraph"
import { FormatterState } from "./state.ts"
import * as model from "./model.ts"
import fs from "fs/promises";

const prompt = { role: "system", content: (await fs.readFile("./src/backend/formatter/prompt/formatter.txt", "utf-8")) };
const graph = new StateGraph(FormatterState)
    .addNode("Formatter",
        async (state: typeof FormatterState.State) =>
            JSON.parse((await model.FormatterModel.invoke(
                [prompt, ...state.messages],
                { response_format: { type: 'json_object' } }
            )).content as string)
    )
    .addEdge("__start__", "Formatter")
    .addEdge("Formatter", "__end__")

export const FormatterAgent = graph.compile();