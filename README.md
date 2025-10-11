# Essential knowledge to build a Multi-Agent System (MAS):
Lets explore fundamental and basic know-how involved in building, not-one but Many agents! which communicate with each other in order to complete an complex set of tasks/workflows!

## Understanding "What" is MAS?
Is a collection of autonomous AI agents that coordinate with one another to solve complex problems that would be difficult for a single agent to handle alone. 

These systems work in a distributed manner with specific job/task assigned to them and coordinating to achieve individual or collective goals.

>examples including complex customer service, supply chain management, and security monitoring. Unlike centralized systems, MAS often feature distributed control and are known for being more adaptable, scalable, and fault-tolerant

<p align="center">
<img width="600" height="500" alt="MAS" src="https://github.com/user-attachments/assets/d6a36f73-96c1-4cee-8073-c54ed0f08c17" />
</p>

### "Need" of MAS?
- Various Limitation of Single agents can be derived from: semantic tokens, limited infrastructures and resources, cascading loads, Security, sensitive or access controls in place, Or simply they are owned by other teams/enterprises.
- Any software module, which has "Separation of Concern" meaning it knows and has access to only one set of module and good at that task/job, becomes deterministic, testable and more importantly Manageable during long run. Ergo the need of modularization of Agent creation process. 

### "Use" and "Examples" of MAS
Using MAS, provides more Autonomy and benefits like improved scalability, flexibility, fault tolerance, and smarter problem-solving. MAS allows for the distribution of intelligence, where specialized agents collaborate on sub-tasks, making the overall system more efficient and robust.  

> Unlike centralized systems, MAS often feature distributed control and are known for being more adaptable, scalable, and fault-tolerant

Examples: Content creation, complex customer service, supply chain management, and security monitoring.

## Components used in creating MAS:

### Custom Graph/Sub Graph:

- Graph is just a classic nodes and edges connected to get the specific job done, framework like LangGraph, helps to create specific set of workflows using Graphs. 
>The graph is the central blueprint that defines the entire workflow. It maps out the nodes, the connections between them, and the overall data flow.

- While modularization the complex/Monolithic agents, often we need to to divide our work flow graphs into separate manageable Sub Graph. This sub graph consist of only specific set of nodes and edges performing a smaller/specific task.
>A sub-graph is a smaller, self-contained graph that operates as a single node within a larger, parent graph. By using sub-graphs, you can break down a complex task into manageable, reusable components encapsulates a specialized workflow. 

<p align="center">
<img width="600" height="500" alt="Graph_SubGraph" src="https://github.com/user-attachments/assets/4e980671-087d-4c0a-8465-c454af6bf8df" />
</p>

### State/Sub State: 
Now each of these Graph/sub-Graph would require a data to work with or data that they produce need to be given back to its callers/invokes, these are called State or Sub State.
- State: The state is a shared data structure that acts as the application's memory. It is passed to every node, allowing them to read from and write to a centralized source of truth.
> a custom sub-state defines the unique data required for that workflow.

### Nodes: 
These are functions that represent a single step or unit of work in the workflow. A node receives the current state, performs an action (e.g., calling an LLM or an external tool), and returns an updated state.
> Nodes can be standard functions or more complex LangChain Runnable components. LangGraph also includes pre-built nodes for common tasks, such as ToolNode for tool calling.

### Edges: 
Edges are the connections between nodes that define the path of execution.
- Normal edges: Define a fixed, unconditional transition from one node to the next.
- Conditional edges: Enable dynamic routing by using a function to decide the next step based on the current state. This allows for conditional branching and creating cycles for loops
<p align="center">
<img width="200" height="200" alt="image" src="https://github.com/user-attachments/assets/ce0bca60-4e9c-45b3-a96c-ed245ec7bee4" />
</p>

### Execution:
Once done with all the wiring, we can compile the graph and run/invoke it by setting the state object with appropriate needed values. The Graph/Sub Graph performs its designated task and produces an output.
>LangGraph's execution model is inspired by Google's Pregel system, a framework for large-scale graph processing

### Hand-Off:
After understanding the need of Sub graph, the transfer that happens between one Agent (or more technically) one Graph to another Graph (or Sub graph) is called Hand-off, in which, we simply set multiple state parameter of the Sub-Graph before its invoked.
>Handoffs are the mechanism by which control and context are transferred between agents. This delegation is often triggered by an LLM-powered "supervisor" or by agents themselves using special "handoff tools". 
Methods for hand-offs

<p align="center">
<img width="600" height="500" alt="Handoffs" src="https://github.com/user-attachments/assets/2357bbce-f7a0-48b8-9245-15ee7f10241d" />
</p>

Types of Hand-offs: 
- Supervisor architecture: A central supervisor agent uses a tool-calling LLM to decide which worker agent should handle the current task. The supervisor passes the relevant state and context.
- Peer-to-peer handoffs: Agents can be directly equipped with "handoff tools" that allow them to delegate to a peer agent. 
- Handoffs as tools: Implement handoffs as callable functions that the LLM can trigger. 

## Multi Agentic Patterns:
Since a complex/many Agents are involved, there comes a need to manage them. 
Structured way of managing software systems give raise to patterns and architectures, which are time/battle tested, employing them will cover certain age old pitfalls and make things more workable. 

> Multi-Agentic patterns such as Supervisor, Reflection, and Router are architectural blueprints for coordinating multiple AI agents to solve complex tasks more effectively than a single agent could alone. They enable AI systems to become more robust, scalable, and modular.

Below are some that I've explored: 

- Supervisor pattern: In the supervisor pattern, a central "supervisor" or "orchestrator" agent is responsible for managing and coordinating multiple specialized "worker" agents.
>Analyzes request -> breaks to smaller subtasks -> delegates each subtask -> specialized worker agent execute their assigned tasks -> collects the results ->  generates a final unified response

Example: Task Delegation Agent, Vinz Jotter AI (https://github.com/VinZCodz/vinz_jotter). 
<p align="center">
<img width="500" height="600" alt="image" src="https://github.com/user-attachments/assets/28dd6a38-528c-42a7-a4c0-ed99a235bf5a" />
</p>

----

- Reflection pattern: The reflection pattern uses a feedback loop that allows an AI agent to critique and improve its own output iteratively. This enhances the quality, reliability, and accuracy of the final response. 
>An initial agent produces an output -> A second agent, "reflector" evaluating the relevance -> Iteration and refinement: Based on the reflector's critique

Example: Writing and Critique Agents.
<p align="center">
<img width="150" height="300" alt="image" src="https://github.com/user-attachments/assets/405cccb9-ea02-4fdd-aad8-08262f866a6b" />
</p>

----
- Router pattern: A router is a fundamental pattern that intelligently classifies incoming inputs and directs them to the most appropriate specialized process or handler. 
>user's query received by a "router" (rule-based system) -> analyzes the user's intent -> selects the correct tool, agent, or chain of commands to handle the query -> dispatched to the selected expert for processing.

Examples: A multi-domain chatbot, Vinz Medical Assist: https://github.com/VinZCodz/llm-advanced-rag-multi-agent
<p align="center">
<img width="200" height="300" alt="image" src="https://github.com/user-attachments/assets/0e5d253c-1bd7-4d34-bec2-7887b61db485" />
</p>

## Prompt Template and Structured Output:

### Prompt Template:
Prompt templates translate user input and application logic into a prompt that an LLM can understand. It gives a way to know the present state of the Agent and involve these variables while instructing the LLMs.

>Programmatic way gives Agent guardrail and nudges to proper flow! Prompts on the other hand nudges Agent's LLM Chain-of-Thoughts in proper directions! Thus prompting, with utmost clarity is significant. 

Example: here ```{context}``` and ```{question}``` are read from state.
```
You are a grader assessing relevance of a retrieved document to a user question.
Here is the retrieved document: {context}
Here is the user question: {question}
```

### Structured Output:
Most of the inner, worker nodes/Agents are not user facing ones, so, NLP generation takes a back seat over acting as a brain of the workflow. For such brains to interact with outer world we would need a structured way of communicating their outs. Simple outs in JSON object or schema, where it can programmatically understood by non-LLM nodes to perform execution becomes crucial.

> Ensures that the final response from the agent is in a predictable, machine-readable format, such as JSON, instead of free-form text. 

----

## Multi Agentic System Flow:
- **Conversational Agent Flow** with the User: To enrich Supervisor Agent with user inputs and hands-off.
<p align="center">
<img width="200" height="300" alt="image" src="https://github.com/user-attachments/assets/0e5d253c-1bd7-4d34-bec2-7887b61db485" />
</p>

- **Supervisor Agent Flow/Delegation** to all internal Sub Agents: to assign work and user data.
<p align="center">
<img width="500" height="600" alt="image" src="https://github.com/user-attachments/assets/28dd6a38-528c-42a7-a4c0-ed99a235bf5a" />
</p>

- **Researcher Agent Flow** with tools and RAG agents: to get needed information as instructed by Supervisor Agent.
<p align="center">
<img width="200" height="200" alt="image" src="https://github.com/user-attachments/assets/ce0bca60-4e9c-45b3-a96c-ed245ec7bee4" />
</p>

- **Analyzer Agent Flow**: to generate needed information as instructed by Supervisor Agent.
<p align="center">
<img width="100" height="200" alt="image" src="https://github.com/user-attachments/assets/24f07949-80ed-4c65-85e4-1ae8f6eceeca" />
</p>

- **Writer and Critique Agent System Flow**, with one another: to grade the content generated and iterate to fine-tune.
<p align="center">
<img width="150" height="300" alt="image" src="https://github.com/user-attachments/assets/405cccb9-ea02-4fdd-aad8-08262f866a6b" />
</p>

- **Formatter Agent Flow**: to format as instructed by Supervisor Agent.
<p align="center">
<img width="100" height="200" alt="image" src="https://github.com/user-attachments/assets/1594c022-8fb7-457e-b139-0e30c70b4130" />
</p>

## Snapshots:

<p align="center">
<img width="2449" height="1353" alt="Server_User_In" src="https://github.com/user-attachments/assets/37b7fed6-4377-4f5e-96b7-97b97248abb6" />
<img width="2496" height="1289" alt="Server_Backend" src="https://github.com/user-attachments/assets/01f9af3b-fa34-455d-8f3e-e4297cf346fb" />
<img width="2489" height="1355" alt="Final_output" src="https://github.com/user-attachments/assets/9a7afb97-cd36-47b4-8bb6-3a220ff385ea" />
</p>

# Vinz Jotter AI
A Multi-Agentic AI performing content generation (for Articles, Post, Blogs) based on user query and further delegating/suprivising it to sub agents to research, analyze and critique before final draft.


Thru out this write-up lets make use of VinZ Jotter AI, MAS, as example. Jotter AI is a Multi-Agentic AI performing content generation (for Articles, Post, Blogs) based on user query and further delegating/supervising it to sub agents to research, analyze and critique before final draft. 

If you are "Let the code talk" - kind; then here is the source code to follow along: https://github.com/VinZCodz/vinz_jotter

A system could have one agent for research and another for writing, with each agent focused on its specific task, which can lead to more focused and performant outcomes.
 

