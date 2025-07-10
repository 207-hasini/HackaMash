import React, { useState, useEffect } from 'react';
import { Brain, Lightbulb, Clock, TrendingUp } from 'lucide-react';

const AISuggestionsPanel = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestSuggestions();
    // Refresh suggestions every 30 seconds
    const interval = setInterval(fetchLatestSuggestions, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchLatestSuggestions = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/emissions/suggestions/latest');
      const data = await response.json();
      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6">
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-400"></div>
          <span className="text-yellow-400">Loading AI suggestions...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center text-yellow-400">
        <Brain className="w-5 h-5 mr-2" />
        🤖 AI-Powered Recommendations
      </h3>
      
      {suggestions.length === 0 ? (
        <div className="text-center p-4 text-gray-400">
          <Lightbulb className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No AI suggestions yet.</p>
          <p className="text-sm">Submit emissions data to get ML recommendations!</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {suggestions.map((item, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4 border border-yellow-400/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-300">Store: {item.storeId}</span>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(item.calculated_at).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                <TrendingUp className="w-4 h-4 mr-2 text-red-400" />
                <span className="text-sm text-gray-300">{item.co2_emissions} kg CO₂</span>
              </div>

              <div className="space-y-2">
                {item.suggestions.map((suggestion, suggestionIndex) => (
                  <div key={suggestionIndex} className="flex items-start space-x-2 text-sm">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center text-black text-xs font-bold mt-0.5">
                      {suggestionIndex + 1}
                    </div>
                    <span className="text-gray-200 leading-relaxed">{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-yellow-400/20">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>🔄 Auto-refreshing every 30s</span>
          <span>Powered by Walmart CO₂re ML</span>
        </div>
      </div>
    </div>
  );
};

export default AISuggestionsPanel; 