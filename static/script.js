const orb = document.getElementById('orb');
const statusEl = document.getElementById('status');
const log = document.getElementById('log');
const activateBtn = document.getElementById('activateBtn');

// Real-time Clock
function updateTime() {
  const timeEl = document.getElementById('time');
  setInterval(() => {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString('en-US', { hour12: true });
  }, 1000);
}

// Add log message
function addLog(message, isAI = true) {
  const entry = document.createElement('div');
  entry.className = 'log-entry';
  entry.innerHTML = isAI ? 
    `<strong style="color:#00ffaa">AETHER:</strong> ${message}` : 
    `<strong style="color:#ff88ff">USER:</strong> ${message}`;
  log.appendChild(entry);
  log.scrollTop = log.scrollHeight;
}

// Orb Click / Activate
orb.addEventListener('click', () => {
  orb.style.transform = 'scale(1.15)';
  setTimeout(() => orb.style.transform = 'scale(1)', 300);
  activateAI();
});

// Voice Activation
activateBtn.addEventListener('click', () => {
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript;
      addLog(command, false);
      
      fetch('/api/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command })
      })
      .then(res => res.json())
      .then(data => {
        statusEl.textContent = "COGNITIVE CORE ACTIVE";
        addLog(data.response);
        
        // Voice Response
        const utterance = new SpeechSynthesisUtterance(data.response);
        utterance.rate = 1.1;
        speechSynthesis.speak(utterance);
      });
    };
    
    recognition.start();
    statusEl.textContent = "LISTENING...";
  } else {
    alert("Voice recognition not supported in this browser.");
  }
});

function activateAI() {
  statusEl.textContent = "NEURAL AWAKENING...";
  addLog("Initializing quantum consciousness layer...");
  
  setTimeout(() => {
    addLog("All systems synchronized.");
    statusEl.textContent = "AETHER • FULLY OPERATIONAL";
  }, 1200);
}

// Initialize
window.onload = () => {
  updateTime();
  addLog("Welcome, Operator. AETHER is now online.");
  
  // Subtle orb breathing
  setInterval(() => {
    orb.style.boxShadow = "0 0 80px #00ffff";
    setTimeout(() => {
      orb.style.boxShadow = "0 0 120px #00ffff";
    }, 800);
  }, 2000);
};
