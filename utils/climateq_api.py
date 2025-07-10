
# Enhanced ClimateQ API logic with manufacturing integration
def get_emissions_from_climateq(data):
    electricity = data.get('electricity_kwh', 0)
    diesel = data.get('diesel_liters', 0)
    refrigerant = data.get('refrigerant_kg', 0)
    manufacturing = data.get('manufacturing_units', 0)

    # Enhanced emission factors (kg CO2e per unit)
    elec_factor = 0.417      # kg CO2e per kWh (grid average)
    diesel_factor = 2.68     # kg CO2e per liter
    refrigerant_factor = 1430  # kg CO2e per kg (R-410A refrigerant)
    manufacturing_factor = 1.2  # kg CO2e per manufacturing unit

    # Calculate emissions from each source
    electricity_emissions = electricity * elec_factor
    diesel_emissions = diesel * diesel_factor
    refrigerant_emissions = refrigerant * refrigerant_factor
    manufacturing_emissions = manufacturing * manufacturing_factor

    total_emissions = electricity_emissions + diesel_emissions + refrigerant_emissions + manufacturing_emissions
    
    print(f"Emissions breakdown:")
    print(f"  Electricity: {electricity_emissions:.2f} kg CO2e")
    print(f"  Diesel: {diesel_emissions:.2f} kg CO2e") 
    print(f"  Refrigerant: {refrigerant_emissions:.2f} kg CO2e")
    print(f"  Manufacturing: {manufacturing_emissions:.2f} kg CO2e")
    print(f"  Total: {total_emissions:.2f} kg CO2e")
    
    return round(total_emissions, 2)
