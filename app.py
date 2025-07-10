from flask import Flask, request, jsonify
from utils.climateq_api import get_emissions_from_climateq
from utils.suggestion_engine import suggest_actions

app = Flask(__name__)

# Root route for browser visibility or basic health check
@app.route('/')
def index():
    return "🌍 Walmart CO₂re ML API is running! Use POST /submit to get CO2 emissions and suggestions."

# Submit route for actual data processing
@app.route('/submit', methods=['POST'])
def submit_data():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid or missing JSON payload"}), 400

    try:
        co2_emissions = get_emissions_from_climateq(data)
        suggestions = suggest_actions(data)

        response = {
            "co2_emissions": co2_emissions,
            "suggestions": suggestions
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5002)
