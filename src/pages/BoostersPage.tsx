import React, { useState, useEffect } from 'react';
import { Search, Filter, Battery, Clock, Zap } from 'lucide-react';
import { Booster } from '../types';
import { mockDataService } from '../services/mockDataService';
import './BoostersPage.css';

/**
 * BoostersPage component - Search and filter boosters
 * Allows users to find boosters by effects and duration
 */
export const BoostersPage: React.FC = () => {
  const [boosters, setBoosters] = useState<Booster[]>([]);
  const [filteredBoosters, setFilteredBoosters] = useState<Booster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    searchTerm: '',
    unlocked: undefined as boolean | undefined
  });

  useEffect(() => {
    const loadBoosters = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await mockDataService.getBoosters();
        setBoosters(data);
        setFilteredBoosters(data);
      } catch (err) {
        setError('Failed to load boosters data. Please try again later.');
        console.error('Error loading boosters:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBoosters();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...boosters];

      if (filters.searchTerm) {
        filtered = filtered.filter(booster =>
          booster.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          booster.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
        );
      }

      if (filters.unlocked !== undefined) {
        filtered = filtered.filter(booster => booster.unlocked === filters.unlocked);
      }

      setFilteredBoosters(filtered);
    };

    applyFilters();
  }, [filters, boosters]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      searchTerm: e.target.value
    }));
  };

  const handleUnlockedChange = (unlocked: string) => {
    setFilters(prev => ({
      ...prev,
      unlocked: unlocked === 'all' ? undefined : unlocked === 'unlocked'
    }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      unlocked: undefined
    });
  };

  if (loading) {
    return (
      <div className="boosters-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading boosters data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="boosters-page">
        <div className="error">
          <Battery size={24} />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="boosters-page">
      <div className="container">
        <header className="page-header">
          <h1>Boosters Database</h1>
          <p>Search and filter mission boosters</p>
        </header>

        <div className="search-controls">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search boosters by name..."
              value={filters.searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          <button
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="filter-panel">
            <div className="filter-section">
              <h3>Availability</h3>
              <div className="filter-options">
                {['all', 'unlocked', 'locked'].map(option => (
                  <button
                    key={option}
                    className={`filter-option ${filters.unlocked === (option === 'unlocked') || (option === 'all' && filters.unlocked === undefined) ? 'active' : ''}`}
                    onClick={() => handleUnlockedChange(option)}
                  >
                    {option === 'all' ? 'All Items' : option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-actions">
              <button className="btn btn-secondary" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          </div>
        )}

        <div className="results-info">
          <p>Showing {filteredBoosters.length} of {boosters.length} boosters</p>
        </div>

        <div className="boosters-grid">
          {filteredBoosters.map((booster) => (
            <div key={booster.id} className="booster-card">
              <div className="card-header">
                <div className="booster-info">
                  <h3>{booster.name}</h3>
                  <div className="booster-meta">
                    <span className={`unlock-status ${booster.unlocked ? 'unlocked' : 'locked'}`}>
                      {booster.unlocked ? 'Unlocked' : 'Locked'}
                    </span>
                  </div>
                </div>
                <div className="booster-duration">
                  <Clock size={16} />
                  <span>{booster.duration === 0 ? 'Mission' : `${booster.duration}s`}</span>
                </div>
              </div>

              <p className="booster-description">{booster.description}</p>

              <div className="booster-stats">
                <div className="stat-row">
                  <Battery size={16} />
                  <span>Effect</span>
                  <span>{booster.effect}</span>
                </div>
                <div className="stat-row">
                  <Zap size={16} />
                  <span>Stackable</span>
                  <span>{booster.stackable ? 'Yes' : 'No'}</span>
                </div>
              </div>

              {booster.effects.length > 0 && (
                <div className="effects-section">
                  <h4>Effects</h4>
                  <div className="effects-list">
                    {booster.effects.map((effect) => (
                      <div key={effect.id} className="effect-item">
                        <h5>{effect.name}</h5>
                        <p>{effect.description}</p>
                        <div className="effect-value">+{effect.value}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="cost-section">
                <div className="cost-item">
                  <span className="cost-type">Medals</span>
                  <span className="cost-amount">{booster.cost.medals}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBoosters.length === 0 && (
          <div className="no-results">
            <Battery size={48} />
            <h3>No boosters found</h3>
            <p>Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};
