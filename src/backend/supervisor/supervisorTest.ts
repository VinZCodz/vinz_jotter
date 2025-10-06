import { SupervisorAgent } from "./graph.ts"

const main = async () => {
    const response = await SupervisorAgent.invoke({ topic: "Quantum Entanglement", audience: "tech", tone: "formal", depth: "beginner", formatting: ".md" });
    console.log(`Output:\n ${response.finalWriteUp}`);
}

await main()
    .finally(() => {
        console.warn(`\nBye!\n`);
    });