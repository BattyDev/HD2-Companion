import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { WarEffortsPage } from './pages/WarEffortsPage';
import { ArmorPage } from './pages/ArmorPage';
import { WeaponsPage } from './pages/WeaponsPage';
import { StrategemsPage } from './pages/StrategemsPage';
import { BoostersPage } from './pages/BoostersPage';
import { WarbondsPage } from './pages/WarbondsPage';
import { ItemDetailPage } from './pages/ItemDetailPage';
import './App.css';

/**
 * Main App component that sets up routing and navigation
 * This is the root component that handles all page navigation
 */
function App() {
  return (
    <Router>
      <div className="app">
        {/* Navigation component - shows on all pages */}
        <Navigation />
        
        {/* Main content area with routing */}
        <main className="main-content">
          <Routes>
            {/* Home page - shows major order and quick stats */}
            <Route path="/" element={<HomePage />} />
            
            {/* War efforts page - shows all planets with helldiver counts */}
            <Route path="/war-efforts" element={<WarEffortsPage />} />
            
            {/* Item exploration pages */}
            <Route path="/armor" element={<ArmorPage />} />
            <Route path="/weapons" element={<WeaponsPage />} />
            <Route path="/strategems" element={<StrategemsPage />} />
            <Route path="/boosters" element={<BoostersPage />} />
            <Route path="/warbonds" element={<WarbondsPage />} />
            
            {/* Item detail page - shows individual item with warbond navigation */}
            <Route path="/item/:itemId" element={<ItemDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
