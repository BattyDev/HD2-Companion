import React, { useState, useEffect } from 'react';
import { BookOpen, Lock, Unlock, Medal } from 'lucide-react';
import { Warbond } from '../types';
import { mockDataService } from '../services/mockDataService';
import './WarbondsPage.css';

/**
 * WarbondsPage component - Display all available warbonds
 * Shows progression system with pages and items
 */
export const WarbondsPage: React.FC = () => {
  const [warbonds, setWarbonds] = useState<Warbond[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWarbonds = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await mockDataService.getWarbonds();
        setWarbonds(data);
      } catch (err) {
        setError('Failed to load warbonds data. Please try again later.');
        console.error('Error loading warbonds:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWarbonds();
  }, []);

  if (loading) {
    return (
      <div className="warbonds-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading warbonds data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="warbonds-page">
        <div className="error">
          <BookOpen size={24} />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="warbonds-page">
      <div className="container">
        <header className="page-header">
          <h1>Warbonds</h1>
          <p>Progression system and item unlocks</p>
        </header>

        <div className="warbonds-grid">
          {warbonds.map((warbond) => (
            <div key={warbond.id} className="warbond-card">
              <div className="warbond-header">
                <div className="warbond-info">
                  <h3>{warbond.name}</h3>
                  <p>{warbond.description}</p>
                </div>
                <div className="warbond-status">
                  {warbond.unlocked ? (
                    <div className="unlocked-badge">
                      <Unlock size={16} />
                      <span>Unlocked</span>
                    </div>
                  ) : (
                    <div className="locked-badge">
                      <Lock size={16} />
                      <span>Locked</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="warbond-progress">
                <div className="progress-info">
                  <span>Total Medals Required</span>
                  <span>{warbond.totalMedals.toLocaleString()}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '0%' }}></div>
                </div>
              </div>

              <div className="warbond-pages">
                <h4>Pages</h4>
                <div className="pages-list">
                  {warbond.pages.map((page) => (
                    <div key={page.pageNumber} className="page-item">
                      <div className="page-header">
                        <span className="page-number">Page {page.pageNumber}</span>
                        <span className="page-medals">{page.requiredMedals} Medals</span>
                      </div>
                      <div className="page-items">
                        <span>{page.items.length} items</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
