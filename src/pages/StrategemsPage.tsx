import React, { useState, useEffect } from 'react';
import { Search, Filter, Zap, Clock, Target } from 'lucide-react';
import { Strategem } from '../types';
import { mockDataService } from '../services/mockDataService';
import './StrategemsPage.css';

/**
 * StrategemsPage component - Search and filter strategems
 * Allows users to find strategems by type, cooldown, and effects
 * Provides detailed information about each strategem's capabilities
 */
export const StrategemsPage: React.FC = () => {
  const [strategems, setStrategems] = useState<Strategem[]>([]);
  const [filteredStrategems, setFilteredStrategems] = useState<Strategem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState({
    searchTerm: '',
    strategemType: undefined as string | undefined,
    unlocked: undefined as boolean | undefined
  });

  // Available strategem types
  const strategemTypes = [
    { id: 'offensive', name: 'Offensive', icon: '⚔️', color: '#f44336' },
    { id: 'defensive', name: 'Defensive', icon: '🛡️', color: '#4caf50' },
    { id: 'support', name: 'Support', icon: '🚁', color: '#2196f3' },
    { id: 'utility', name: 'Utility', icon: '🔧', color: '#ff9800' }
  ];

  // Load strategems data when component mounts
  useEffect(() => {
    const loadStrategems = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await mockDataService.getStrategems();
        setStrategems(data);
        setFilteredStrategems(data);
      } catch (err) {
        setError('Failed to load strategems data. Please try again later.');
        console.error('Error loading strategems:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStrategems();
  }, []);

  // Apply filters when filters change
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...strategems];

      if (filters.searchTerm) {
        filtered = filtered.filter(strategem =>
          strategem.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          strategem.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
        );
      }

      if (filters.strategemType) {
        filtered = filtered.filter(strategem => strategem.strategemType === filters.strategemType);
      }

      if (filters.unlocked !== undefined) {
        filtered = filtered.filter(strategem => strategem.unlocked === filters.unlocked);
      }

      setFilteredStrategems(filtered);
    };

    applyFilters();
  }, [filters, strategems]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      searchTerm: e.target.value
    }));
  };

  // Handle strategem type filter
  const handleTypeChange = (type: string) => {
    setFilters(prev => ({
      ...prev,
      strategemType: type === 'all' ? undefined : type
    }));
  };

  // Handle unlocked filter
  const handleUnlockedChange = (unlocked: string) => {
    setFilters(prev => ({
      ...prev,
      unlocked: unlocked === 'all' ? undefined : unlocked === 'unlocked'
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      strategemType: undefined,
      unlocked: undefined
    });
  };

  // Get strategem type color
  const getTypeColor = (type: string) => {
    const strategemType = strategemTypes.find(st => st.id === type);
    return strategemType?.color || '#888';
  };

  if (loading) {
    return (
      <div className="strategems-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading strategems data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="strategems-page">
        <div className="error">
          <Zap size={24} />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="strategems-page">
      <div className="container">
        {/* Page header */}
        <header className="page-header">
          <h1>Strategems Database</h1>
          <p>Search and filter strategems by type and effects</p>
        </header>

        {/* Search and filter controls */}
        <div className="search-controls">
          {/* Search bar */}
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search strategems by name..."
              value={filters.searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          {/* Filter toggle button */}
          <button
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
            <span>Filters</span>
          </button>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="filter-panel">
            <div className="filter-section">
              <h3>Strategem Type</h3>
              <div className="type-filters">
                {strategemTypes.map(type => (
                  <button
                    key={type.id}
                    className={`type-filter ${filters.strategemType === type.id || (type.id === 'all' && !filters.strategemType) ? 'active' : ''}`}
                    onClick={() => handleTypeChange(type.id)}
                    style={{ '--type-color': type.color } as React.CSSProperties}
                  >
                    <span className="type-icon">{type.icon}</span>
                    <span>{type.name}</span>
                  </button>
                ))}
              </div>
            </div>

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

        {/* Results count */}
        <div className="results-info">
          <p>Showing {filteredStrategems.length} of {strategems.length} strategems</p>
        </div>

        {/* Strategems grid */}
        <div className="strategems-grid">
          {filteredStrategems.map((strategem) => (
            <div key={strategem.id} className="strategem-card">
              {/* Card header */}
              <div className="card-header">
                <div className="strategem-info">
                  <h3>{strategem.name}</h3>
                  <div className="strategem-meta">
                    <span 
                      className="strategem-type"
                      style={{ color: getTypeColor(strategem.strategemType) }}
                    >
                      {strategemTypes.find(st => st.id === strategem.strategemType)?.icon} {strategem.strategemType.charAt(0).toUpperCase() + strategem.strategemType.slice(1)}
                    </span>
                    <span className={`unlock-status ${strategem.unlocked ? 'unlocked' : 'locked'}`}>
                      {strategem.unlocked ? 'Unlocked' : 'Locked'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="strategem-description">{strategem.description}</p>

              {/* Key stats */}
              <div className="strategem-stats">
                <div className="stat-row">
                  <Clock size={16} />
                  <span>Cooldown</span>
                  <span>{strategem.cooldown}s</span>
                </div>
                <div className="stat-row">
                  <Target size={16} />
                  <span>Uses</span>
                  <span>{strategem.uses}</span>
                </div>
                <div className="stat-row">
                  <Zap size={16} />
                  <span>Call Time</span>
                  <span>{strategem.callTime}s</span>
                </div>
              </div>

              {/* Effects */}
              {strategem.effects.length > 0 && (
                <div className="effects-section">
                  <h4>Effects</h4>
                  <div className="effects-list">
                    {strategem.effects.map((effect) => (
                      <div key={effect.id} className="effect-item">
                        <h5>{effect.name}</h5>
                        <p>{effect.description}</p>
                        {(effect.duration || effect.range) && (
                          <div className="effect-details">
                            {effect.duration && (
                              <span>Duration: {effect.duration}s</span>
                            )}
                            {effect.range && (
                              <span>Range: {effect.range}m</span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cost */}
              <div className="cost-section">
                <div className="cost-item">
                  <span className="cost-type">Medals</span>
                  <span className="cost-amount">{strategem.cost.medals}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredStrategems.length === 0 && (
          <div className="no-results">
            <Zap size={48} />
            <h3>No strategems found</h3>
            <p>Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};
