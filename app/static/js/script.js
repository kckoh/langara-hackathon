const micButton = document.getElementById('micButton'); 
const sendButton = document.getElementById('sendButton');
const userInput = document.getElementById('userInput');
const chatBox = document.getElementById('chat-box');
let isRecording = false;
let transcript = '';

// Initialize SpeechRecognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false; // Set to false to capture only a single utterance
recognition.interimResults = false;

// Handle speech result
recognition.onresult = (event) => {
    transcript = event.results[event.resultIndex][0].transcript;
    console.log("transcript: ", transcript);
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

        // Simulate ChatGPT response after stopping recording
        if (transcript.trim()) {
            addMessage(transcript, 'user'); // Display the user's message
            simulateChatGPTResponse(transcript); // Send it for processing
            transcript = ''; // Clear the transcript after sending
        }
    }
});

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
