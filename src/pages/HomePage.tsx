import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Users, Target, TrendingUp } from 'lucide-react';
import { MajorOrder, WarEffort } from '../types';
import { mockDataService } from '../services/mockDataService';
import './HomePage.css';

/**
 * HomePage component - The main landing page
 * Displays the current major order and quick stats about the war effort
 * Provides quick navigation to other sections of the app
 */
export const HomePage: React.FC = () => {
  const [majorOrder, setMajorOrder] = useState<MajorOrder | null>(null);
  const [warEfforts, setWarEfforts] = useState<WarEffort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // In a real app, these would be API calls
        const [majorOrderData, warEffortsData] = await Promise.all([
          mockDataService.getMajorOrder(),
          mockDataService.getWarEfforts()
        ]);
        
        setMajorOrder(majorOrderData);
        setWarEfforts(warEffortsData);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error('Error loading home page data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Calculate total helldivers across all planets
  const totalHelldivers = warEfforts.reduce((sum, effort) => sum + effort.helldiverCount, 0);
  
  // Get top 3 planets by helldiver count
  const topPlanets = [...warEfforts]
    .sort((a, b) => b.helldiverCount - a.helldiverCount)
    .slice(0, 3);

  if (loading) {
    return (
      <div className="home-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading war data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page">
        <div className="error">
          <AlertTriangle size={24} />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="container">
        {/* Page header */}
        <header className="page-header">
          <h1>Helldivers 2 Tool</h1>
          <p>Explore all available equipment and track the galactic war effort</p>
        </header>

        {/* Major Order Section */}
        {majorOrder && (
          <section className="major-order-section">
            <div className="section-header">
              <h2>Major Order</h2>
              <div className="urgency-badge">
                <AlertTriangle size={16} />
                <span>Active</span>
              </div>
            </div>
            
            <div className="major-order-card">
              <div className="major-order-content">
                <h3>{majorOrder.title}</h3>
                <p className="major-order-description">{majorOrder.description}</p>
                <p className="major-order-briefing">{majorOrder.briefing}</p>
                
                {/* Progress bar */}
                <div className="progress-section">
                  <div className="progress-header">
                    <span>Progress</span>
                    <span>{majorOrder.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${majorOrder.progress}%` }}
                    ></div>
                  </div>
                  <div className="progress-details">
                    <span>{majorOrder.progress.toLocaleString()} / {majorOrder.maxProgress.toLocaleString()}</span>
                  </div>
                </div>

                {/* Reward information */}
                <div className="reward-section">
                  <h4>Reward</h4>
                  <div className="reward-item">
                    <span className="reward-type">{majorOrder.reward.type}</span>
                    <span className="reward-amount">+{majorOrder.reward.amount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Expiration */}
                <div className="expiration-section">
                  <p>Expires: {new Date(majorOrder.expiresAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Quick Stats Section */}
        <section className="stats-section">
          <h2>War Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <Users size={24} />
              <div className="stat-content">
                <h3>{totalHelldivers.toLocaleString()}</h3>
                <p>Total Helldivers</p>
              </div>
            </div>
            
            <div className="stat-card">
              <Target size={24} />
              <div className="stat-content">
                <h3>{warEfforts.length}</h3>
                <p>Active Campaigns</p>
              </div>
            </div>
            
            <div className="stat-card">
              <TrendingUp size={24} />
              <div className="stat-content">
                <h3>{topPlanets[0]?.helldiverCount.toLocaleString() || 0}</h3>
                <p>Most Active Planet</p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Planets Section */}
        {topPlanets.length > 0 && (
          <section className="top-planets-section">
            <h2>Most Active Planets</h2>
            <div className="planets-list">
              {topPlanets.map((effort, index) => (
                <div key={effort.id} className="planet-card">
                  <div className="planet-rank">#{index + 1}</div>
                  <div className="planet-info">
                    <h3>{effort.planet.name}</h3>
                    <p className="planet-biome">{effort.planet.biome}</p>
                    <div className="planet-stats">
                      <span className="helldiver-count">
                        <Users size={16} />
                        {effort.helldiverCount.toLocaleString()} Helldivers
                      </span>
                      <span className="hazard-level">
                        Hazard Level {effort.planet.hazardLevel}
                      </span>
                    </div>
                  </div>
                  <div className="planet-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${effort.progress}%` }}
                      ></div>
                    </div>
                    <span>{effort.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="view-all-link">
              <Link to="/war-efforts" className="btn btn-secondary">
                View All Planets
              </Link>
            </div>
          </section>
        )}

        {/* Quick Navigation Section */}
        <section className="quick-nav-section">
          <h2>Explore Equipment</h2>
          <div className="quick-nav-grid">
            <Link to="/armor" className="quick-nav-card">
              <div className="nav-icon">🛡️</div>
              <h3>Armor</h3>
              <p>Search by traits and resistances</p>
            </Link>
            
            <Link to="/weapons" className="quick-nav-card">
              <div className="nav-icon">⚔️</div>
              <h3>Weapons</h3>
              <p>Find weapons by damage type</p>
            </Link>
            
            <Link to="/strategems" className="quick-nav-card">
              <div className="nav-icon">⚡</div>
              <h3>Strategems</h3>
              <p>Support and offensive abilities</p>
            </Link>
            
            <Link to="/warbonds" className="quick-nav-card">
              <div className="nav-icon">📖</div>
              <h3>Warbonds</h3>
              <p>Progression and unlocks</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
