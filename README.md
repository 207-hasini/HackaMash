# Walmart CO₂re
**Advanced Carbon Emissions Tracking and Optimization Dashboard**

Submission: https://youtu.be/m9obVOZSI-c?si=DQAVZA3XJOqA-85W

## Problem Statement

Imagine trying to navigate a complex city without a map, or managing a budget without knowing where your money is actually going. That's essentially the challenge Walmart faces with its current carbon footprint. 

Walmart reports show increasing emissions from refrigerants and transport fuel, often due to aging equipment or expanding fleets. **Without specific insights into which stores are struggling, which categories are consuming the most energy, and where those leaks are occurring, it's like trying to fix a leaky pipe in the dark.**

**You can't solve what you can't see.**

## Solution Overview

Walmart CO₂re transforms carbon footprint management from reactive reporting to **proactive, real-time action**. Our platform provides store-specific visibility into emissions sources, AI-powered optimization recommendations, and actionable insights that empower store managers to drive measurable reductions in their carbon footprint.

### Key Innovation: Dual-Input Architecture
- **Real-time IoT Integration**: Automated monitoring of HVAC, refrigeration, and lighting systems
- **Manual Data Entry**: Utility bills, delivery logs, and fuel usage reports for stores without sensor networks
- **Universal Participation**: Every Walmart store can participate regardless of technical infrastructure

## Technical Architecture

### Frontend (React)
- **Framework**: React 19.1.0 with React Router for SPA navigation
- **Styling**: Tailwind CSS with custom gradient designs
- **Charts**: Recharts for interactive data visualization
- **Maps**: React Leaflet for geospatial store visualization
- **Real-time Updates**: Auto-refreshing components with 30-second intervals

### Backend (Node.js/Express)
- **Runtime**: Node.js with Express 5.1.0 framework
- **Database**: MongoDB Atlas with Mongoose ODM
- **API Design**: RESTful endpoints with comprehensive error handling
- **ML Integration**: Axios HTTP client for seamless ML service communication

### Machine Learning Service (Python/Flask)
- **Framework**: Flask 3.1.1 for lightweight ML API
- **AI Engine**: Custom emissions calculation algorithms with enhanced factors
- **Suggestion System**: Rule-based AI providing context-aware recommendations
- **Scalable Architecture**: Modular design for easy algorithm updates

### Database Schema
```javascript
{
  storeId: String,
  co2_emissions: Number,
  breakdown: {
    energy_kwh: Number,
    fuel_liters: Number,
    refrigerant_leaks_kg: Number,
    manufacturing_units: Number
  },
  suggestions: [String],
  calculated_at: Date,
  timestamp: Date
}
```

## Core Features

### Real-Time Emissions Tracking
- **Live Calculations**: ML-powered CO₂ equivalent computations
- **Source Breakdown**: Granular tracking of electricity, fuel, refrigerants, and manufacturing
- **Historical Trends**: Time-series analysis with interactive charts

### AI-Powered Recommendations
- **Context-Aware Suggestions**: Smart recommendations based on emission patterns
- **Actionable Insights**: Specific steps like "Install LED lights" or "Inspect refrigeration units"
- **Performance Feedback**: Positive reinforcement for optimal emission ranges

### Interactive Dashboard
- **Store-Specific Views**: Individual dashboards for each location
- **Comparative Analytics**: Nationwide map and leaderboard system
- **Real-Time KPIs**: Total emissions, efficiency metrics, and active alerts

### Data Input Flexibility
- **Form-Based Entry**: Intuitive interface for manual data submission
- **Instant ML Processing**: Real-time calculation and suggestion display
- **Visual Feedback**: Loading animations and results presentation

## Technical Highlights

### ML Integration Workflow
```
DataInput → Backend API → ML Service → Database → Dashboard
```

1. **Data Capture**: User submits operational data via web interface
2. **ML Processing**: Flask service calculates emissions using advanced factors
3. **AI Analysis**: Suggestion engine provides optimization recommendations
4. **Database Storage**: Results saved with complete audit trail
5. **Real-Time Display**: Dashboard updates with new insights

### Advanced Emission Factors
- **Electricity**: 0.417 kg CO₂e per kWh (grid average)
- **Diesel**: 2.68 kg CO₂e per liter
- **Refrigerants**: 1,430 kg CO₂e per kg (R-410A)
- **Manufacturing**: 1.2 kg CO₂e per unit

### Performance Optimizations
- **Auto-Refresh**: 30-second intervals for live data updates
- **Efficient Queries**: MongoDB aggregation pipelines for fast analytics
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Error Handling**: Comprehensive error management across all services

## Quick Start

### Prerequisites
- Node.js 24.1.0+
- Python 3.13+
- MongoDB Atlas connection

### Installation & Setup
```bash
# Clone repository
git clone <repository-url>
cd HackaMash

# Backend setup
cd backend
npm install
npm start  # Runs on port 5001

# Frontend setup
cd ../emissions-dashboard
npm install
PORT=3001 npm start  # Runs on port 3001

# ML Service setup
python3 -m venv venv_macos
source venv_macos/bin/activate
pip install flask
python app.py  # Runs on port 5002
```

### Access Points
- **Frontend Dashboard**: http://localhost:3001
- **Backend API**: http://localhost:5001
- **ML Service**: http://localhost:5002

## Demo Workflow

1. **Navigate to Data Input**: Submit store operational data
2. **Watch ML Processing**: Real-time calculation with loading animations
3. **View AI Suggestions**: Immediate recommendations display
4. **Check Dashboard**: Live updates in AI suggestions panel
5. **Explore Analytics**: Comprehensive emissions tracking and trends

## Impact & Vision

Walmart CO₂re isn't just a dashboard—**it's Walmart's missing link to hitting its 2040 net-zero goal**. By making emissions visible and actionable, we transform sustainability from a quarterly report into a real-time mission.

### Measurable Outcomes
- **Store-Level Accountability**: Individual performance tracking
- **Targeted Interventions**: Specific recommendations for each location
- **Competitive Motivation**: Leaderboard system driving engagement
- **Scalable Architecture**: Ready for 10,000+ store deployment

---

**Built for Hackathon Excellence**: Complete full-stack application with real ML integration, professional UI/UX, and production-ready architecture.

*Made with love, Team HackaMash*
