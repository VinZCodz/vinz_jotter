import * as readline from 'node:readline/promises';
import { JotterAgent } from "./conversational/graph.ts";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const main = async () => {
    while (true) {
        const userPrompt = await rl.question(`You :\n`);
        if (userPrompt === '/bye') {
            break;
        }

        const threadConfig = { configurable: { thread_id: "1" } };
        // const response = await JotterAgent.invoke({ messages: [{ role: "user", content: userPrompt }] }, threadConfig);
        // console.log(`Jotter:\n ${response.messages.at(-1)?.content}`);

        const response = await JotterAgent.stream({ messages: [{ role: "user", content: userPrompt }] }, threadConfig);
        for await (const chunk of response) {
            console.log(chunk);
        }
    }
}

await main()
    .finally(() => {
        console.warn(`\nBye!\n`);
        rl.close()
    });