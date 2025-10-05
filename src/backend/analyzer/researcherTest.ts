import * as readline from 'node:readline/promises';
import { ReflectionAgent } from "./graph.ts";

const main = async () => {

        const response = await ReflectionAgent.invoke({ messages: [{ role: "user", content: userPrompt }] });
        console.log(`Write Up:\n ${response.generation}`);

}

await main()
    .finally(() => {
        console.warn(`\nBye!\n`);
        rl.close()
    });