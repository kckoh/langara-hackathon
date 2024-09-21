const micButton = document.getElementById('micButton');
const status = document.getElementById('status');
let isRecording = false;

// Initialize the SpeechRecognition object
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true; // Set to true for continuous recognition
recognition.interimResults = false; // Set to true if you want interim results

// Handle the result event to capture transcribed text
recognition.onresult = (event) => {
    const transcript = event.results[event.resultIndex][0].transcript;
    console.log('You said: ', transcript);
    status.textContent = `Transcription: ${transcript}`;
};

// Handle errors
recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    status.textContent = 'Error recognizing speech.';
};

// Toggle recording state
micButton.addEventListener('click', () => {
    if (!isRecording) {
        micButton.classList.add('active');
        status.textContent = 'Listening... Click to stop.';
        recognition.start(); // Start speech recognition
        isRecording = true;
        console.log("isRecording: ", isRecording);
    } else {
        console.log("it stops");
        micButton.classList.remove('active');
        status.textContent = 'Stopped listening.';
        recognition.stop(); // Stop speech recognition
        isRecording = false;
    }
});