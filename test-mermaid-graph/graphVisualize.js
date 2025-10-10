import fs from "fs/promises";
import { JotterAgent } from "../src/backend/conversational/graph.ts";
import { SupervisorAgent } from "../src/backend/supervisor/graph.ts";
import { ResearchAgent } from "../src/backend/researcher/graph.ts";
import { AnalyzerAgent } from "../src/backend/analyzer/graph.ts";
import { WriterAgent } from "../src/backend/writer/graph.ts";
import { FormatterAgent } from "../src/backend/formatter/graph.ts";

const graphVisualize = async (agent, graphName) => {
    const drawableGraphGraphState = await agent.getGraphAsync();
    const graphStateImage = await drawableGraphGraphState.drawMermaidPng();
    const graphStateArrayBuffer = await graphStateImage.arrayBuffer();

    const filePath = `./mermaid-graph/${graphName}_flow.png`;
    await fs.writeFile(filePath, new Uint8Array(graphStateArrayBuffer));
};

const main = async () => {
    try {
        for (const agent of [
            [JotterAgent, "converse"], [SupervisorAgent, "supervisor"],
            [ResearchAgent, "researcher"], [AnalyzerAgent, "analyzer"],
            [WriterAgent, "writer"], [FormatterAgent, "formatter"]
        ]) await graphVisualize(agent[0], agent[1]);
    } finally {
        console.warn(`\n Flow Diagram Ready!\n`);
    };
}

await main();