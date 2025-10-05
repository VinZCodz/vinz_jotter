import * as readline from 'node:readline/promises';
import { ConversationAgent } from "./graph.ts";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const main = async () => {
    while (true) {
        const userPrompt = await rl.question('Hello! I''m Vinz Jotter AI. I need quick details to start your write-up. What''s the topic? :\n');
        if (userPrompt === '/bye') {
            break;
        }
        
        const response = await ConversationAgent.invoke({ messages: [{ role: "user", content: userPrompt }] });
        console.log(`Write Up:\n ${response.messages.at(-1).content}`);

        // const response = await ConversationAgent.stream({ messages: [{ role: "user", content: userPrompt }] });
        // for await (const chunk of response) {
        //     console.log(chunk);
        // }
    }
}

await main()
    .finally(() => {
        console.warn(`\nBye!\n`);
        rl.close()
    });