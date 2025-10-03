import React, { useState, useEffect } from 'react';
import { Search, Filter, Shield, Zap, Battery } from 'lucide-react';
import { Armor, ArmorFilters } from '../types';
import { mockDataService } from '../services/mockDataService';
import './ArmorPage.css';

/**
 * ArmorPage component - Search and filter armor by traits
 * Allows users to find armor with specific attributes like grenade capacity, resistances, etc.
 * Provides detailed filtering options for armor type, traits, and stats
 */
export const ArmorPage: React.FC = () => {
  const [armor, setArmor] = useState<Armor[]>([]);
  const [filteredArmor, setFilteredArmor] = useState<Armor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState<ArmorFilters>({
    searchTerm: '',
    armorType: undefined,
    traits: [],
    minArmorRating: undefined,
    maxArmorRating: undefined,
    unlocked: undefined
  });

  // Available armor traits for filtering
  const availableTraits = [
    { id: 'grenade_capacity', name: 'Grenade Capacity', icon: '💣' },
    { id: 'stim_capacity', name: 'Stim Capacity', icon: '💉' },
    { id: 'ammo_capacity', name: 'Ammo Capacity', icon: '🔫' },
    { id: 'armor_rating', name: 'Armor Rating', icon: '🛡️' },
    { id: 'speed', name: 'Speed Boost', icon: '🏃' },
    { id: 'stamina', name: 'Stamina Boost', icon: '⚡' },
    { id: 'resistance', name: 'Resistance', icon: '🛡️' }
  ];

  // Load armor data when component mounts
  useEffect(() => {
    const loadArmor = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await mockDataService.getArmor();
        setArmor(data);
        setFilteredArmor(data);
      } catch (err) {
        setError('Failed to load armor data. Please try again later.');
        console.error('Error loading armor:', err);
      } finally {
        setLoading(false);
      }
    };

    loadArmor();
  }, []);

  // Apply filters when filters change
  useEffect(() => {
    const applyFilters = async () => {
      try {
        const filtered = await mockDataService.searchArmor(filters);
        setFilteredArmor(filtered);
      } catch (err) {
        console.error('Error filtering armor:', err);
      }
    };

    applyFilters();
  }, [filters]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      searchTerm: e.target.value
    }));
  };

  // Handle armor type filter
  const handleArmorTypeChange = (armorType: string) => {
    setFilters(prev => ({
      ...prev,
      armorType: armorType === 'all' ? undefined : armorType as any
    }));
  };

  // Handle trait filter toggle
  const handleTraitToggle = (traitId: string) => {
    setFilters(prev => ({
      ...prev,
      traits: prev.traits?.includes(traitId)
        ? prev.traits.filter(id => id !== traitId)
        : [...(prev.traits || []), traitId]
    }));
  };

  // Handle armor rating range
  const handleArmorRatingChange = (field: 'min' | 'max', value: string) => {
    const numValue = value === '' ? undefined : parseInt(value);
    setFilters(prev => ({
      ...prev,
      [`${field}ArmorRating`]: numValue
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
      armorType: undefined,
      traits: [],
      minArmorRating: undefined,
      maxArmorRating: undefined,
      unlocked: undefined
    });
  };

  // Get armor type color
  const getArmorTypeColor = (type: string) => {
    switch (type) {
      case 'light': return '#4caf50';
      case 'medium': return '#ff9800';
      case 'heavy': return '#f44336';
      default: return '#888';
    }
  };

  if (loading) {
    return (
      <div className="armor-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading armor data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="armor-page">
        <div className="error">
          <Shield size={24} />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="armor-page">
      <div className="container">
        {/* Page header */}
        <header className="page-header">
          <h1>Armor Database</h1>
          <p>Search and filter armor by traits, resistances, and stats</p>
        </header>

        {/* Search and filter controls */}
        <div className="search-controls">
          {/* Search bar */}
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search armor by name..."
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
              <h3>Armor Type</h3>
              <div className="filter-options">
                {['all', 'light', 'medium', 'heavy'].map(type => (
                  <button
                    key={type}
                    className={`filter-option ${filters.armorType === type || (type === 'all' && !filters.armorType) ? 'active' : ''}`}
                    onClick={() => handleArmorTypeChange(type)}
                  >
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Traits</h3>
              <div className="trait-filters">
                {availableTraits.map(trait => (
                  <button
                    key={trait.id}
                    className={`trait-filter ${filters.traits?.includes(trait.id) ? 'active' : ''}`}
                    onClick={() => handleTraitToggle(trait.id)}
                  >
                    <span className="trait-icon">{trait.icon}</span>
                    <span>{trait.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Armor Rating</h3>
              <div className="range-inputs">
                <div className="range-input">
                  <label>Min</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.minArmorRating || ''}
                    onChange={(e) => handleArmorRatingChange('min', e.target.value)}
                    min="0"
                    max="100"
                  />
                </div>
                <div className="range-input">
                  <label>Max</label>
                  <input
                    type="number"
                    placeholder="100"
                    value={filters.maxArmorRating || ''}
                    onChange={(e) => handleArmorRatingChange('max', e.target.value)}
                    min="0"
                    max="100"
                  />
                </div>
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
          <p>Showing {filteredArmor.length} of {armor.length} armor pieces</p>
        </div>

        {/* Armor grid */}
        <div className="armor-grid">
          {filteredArmor.map((item) => (
            <div key={item.id} className="armor-card">
              {/* Card header */}
              <div className="card-header">
                <div className="armor-info">
                  <h3>{item.name}</h3>
                  <div className="armor-meta">
                    <span 
                      className="armor-type"
                      style={{ color: getArmorTypeColor(item.armorType) }}
                    >
                      {item.armorType.charAt(0).toUpperCase() + item.armorType.slice(1)} Armor
                    </span>
                    <span className={`unlock-status ${item.unlocked ? 'unlocked' : 'locked'}`}>
                      {item.unlocked ? 'Unlocked' : 'Locked'}
                    </span>
                  </div>
                </div>
                <div className="armor-rating">
                  <span className="rating-value">{item.armorRating}</span>
                  <span className="rating-label">Armor</span>
                </div>
              </div>

              {/* Description */}
              <p className="armor-description">{item.description}</p>

              {/* Stats */}
              <div className="armor-stats">
                <div className="stat-row">
                  <span>Speed Modifier</span>
                  <span className={item.speedModifier >= 0 ? 'positive' : 'negative'}>
                    {item.speedModifier > 0 ? '+' : ''}{item.speedModifier}%
                  </span>
                </div>
                <div className="stat-row">
                  <span>Stamina Regen</span>
                  <span className={item.staminaRegenModifier >= 0 ? 'positive' : 'negative'}>
                    {item.staminaRegenModifier > 0 ? '+' : ''}{item.staminaRegenModifier}%
                  </span>
                </div>
              </div>

              {/* Traits */}
              {item.traits.length > 0 && (
                <div className="traits-section">
                  <h4>Traits</h4>
                  <div className="traits-list">
                    {item.traits.map((trait) => (
                      <div key={trait.id} className="trait-item">
                        <span className="trait-name">{trait.name}</span>
                        <span className="trait-value">+{trait.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resistances */}
              <div className="resistances-section">
                <h4>Resistances</h4>
                <div className="resistances-list">
                  {Object.entries(item.resistances).map(([type, value]) => (
                    <div key={type} className="resistance-item">
                      <span className="resistance-type">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                      <span className="resistance-value">{value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost */}
              <div className="cost-section">
                <div className="cost-item">
                  <span className="cost-type">Medals</span>
                  <span className="cost-amount">{item.cost.medals}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredArmor.length === 0 && (
          <div className="no-results">
            <Shield size={48} />
            <h3>No armor found</h3>
            <p>Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};
