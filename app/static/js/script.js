const micButton = document.getElementById('micButton');
        const status = document.getElementById('status');
        const downloadLink = document.getElementById('downloadLink');
        let mediaRecorder;
        let isRecording = false;
        let audioChunks = [];

        // Request permission to use the microphone
        async function startRecording() {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = function(event) {
                if (event.data.size > 0) {
                    audioChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = function() {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                audioChunks = []; // Reset the chunks for the next recording

                // Prepare the download link
                downloadLink.href = audioUrl;
                downloadLink.style.display = 'block'; // Show the download link
                downloadLink.textContent = 'Download Audio'; // Set link text
            };

            mediaRecorder.start();
            audioChunks = [];
        }

        // Toggle recording state
        micButton.addEventListener('click', () => {
            if (!isRecording) {
                micButton.classList.add('active');
                status.textContent = 'Recording... Click to stop.';
                startRecording();
                isRecording = true;
            } else {
                micButton.classList.remove('active');
                status.textContent = 'Recording stopped. Click to download.';
                mediaRecorder.stop();
                isRecording = false;
            }
        });