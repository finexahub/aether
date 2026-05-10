from flask import Flask, render_template, jsonify, request
import random
import os

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
    data = request.get_json() or {}
    command = data.get('command', '').lower()
    
    response = random.choice(responses)
    
    if "study" in command or "focus" in command:
        response = "Focus environment activated. Distraction matrix minimized."
    elif "hello" in command or "hi" in command:
        response = "Greetings, Operator. AETHER is fully operational."
    elif "time" in command:
        response = "Temporal synchronization complete."
    
    return jsonify({
        "status": "success",
        "response": response
    })

# IMPORTANT: This part is for Render.com
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
