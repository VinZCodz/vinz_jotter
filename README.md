# Vinz Jotter AI
A Multi-Agentic AI performing content generation (for Articles, Post, Blogs) based on user query and further delegating/suprivising it to sub agents to research, analyze and critique before final draft.

## Concepts Implemented:
- Multi Agentic System:
- Custom Sub Graph, Sub State and Hand-Off to Agents:
- Multi Agentic Patterns like: 
	- Supervisor:
	- Reflection:
	- Router:
- Prompt Template and Structured Output:
- Multiple Models of Groq Cloud:

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
