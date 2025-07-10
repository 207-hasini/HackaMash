
# Rule-based suggestions with enhanced logic
def suggest_actions(data):
    suggestions = []

    electricity = data.get('electricity_kwh', 0)
    diesel = data.get('diesel_liters', 0)
    refrigerant = data.get('refrigerant_kg', 0)
    manufacturing = data.get('manufacturing_units', 0)

    # Electricity-based suggestions
    if electricity > 5000:
        suggestions.append("🔋 Critical: Implement solar panels and energy storage systems")
    elif electricity > 3000:
        suggestions.append("💡 Install LED lights and smart thermostats")
    elif electricity > 1500:
        suggestions.append("⚡ Consider energy-efficient HVAC upgrades")

    # Fuel-based suggestions
    if diesel > 50:
        suggestions.append("🚛 High fuel usage: Switch to electric logistics vehicles")
    elif diesel > 25:
        suggestions.append("🚚 Optimize delivery routes and consider hybrid vehicles")

    # Refrigerant-based suggestions
    if refrigerant > 10:
        suggestions.append("❄️ Critical: Immediate refrigeration system inspection needed")
    elif refrigerant > 5:
        suggestions.append("🔧 Inspect and upgrade refrigeration units")
    elif refrigerant > 2:
        suggestions.append("🛠️ Schedule routine maintenance for cooling systems")

    # Manufacturing-based suggestions
    if manufacturing > 200:
        suggestions.append("🏭 High production: Optimize manufacturing processes with IoT devices")
    elif manufacturing > 100:
        suggestions.append("📊 Implement smart manufacturing monitoring systems")

    # Combined efficiency suggestions
    total_impact = electricity * 0.001 + diesel * 0.1 + refrigerant * 5 + manufacturing * 0.01
    if total_impact > 500:
        suggestions.append("🌟 Consider comprehensive sustainability audit and green certification")
    
    # Default suggestion if no specific recommendations
    if not suggestions:
        suggestions.append("✅ Great job! Your emissions are within optimal ranges")

    return suggestions
