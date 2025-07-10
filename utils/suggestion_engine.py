
# Rule-based suggestions
def suggest_actions(data):
    suggestions = []

    if data.get('electricity_kwh', 0) > 3000:
        suggestions.append("Install LED lights or smart thermostats")

    if data.get('diesel_liters', 0) > 40:
        suggestions.append("Switch to electric logistics vehicles")

    if data.get('refrigerant_kg', 0) > 5:
        suggestions.append("Inspect and upgrade refrigeration units")

    if data.get('manufacturing_units', 0) > 150:
        suggestions.append("Optimize manufacturing processes with IoT devices")

    return suggestions
