import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import StoreDetails from './pages/StoreDetails';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import DataInput from './pages/DataInput';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/store/:id" element={<StoreDetails />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/input" element={<DataInput />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
