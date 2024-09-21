const micButton = document.getElementById('micButton');
const sendButton = document.getElementById('sendButton');
const userInput = document.getElementById('userInput');
const chatBox = document.getElementById('chat-box');
let isRecording = false;
let transcript = '';
// Initialize SpeechRecognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.interimResults = false;

recognition.onresult = (event) => {
    transcript = event.results[event.resultIndex][0].transcript;
    console.log("transcript: ", transcript)
    addMessage(transcript, 'user');
    // Send to ChatGPT API and get response (Simulated here)
    // simulateChatGPTResponse(transcript);
};

// Handle errors
recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
};

// Toggle recording
micButton.addEventListener('click', () => {
    if (!isRecording) {
        micButton.classList.add('active');
        recognition.start();
        isRecording = true;
    } else {
        
        micButton.classList.remove('active');
        recognition.stop();
        isRecording = false;
        simulateChatGPTResponse(transcript);
        
    }
});

// Send button listener
// sendButton.addEventListener('click', () => {
//     const message = userInput.value;
//     if (message.trim()) {
//         addMessage(message, 'user');
//         // Send to ChatGPT API and get response (Simulated here)
//         simulateChatGPTResponse(message);
//         userInput.value = '';
//     }
// });

// Add message to chat
function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}

// Simulate ChatGPT response (Replace this with actual API call)
function simulateChatGPTResponse(userMessage) {
    const response = `You said: ${userMessage}. Here's a response!`; // Simulate response
    setTimeout(() => {
        addMessage(response, 'chatgpt');
    }, 500); // Simulate delay
}
