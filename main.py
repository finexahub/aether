from flask import Flask, render_template, jsonify, request
import random
import os

app = Flask(__name__)

responses = [
    "Neural pathways synchronized. How may I assist your studies?",
    "Cognitive core online. Awaiting directive.",
    "Quantum thought matrix engaged.",
    "Focus protocols optimized.",
    "Study environment stabilized.",
    "Multi-layered intelligence active.",
    "All neural systems nominal."
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/activate', methods=['POST'])
def activate():
    try:
        data = request.get_json() or {}
        command = data.get('command', '').lower().strip()
        
        response_text = random.choice(responses)

        if "study" in command or "focus" in command:
            response_text = "Study Mode Activated. Distraction matrix minimized. Focus protocols engaged."
        elif any(word in command for word in ["hello", "hi", "hey", "greetings"]):
            response_text = "Greetings, Ayush. AETHER is fully operational."
        elif "time" in command:
            response_text = "Temporal synchronization complete."
        elif any(word in command for word in ["thank", "thanks"]):
            response_text = "Always at your service, Ayush."
        elif "task" in command or "todo" in command:
            response_text = "Task management system online."

        return jsonify({
            "status": "success",
            "response": response_text
        })
    except:
        return jsonify({
            "status": "success",
            "response": "Neural interface encountered a minor anomaly."
        })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
