import { JotterAgent } from "./graph.ts"

const main = async () => {
    for await (const userPrompt of ["Quantum Entanglement", "tech", "formal", "beginner", ".md"]) {
        // const response = await JotterAgent.invoke({ messages: [{ role: "user", content: userPrompt }] }, threadConfig);
        // console.log(`Jotter:\n ${response.messages.at(-1)?.content}`);

        const response = await JotterAgent.stream({ messages: [{ role: "user", content: userPrompt }] }, { configurable: { thread_id: "1" } });
        for await (const chunk of response) {
            console.log(chunk);
        }
    }
}

await main()
    .finally(() => {
        console.warn(`\nBye!\n`);
    });