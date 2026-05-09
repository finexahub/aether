from flask import Flask, render_template, jsonify, request
import random

app = Flask(__name__)

responses = [
    "Neural pathways synchronized. How may I assist you?",
    "Cognitive core online. Awaiting directive.",
    "Quantum thought matrix engaged.",
    "Focus protocols optimized.",
    "Study mode architecture activated.",
    "Analyzing query through multi-layered intelligence.",
    "Consciousness simulation at 99.8% efficiency.",
    "Temporal awareness aligned. Proceeding."
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/activate', methods=['POST'])
def activate():
    data = request.json
    command = data.get('command', '').lower()
    
    if command:
        response = random.choice(responses)
        if "study" in command or "focus" in command:
            response = "Focus environment activated. Distraction matrix minimized."
        elif "hello" in command or "hi" in command:
            response = "Greetings, Operator. AETHER is fully operational."
        elif "time" in command:
            response = "Temporal synchronization complete."
    else:
        response = "Neural interface awakened."
    
    return jsonify({
        "status": "success",
        "response": response,
        "mood": "active"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
