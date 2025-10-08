import { FormatterAgent } from "./graph.ts"

const main = async () => {
    let state = { topic: "Quantum Entanglement", audience: "tech", tone: "formal", depth: "beginner", formatting: ".md", finalDraft: finalDraft };

    const { finalWriteUp } = await FormatterAgent.invoke({
        messages: [
            { role: "user", content: JSON.stringify(state, ['formatting']) },
            { role: "ai", content: state.finalDraft }
        ]
    });

    console.log(`finalWriteUp:\n ${finalWriteUp}`);
}

const finalDraft = `## Quantum Entanglement: The Phenomenon Revolutionizing Quantum Technology

What if tweaking a particle in your lab instantly decided the fate of its twin in another galaxy? This isn't a plot from a sci-fi movie; it's the reality of quantum entanglement, a phenomenon that's revolutionizing the field of quantum technology. Entanglement isn’t just a fascinating aspect of quantum mechanics; it’s the engine behind unbreakable codes and computers that check a million answers at once.

### Understanding Entanglement

At its core, entanglement is a property of quantum mechanics where two or more particles become correlated in such a way that the state of one cannot be described independently of the others. This correlation is not due to any physical signal between the particles but is a fundamental aspect of their quantum nature. When one particle is measured, its state is immediately determined, and consequently, the state of its entangled partner(s) is also known, regardless of the distance separating them.

### The EPR Paradox and Bell's Theorem

The Einstein-Podolsky-Rosen (EPR) paradox, proposed in 1935, highlighted the seemingly 'spooky' action at a distance implied by quantum mechanics. This paradox wasn't resolved until Bell's theorem in 1964, which proved that no theory based on local hidden variables could reproduce the statistical predictions of quantum mechanics. Experiments testing Bell inequalities have consistently supported the non-local nature of entanglement, confirming that quantum mechanics is correct in its predictions.

### Visualizing Entanglement

A simple yet effective way to visualize entanglement is through the example of entangled photons emitted from a single source in opposite directions. Their polarization states are correlated; measuring one photon's polarization instantly determines the polarization state of the other, regardless of the distance between them. This phenomenon has been experimentally verified, most notably by Alain Aspect's team in 1982, who tested Bell's inequality using entangled photons.

### Applications of Entanglement

Entanglement is the key resource behind several quantum technologies:

1. **Quantum Cryptography**: Protocols like BB84 and E91 utilize entangled particles to generate secure keys between two parties. Any attempt to eavesdrop on the communication disturbs the entanglement, making it detectable.

2. **Quantum Teleportation**: This process transfers a quantum state from one particle to another without physical transport of the particles themselves, using entanglement and classical communication. Notably, quantum teleportation also requires sending two classical bits of information to complete the transfer, ensuring that the recipient can accurately recover the original quantum state.

3. **Quantum Computing**: Entangled qubits enable a quantum computer to process a vast number of possibilities simultaneously, much like a library where you can check out millions of books at once. This property is crucial for algorithms like Shor's factoring and Grover's search, which outperform their classical counterparts.

### Recent Advances

Recent breakthroughs, such as satellite-based entanglement distribution (e.g., China's Micius satellite), have demonstrated the feasibility of transmitting entangled photons over vast distances (up to 1,200 km). These advancements pave the way for a global quantum internet, revolutionizing secure communication and data processing.

### Conclusion

Quantum entanglement is a fascinating phenomenon that has transitioned from a theoretical curiosity to a foundational element of emerging quantum technologies. Its implications for secure communication, computing, and potentially other fields are profound. As research continues to unravel the mysteries of entanglement and its applications, we can expect significant advancements in quantum technology, shaping the future of how we process information and secure our communications.

### Key Terms for Beginners

- **Qubit**: The quantum equivalent of a classical bit, capable of existing in a superposition of states.
- **Superposition**: A quantum state existing in multiple states simultaneously.
- **Wavefunction Collapse**: The process by which a quantum system transitions from a superposition of states to a single state upon measurement.
- **Bell Inequality**: A mathematical condition that local realistic theories must satisfy; violation indicates the presence of entanglement.
- **Non-Locality**: Correlations between particles that cannot be explained by signals traveling at or below the speed of light.
- **Quantum Teleportation**: The process of transferring a quantum state from one location to another using entanglement and classical communication.
- **Quantum Key Distribution (QKD)**: A method of secure communication that leverages entanglement to encode and decode messages.

By understanding and harnessing entanglement, we are on the cusp of a quantum revolution that promises to transform our technological landscape.`

await main()
    .finally(() => {
        console.warn(`\nBye!\n`);
    });