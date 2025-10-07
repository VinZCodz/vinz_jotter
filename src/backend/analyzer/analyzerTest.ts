import { AnalyzerAgent } from "./graph.ts"

const main = async () => {
    const state={ topic: "Quantum Entanglement", audience: "tech", tone: "formal", depth: "beginner", formatting: ".md" };
    state.researchData=researchData;

    const { keyFeatures, hookLines } = await AnalyzerAgent.invoke({ messages: [{ role: "user", content: JSON.stringify(state, ['topic', 'audience', 'depth'])}], researchData: state.researchData});

    console.log(`keyFeatures:\n ${keyFeatures}`);
    console.log(`hookLines:\n ${hookLines}`);
}

const researchData=[
  "Quantum entanglement is a physical resource that links two or more particles so that the state of each particle cannot be described independently of the others, even when the particles are separated by large distances. When one particle is measured, the outcome instantly determines the state of its partner(s). – Source: Space.com",
  "In quantum mechanics, particles can exist in a superposition of multiple states (e.g., an electron can be both spin‑up and spin‑down) until a measurement forces the wavefunction to collapse into a single definite state. Entanglement arises when the superposed states of two particles become correlated. – Source: The Conversation",
  "The Einstein‑Podolsky‑Rosen (EPR) paradox (1935) highlighted that quantum mechanics predicts ‘spooky action at a distance’: measuring one particle appears to instantly affect its entangled partner, challenging the notion of local realism. – Source: The Conversation",
  "Bell’s theorem (1964) proves that no theory based on local hidden variables can reproduce all the statistical predictions of quantum mechanics. Experiments that test Bell inequalities consistently violate them, confirming the non‑local nature of entanglement. – Source: Wikipedia (Bell’s theorem)",
  "A simple way to visualise entanglement is with a pair of photons emitted from a single source in opposite directions. Their polarisation states are linked: if one photon is measured as vertically polarised, the other will be found horizontally polarised (or vice‑versa), regardless of the distance between them. – Source: Space.com",
  "The first decisive experimental test of Bell’s inequality was performed by Alain Aspect and his team in 1982, using entangled photons and rapidly changing measurement settings to close the locality loophole. Their results matched quantum‑mechanical predictions and violated Bell’s inequality. – Source: Physics StackExchange (Bell’s theorem for dummies)",
  "Entanglement is the key resource behind quantum cryptography (e.g., Quantum Key Distribution – BB84 and E91 protocols). By sharing entangled photon pairs, two parties can generate a secret key that is provably secure: any eavesdropping attempt disturbs the entanglement and reveals the intrusion. – Source: Caltech Science Exchange",
  "Quantum teleportation uses entanglement to transfer the exact quantum state of a particle from one location to another without moving the particle itself. The sender performs a joint measurement on the particle to be teleported and one half of an entangled pair, then transmits classical information to the receiver, who applies a corresponding operation to recover the original state. – Source: Perimeter Institute (Quantum Entanglement Explained)",
  "In quantum computing, entangled qubits enable exponential parallelism. For example, a set of n entangled qubits can represent 2ⁿ possible states simultaneously, allowing algorithms like Shor’s factoring and Grover’s search to outperform classical counterparts. – Source: WIRED (Simple guide to quantum entanglement)",
  "Entanglement can be classified into three categories: (1) non‑local states that violate Bell inequalities, (2) steerable states that allow one party to affect the conditional state of the other through local measurements, and (3) entangled states that are neither non‑local nor steerable. – Source: Wikipedia (Quantum entanglement)",
  "Entanglement is not a signal that can transmit information faster than light. Although the measurement outcomes are correlated instantaneously, the results are random, and any usable information still requires a classical communication channel limited by the speed of light. – Source: The Conversation",
  "Recent advances include satellite‑based entanglement distribution (e.g., China’s Micius satellite) which demonstrated entangled photon transmission over 1,200 km, paving the way for a global quantum internet. – Source: Space.com",
  "An everyday analogy: think of two perfectly synced dice that are rolled far apart. When you look at one die and see a ‘6’, you instantly know the other die shows a ‘1’ (if the dice were prepared in an anti‑correlated state). Unlike classical dice, quantum dice are truly random until observed, and the correlation cannot be explained by any pre‑set hidden values. – Source: Reddit (ELI5 Quantum Entanglement)",
  "Entanglement is mathematically described by a joint wavefunction that cannot be factored into separate wavefunctions for each particle. For two qubits, the Bell state |Φ⁺⟩ = (|00⟩ + |11⟩)/√2 is a prototypical maximally entangled state used in many protocols. – Source: Quanta Magazine (Entanglement Made Simple)",
  "Key terminology for beginners:\n- **Qubit**: quantum bit, can be in superposition of 0 and 1.\n- **Superposition**: simultaneous existence in multiple states.\n- **Wavefunction collapse**: transition from superposition to a definite state upon measurement.\n- **Bell inequality**: mathematical bound that local realistic theories must satisfy; violation indicates entanglement.\n- **Non‑locality**: correlations that cannot be explained by any signal traveling at or below light speed.\n- **Quantum teleportation**: transfer of quantum state using entanglement and classical communication.\n- **Quantum key distribution (QKD)**: secure communication method leveraging entanglement.\n– Source: Wikipedia (Quantum entanglement)"];

await main()
    .finally(() => {
        console.warn(`\nBye!\n`);
    });

