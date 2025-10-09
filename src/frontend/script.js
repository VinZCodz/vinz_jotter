let inputMsg = document.querySelector('#input-msg');
const chatContainer = document.querySelector('#chat-container');
const sendBtn = document.querySelector('#send');
const sessionId = generateUUID();

const loader = document.createElement("div");
loader.className = 'flex justify-start';
loader.textContent = "Replying...";

const generate = async (text) => {
    const userDiv = document.createElement('div');
    userDiv.className = 'flex justify-end';

    const msgDiv = document.createElement('div');
    msgDiv.className = 'bg-blue-600 text-white rounded-3xl rounded-br-none p-4 shadow-lg';
    msgDiv.textContent = text;

    userDiv.appendChild(msgDiv);
    chatContainer.appendChild(userDiv);
    inputMsg.value = '';
    chatContainer.appendChild(loader);

    let llmResponse = "";
    await postChat(text, sessionId)
        .then(response => {
            llmResponse = response.message;
        })
        .catch(error => {
            console.error('Error:', error);
            llmResponse = "Server Offline! Please try again after sometime."
        });

    const aiDiv = document.createElement('div');
    aiDiv.className = 'flex justify-start';

    const responseDiv = document.createElement('div');
    responseDiv.className = "bg-zinc-600 text-white rounded-3xl rounded-tl-none p-4 shadow-lg"

    if (llmResponse.startsWith("```")) {
        llmResponse = llmResponse.slice(4);
        responseDiv.className += " whitespace-pre-wrap font-mono";
    }

    responseDiv.textContent = llmResponse;

    loader.remove();
    aiDiv.appendChild(responseDiv);
    chatContainer.appendChild(aiDiv);
}

const handleEnter = async (e) => {
    if (e.key == 'Enter') {
        const text = inputMsg?.value.trim();
        if (!text)
            return;
        await generate(text);
    }
}

const handleClick = async (e) => {
    const text = inputMsg?.value.trim();
    if (!text)
        return;
    await generate(text);
}

inputMsg?.addEventListener('keyup', handleEnter);
sendBtn?.addEventListener('click', handleClick);

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}