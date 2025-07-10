
# Mock ClimateQ API logic (replace with real API integration)
def get_emissions_from_climateq(data):
    electricity = data.get('electricity_kwh', 0)
    diesel = data.get('diesel_liters', 0)
    refrigerant = data.get('refrigerant_kg', 0)

    # Example emission factors (kg CO2e)
    elec_factor = 0.417
    diesel_factor = 2.68
    refrigerant_factor = 1430  # Approx for R-410A

    total_emissions = (electricity * elec_factor) + (diesel * diesel_factor) + (refrigerant * refrigerant_factor)
    return round(total_emissions, 2)
