import * as readline from 'node:readline/promises';
import { JotterAgent } from "./conversational/graph.ts";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const main = async () => {
    const sessionId = 1;
    while (true) {
        const message = await rl.question(`You :\n`);
        if (message === '/bye') {
            break;
        }
        const threadConfig = { configurable: { thread_id: sessionId } };
        const { finalWriteUp } = await JotterAgent.invoke({ messages: [{ role: "user", content: message }] }, threadConfig);

        console.log(`Jotter:\n ${finalWriteUp}`);
    }
}

await main()
    .finally(() => {
        console.warn(`\nBye!\n`);
        rl.close()
    });