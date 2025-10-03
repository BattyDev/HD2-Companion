import React, { useState, useEffect } from 'react';
import { Users, AlertTriangle, CheckCircle, XCircle, MapPin } from 'lucide-react';
import { WarEffort } from '../types';
import { mockDataService } from '../services/mockDataService';
import './WarEffortsPage.css';

/**
 * WarEffortsPage component - Shows all active war efforts across planets
 * Displays planets ordered by helldiver count with progress tracking
 * Provides detailed information about each campaign
 */
export const WarEffortsPage: React.FC = () => {
  const [warEfforts, setWarEfforts] = useState<WarEffort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'helldivers' | 'progress' | 'hazard'>('helldivers');

  // Load war efforts data when component mounts
  useEffect(() => {
    const loadWarEfforts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await mockDataService.getWarEfforts();
        setWarEfforts(data);
      } catch (err) {
        setError('Failed to load war efforts data. Please try again later.');
        console.error('Error loading war efforts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWarEfforts();
  }, []);

  // Sort war efforts based on selected criteria
  const sortedWarEfforts = [...warEfforts].sort((a, b) => {
    switch (sortBy) {
      case 'helldivers':
        return b.helldiverCount - a.helldiverCount;
      case 'progress':
        return b.progress - a.progress;
      case 'hazard':
        return b.planet.hazardLevel - a.planet.hazardLevel;
      default:
        return 0;
    }
  });

  // Get status icon and color
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active':
        return { icon: AlertTriangle, color: '#4a90e2', text: 'Active' };
      case 'completed':
        return { icon: CheckCircle, color: '#4caf50', text: 'Completed' };
      case 'defeated':
        return { icon: XCircle, color: '#f44336', text: 'Defeated' };
      default:
        return { icon: AlertTriangle, color: '#888', text: 'Unknown' };
    }
  };

  // Get hazard level color
  const getHazardColor = (level: number) => {
    if (level <= 3) return '#4caf50'; // Green - Low
    if (level <= 6) return '#ff9800'; // Orange - Medium
    if (level <= 8) return '#f44336'; // Red - High
    return '#9c27b0'; // Purple - Extreme
  };

  if (loading) {
    return (
      <div className="war-efforts-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading war efforts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="war-efforts-page">
        <div className="error">
          <AlertTriangle size={24} />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="war-efforts-page">
      <div className="container">
        {/* Page header */}
        <header className="page-header">
          <h1>War Efforts</h1>
          <p>Track the galactic war across all planets</p>
        </header>

        {/* Sorting controls */}
        <div className="sort-controls">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="sort-select"
          >
            <option value="helldivers">Helldiver Count</option>
            <option value="progress">Progress</option>
            <option value="hazard">Hazard Level</option>
          </select>
        </div>

        {/* War efforts list */}
        <div className="war-efforts-list">
          {sortedWarEfforts.map((effort, index) => {
            const statusInfo = getStatusInfo(effort.status);
            const StatusIcon = statusInfo.icon;
            const hazardColor = getHazardColor(effort.planet.hazardLevel);

            return (
              <div key={effort.id} className="war-effort-card">
                {/* Card header with planet info and status */}
                <div className="card-header">
                  <div className="planet-info">
                    <div className="planet-name-section">
                      <h3>{effort.planet.name}</h3>
                      <div className="planet-meta">
                        <span className="biome">{effort.planet.biome}</span>
                        <span 
                          className="hazard-level"
                          style={{ color: hazardColor }}
                        >
                          Hazard Level {effort.planet.hazardLevel}
                        </span>
                      </div>
                    </div>
                    <div className="status-badge">
                      <StatusIcon size={16} />
                      <span style={{ color: statusInfo.color }}>
                        {statusInfo.text}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Helldiver count and progress */}
                <div className="card-stats">
                  <div className="helldiver-count">
                    <Users size={20} />
                    <div className="count-info">
                      <span className="count">{effort.helldiverCount.toLocaleString()}</span>
                      <span className="label">Helldivers</span>
                    </div>
                  </div>
                  
                  <div className="progress-section">
                    <div className="progress-header">
                      <span>Campaign Progress</span>
                      <span>{effort.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${effort.progress}%` }}
                      ></div>
                    </div>
                    <div className="progress-details">
                      <span>{effort.progress.toLocaleString()} / {effort.maxProgress.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Objectives */}
                {effort.objectives.length > 0 && (
                  <div className="objectives-section">
                    <h4>Objectives</h4>
                    <div className="objectives-list">
                      {effort.objectives.map((objective) => (
                        <div key={objective.id} className="objective-item">
                          <div className="objective-header">
                            <h5>{objective.title}</h5>
                            <span className="objective-type">{objective.type}</span>
                          </div>
                          <p className="objective-description">{objective.description}</p>
                          <div className="objective-progress">
                            <div className="progress-bar">
                              <div 
                                className="progress-fill"
                                style={{ width: `${(objective.progress / objective.maxProgress) * 100}%` }}
                              ></div>
                            </div>
                            <span className="progress-text">
                              {objective.progress} / {objective.maxProgress}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Planet location indicator */}
                <div className="planet-location">
                  <MapPin size={16} />
                  <span>Active Campaign Zone</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary statistics */}
        <div className="summary-stats">
          <div className="stat-item">
            <h3>{warEfforts.length}</h3>
            <p>Active Campaigns</p>
          </div>
          <div className="stat-item">
            <h3>{warEfforts.reduce((sum, effort) => sum + effort.helldiverCount, 0).toLocaleString()}</h3>
            <p>Total Helldivers</p>
          </div>
          <div className="stat-item">
            <h3>{Math.round(warEfforts.reduce((sum, effort) => sum + effort.progress, 0) / warEfforts.length)}%</h3>
            <p>Average Progress</p>
          </div>
        </div>
      </div>
    </div>
  );
};
