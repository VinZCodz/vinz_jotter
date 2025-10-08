import { JotterAgent } from "./graph.ts"

const main = async () => {
    const sessionId = 1;

    for await (const message of ["Quantum Entanglement", "tech", "formal", "beginner", ".md"]) {
        const threadConfig = { configurable: { thread_id: sessionId } };
        
        // const { finalWriteUp } = await JotterAgent.invoke({ messages: [{ role: "user", content: message }] }, threadConfig);
        // console.log(`Jotter:\n ${finalWriteUp}`);

        const response = await JotterAgent.stream({ messages: [{ role: "user", content: message }] }, threadConfig);
        for await (const chunk of response) {
            console.log(chunk);
        }
    }
}

await main()
    .finally(() => {
        console.warn(`\nBye!\n`);
    });