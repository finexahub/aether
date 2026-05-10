class AetherAI {
    constructor() {
        this.studyMode = false;
        this.init();
    }

    init() {
        this.updateClock();
        this.bindEvents();
        this.addWelcomeMessage();
    }

    updateClock() {
        const clock = document.getElementById('clock');
        setInterval(() => {
            clock.textContent = new Date().toLocaleTimeString('en-US', { 
                hour12: false 
            });
        }, 1000);
    }

    addWelcomeMessage() {
        setTimeout(() => {
            this.addLog('system', 'AETHER Neural Core Online. Welcome, Ayush.');
        }, 600);
    }

    addLog(type, message) {
        const log = document.getElementById('logContent');
        const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `
            <span class="timestamp">[${time}]</span>
            <span class="message">${message}</span>
        `;
        log.appendChild(entry);
        log.scrollTop = log.scrollHeight;
    }

    bindEvents() {
        document.getElementById('voiceBtn').addEventListener('click', () => this.startVoice());
        document.getElementById('studyBtn').addEventListener('click', () => this.toggleStudyMode());
        
        // Orb Click
        document.getElementById('orb').addEventListener('click', () => {
            this.addLog('system', 'Neural interface awakened.');
        });
    }

    startVoice() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Voice recognition not supported in your browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.onstart = () => {
            document.getElementById('statusText').textContent = "LISTENING...";
        };

        recognition.onresult = (e) => {
            const command = e.results[0][0].transcript;
            this.addLog('user', command);

            fetch('/api/activate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ command })
            })
            .then(res => res.json())
            .then(data => {
                this.addLog('system', `AETHER: ${data.response}`);
                const utterance = new SpeechSynthesisUtterance(data.response);
                utterance.rate = 1.1;
                speechSynthesis.speak(utterance);
            });
        };

        recognition.start();
    }

    toggleStudyMode() {
        this.studyMode = !this.studyMode;
        const btn = document.getElementById('studyBtn');
        const status = document.getElementById('statusText');

        if (this.studyMode) {
            btn.innerHTML = `📚 STUDY MODE ACTIVE`;
            status.textContent = "STUDY MODE ACTIVE";
            this.addLog('system', 'Focus protocols engaged. Distractions minimized.');
        } else {
            btn.innerHTML = `📖 START STUDY MODE`;
            status.textContent = "SYSTEM STANDBY";
            this.addLog('system', 'Study mode deactivated.');
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new AetherAI();
});
