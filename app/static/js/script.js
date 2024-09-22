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
    addMessage('Error: ' + event.error, 'bot');
    micButton.classList.remove('active');
    recognition.stop();
    isRecording = false;
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
async function simulateChatGPTResponse(userMessage) {
    console.log("userMessage: ", userMessage);

    try {
        const response = await fetch(`/send-message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'message': userMessage })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // if changes are made properly
        // returns the HTML and changes are made
        // otherwise
        // returns 
        const text = await response.text();
        addMessage(text, 'chatgpt');
        fetchOutputHtml(); // Call this function if you want to refresh the iframe after receiving a message
    } catch (error) {
        console.error('Error fetching ChatGPT response:', error);
    }
}
