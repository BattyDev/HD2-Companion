import React, { useState, useEffect } from 'react';
import { Search, Filter, Swords, Target, Zap } from 'lucide-react';
import { Weapon, WeaponFilters } from '../types';
import { mockDataService } from '../services/mockDataService';
import './WeaponsPage.css';

/**
 * WeaponsPage component - Search and filter weapons by damage type and stats
 * Allows users to find weapons with specific damage types, armor penetration, etc.
 * Provides detailed filtering options for weapon type, damage, and characteristics
 */
export const WeaponsPage: React.FC = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [filteredWeapons, setFilteredWeapons] = useState<Weapon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState<WeaponFilters>({
    searchTerm: '',
    weaponType: undefined,
    damageType: [],
    armorPenetration: [],
    minDamage: undefined,
    maxDamage: undefined,
    unlocked: undefined
  });

  // Available damage types for filtering
  const damageTypes = [
    { id: 'kinetic', name: 'Kinetic', icon: '🔫', color: '#888' },
    { id: 'explosive', name: 'Explosive', icon: '💥', color: '#ff6b6b' },
    { id: 'fire', name: 'Fire', icon: '🔥', color: '#ff9800' },
    { id: 'acid', name: 'Acid', icon: '🧪', color: '#4caf50' },
    { id: 'electric', name: 'Electric', icon: '⚡', color: '#9c27b0' },
    { id: 'laser', name: 'Laser', icon: '🔴', color: '#f44336' }
  ];

  // Available armor penetration levels
  const penetrationLevels = [
    { id: 'none', name: 'None', color: '#888' },
    { id: 'light', name: 'Light', color: '#4caf50' },
    { id: 'medium', name: 'Medium', color: '#ff9800' },
    { id: 'heavy', name: 'Heavy', color: '#f44336' }
  ];

  // Load weapons data when component mounts
  useEffect(() => {
    const loadWeapons = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await mockDataService.getWeapons();
        setWeapons(data);
        setFilteredWeapons(data);
      } catch (err) {
        setError('Failed to load weapons data. Please try again later.');
        console.error('Error loading weapons:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWeapons();
  }, []);

  // Apply filters when filters change
  useEffect(() => {
    const applyFilters = async () => {
      try {
        const filtered = await mockDataService.searchWeapons(filters);
        setFilteredWeapons(filtered);
      } catch (err) {
        console.error('Error filtering weapons:', err);
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

  // Handle weapon type filter
  const handleWeaponTypeChange = (weaponType: string) => {
    setFilters(prev => ({
      ...prev,
      weaponType: weaponType === 'all' ? undefined : weaponType as any
    }));
  };

  // Handle damage type filter toggle
  const handleDamageTypeToggle = (damageType: string) => {
    setFilters(prev => ({
      ...prev,
      damageType: prev.damageType?.includes(damageType)
        ? prev.damageType.filter(type => type !== damageType)
        : [...(prev.damageType || []), damageType]
    }));
  };

  // Handle armor penetration filter toggle
  const handlePenetrationToggle = (penetration: string) => {
    setFilters(prev => ({
      ...prev,
      armorPenetration: prev.armorPenetration?.includes(penetration)
        ? prev.armorPenetration.filter(pen => pen !== penetration)
        : [...(prev.armorPenetration || []), penetration]
    }));
  };

  // Handle damage range
  const handleDamageChange = (field: 'min' | 'max', value: string) => {
    const numValue = value === '' ? undefined : parseInt(value);
    setFilters(prev => ({
      ...prev,
      [`${field}Damage`]: numValue
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
      weaponType: undefined,
      damageType: [],
      armorPenetration: [],
      minDamage: undefined,
      maxDamage: undefined,
      unlocked: undefined
    });
  };

  // Get damage type color
  const getDamageTypeColor = (type: string) => {
    const damageType = damageTypes.find(dt => dt.id === type);
    return damageType?.color || '#888';
  };

  // Get penetration color
  const getPenetrationColor = (penetration: string) => {
    const penLevel = penetrationLevels.find(pl => pl.id === penetration);
    return penLevel?.color || '#888';
  };

  if (loading) {
    return (
      <div className="weapons-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading weapons data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weapons-page">
        <div className="error">
          <Swords size={24} />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="weapons-page">
      <div className="container">
        {/* Page header */}
        <header className="page-header">
          <h1>Weapons Database</h1>
          <p>Search and filter weapons by damage type, penetration, and stats</p>
        </header>

        {/* Search and filter controls */}
        <div className="search-controls">
          {/* Search bar */}
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search weapons by name..."
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
              <h3>Weapon Type</h3>
              <div className="filter-options">
                {['all', 'primary', 'secondary', 'melee'].map(type => (
                  <button
                    key={type}
                    className={`filter-option ${filters.weaponType === type || (type === 'all' && !filters.weaponType) ? 'active' : ''}`}
                    onClick={() => handleWeaponTypeChange(type)}
                  >
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Damage Type</h3>
              <div className="damage-type-filters">
                {damageTypes.map(type => (
                  <button
                    key={type.id}
                    className={`damage-type-filter ${filters.damageType?.includes(type.id) ? 'active' : ''}`}
                    onClick={() => handleDamageTypeToggle(type.id)}
                    style={{ '--type-color': type.color } as React.CSSProperties}
                  >
                    <span className="damage-icon">{type.icon}</span>
                    <span>{type.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Armor Penetration</h3>
              <div className="penetration-filters">
                {penetrationLevels.map(level => (
                  <button
                    key={level.id}
                    className={`penetration-filter ${filters.armorPenetration?.includes(level.id) ? 'active' : ''}`}
                    onClick={() => handlePenetrationToggle(level.id)}
                    style={{ '--pen-color': level.color } as React.CSSProperties}
                  >
                    {level.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Damage Range</h3>
              <div className="range-inputs">
                <div className="range-input">
                  <label>Min Damage</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.minDamage || ''}
                    onChange={(e) => handleDamageChange('min', e.target.value)}
                    min="0"
                  />
                </div>
                <div className="range-input">
                  <label>Max Damage</label>
                  <input
                    type="number"
                    placeholder="200"
                    value={filters.maxDamage || ''}
                    onChange={(e) => handleDamageChange('max', e.target.value)}
                    min="0"
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
          <p>Showing {filteredWeapons.length} of {weapons.length} weapons</p>
        </div>

        {/* Weapons grid */}
        <div className="weapons-grid">
          {filteredWeapons.map((weapon) => (
            <div key={weapon.id} className="weapon-card">
              {/* Card header */}
              <div className="card-header">
                <div className="weapon-info">
                  <h3>{weapon.name}</h3>
                  <div className="weapon-meta">
                    <span className="weapon-type">
                      {weapon.weaponType.charAt(0).toUpperCase() + weapon.weaponType.slice(1)}
                    </span>
                    <span className={`unlock-status ${weapon.unlocked ? 'unlocked' : 'locked'}`}>
                      {weapon.unlocked ? 'Unlocked' : 'Locked'}
                    </span>
                  </div>
                </div>
                <div className="damage-info">
                  <span 
                    className="damage-type"
                    style={{ color: getDamageTypeColor(weapon.damageType) }}
                  >
                    {damageTypes.find(dt => dt.id === weapon.damageType)?.icon} {weapon.damageType.charAt(0).toUpperCase() + weapon.damageType.slice(1)}
                  </span>
                  <span className="damage-value">{weapon.damage}</span>
                </div>
              </div>

              {/* Description */}
              <p className="weapon-description">{weapon.description}</p>

              {/* Key stats */}
              <div className="weapon-stats">
                <div className="stat-row">
                  <span>Armor Penetration</span>
                  <span 
                    className="penetration-value"
                    style={{ color: getPenetrationColor(weapon.armorPenetration) }}
                  >
                    {weapon.armorPenetration.charAt(0).toUpperCase() + weapon.armorPenetration.slice(1)}
                  </span>
                </div>
                <div className="stat-row">
                  <span>Fire Rate</span>
                  <span>{weapon.fireRate} RPM</span>
                </div>
                <div className="stat-row">
                  <span>Magazine Size</span>
                  <span>{weapon.magazineSize}</span>
                </div>
                <div className="stat-row">
                  <span>Range</span>
                  <span>{weapon.range}m</span>
                </div>
                <div className="stat-row">
                  <span>Accuracy</span>
                  <span>{weapon.accuracy}%</span>
                </div>
                <div className="stat-row">
                  <span>Reload Time</span>
                  <span>{weapon.reloadTime}s</span>
                </div>
              </div>

              {/* Traits */}
              {weapon.traits.length > 0 && (
                <div className="traits-section">
                  <h4>Traits</h4>
                  <div className="traits-list">
                    {weapon.traits.map((trait) => (
                      <div key={trait.id} className="trait-item">
                        <span className="trait-name">{trait.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cost */}
              <div className="cost-section">
                <div className="cost-item">
                  <span className="cost-type">Medals</span>
                  <span className="cost-amount">{weapon.cost.medals}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredWeapons.length === 0 && (
          <div className="no-results">
            <Swords size={48} />
            <h3>No weapons found</h3>
            <p>Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};
