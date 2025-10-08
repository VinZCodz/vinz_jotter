import { StateGraph, MemorySaver } from "@langchain/langgraph"
import { ConversationState } from "./state.ts"
import { SupervisorAgent } from "../supervisor/graph.ts"
import * as model from "./model.ts"
import fs from "fs/promises";

const conversationPrompt = { role: "system", content: (await fs.readFile("./src/backend/conversational/prompt/conversational.txt", "utf-8")) };

const Conversation = async (state: typeof ConversationState.State) => {
    console.log(`\n------------Conversation--------------`);

    const response = await model.ConversationModel.invoke(
        [conversationPrompt, ...state.messages],
        { response_format: { type: 'json_object' } }
    );

    return JSON.parse(response.content as string);
}

const isReadyToHandoff = (state: typeof ConversationState.State) => {
    switch (state.isInfoCollected) {
        case true:
            return "SupervisorHandoff";
        case false:
            return "__end__";
        default:
            return "__end__";
    }
}

const SupervisorHandoff = async (state: typeof ConversationState.State) => {
    console.log(`\n\n------------SupervisorHandoff--------------`);

    const response = await SupervisorAgent.invoke(state);
    return { messages: { role: "ai", content: response.finalWriteUp }  };
};

const processPostWriteUp = async (state: typeof ConversationState.State) => {
    console.log(`\n\n------------processPostWriteUp--------------`);
    
    // TODO: 
    // - Generate a Conversation ID.
    // - Summarize the overall conversation for audit trail | history like features.
    // - Archive to DB store.
    // - Just store the Conversation ID in check pointer.
    // - Clear the state.

    return "__end__";
};

const graph = new StateGraph(ConversationState)
    .addNode("Conversation", Conversation)
    .addEdge("__start__", "Conversation")
    .addNode("SupervisorHandoff", SupervisorHandoff)
    .addConditionalEdges("Conversation", isReadyToHandoff)
    .addConditionalEdges("SupervisorHandoff", processPostWriteUp)

export const JotterAgent = graph.compile({ checkpointer: new MemorySaver() });

const finalWriteUp=`# Quantum Entanglement: A Phenomenon Revolutionizing Tech

Einstein's "spooky action" finds practical life in quantum networks bridging continents. Entanglement's instant correlations could revolutionize computing, but sustaining it remains a technological challenge.

## Understanding Quantum Entanglement

In classical physics, objects are independent. However, entangled particles are connected, sharing a bond that defies space and time. Measuring one particle instantly influences its partner, regardless of distance. This effect has been confirmed in numerous experiments and forms the basis of emerging technologies.

## Key Features of Quantum Entanglement

- **Quantum Computing**: Entangled particles enable quantum bits (qubits) to process multiple solutions simultaneously, exponentially surpassing classical computers.
- **Quantum Teleportation**: Information can be transmitted between entangled particles without physical movement, promising secure communication.
- **Quantum Cryptography**: Entanglement-based encryption offers theoretically unbreakable security, safeguarding data.

## Applications and Implications

- **Secure Communication**: Quantum cryptography ensures data privacy, vital in an era of increasing cyber threats.
- **Advanced Computing**: Quantum computers tackle complex problems in medicine, finance, and climate modeling.
- **Fundamental Science**: Studying entanglement deepens our understanding of reality and the universe.

## Challenges and Future Directions

Despite its potential, harnessing entanglement is challenging due to environmental interference. Innovations in quantum error correction and scalable qubit production are essential. Recent experiments have successfully distributed entangled photons over 1,200 kilometers, paving the way for a quantum internet.

## Conclusion

Quantum entanglement, once considered science fiction, now drives technological innovation. As research advances, its applications will expand, transforming industries and reshaping our understanding of the physical world. With its potential to revolutionize computing, communication, and science, entanglement is an exciting frontier in modern physics.`;