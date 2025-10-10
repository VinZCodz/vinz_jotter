import { ResearchAgent } from "../src/backend/researcher/graph.ts"

const main = async () => {
    const state = { topic: "Quantum Entanglement", audience: "tech", tone: "formal", depth: "beginner", formatting: ".md" };

    const { researchData } = await ResearchAgent.invoke({ messages: [{ role: "user", content: JSON.stringify(state, ['topic', 'audience', 'depth']) }] });

    console.log(`Write Up:\n ${researchData}`);

}

await main()
    .finally(() => {
        console.warn(`\nBye!\n`);
    });