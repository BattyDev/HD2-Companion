import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Medal, BookOpen } from 'lucide-react';
import { GameItem, Warbond } from '../types';
import { mockDataService } from '../services/mockDataService';
import './ItemDetailPage.css';

/**
 * ItemDetailPage component - Shows detailed information about a specific item
 * Displays item stats, traits, and links to its warbond
 */
export const ItemDetailPage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [item, setItem] = useState<GameItem | null>(null);
  const [warbond, setWarbond] = useState<Warbond | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItem = async () => {
      if (!itemId) return;

      try {
        setLoading(true);
        setError(null);
        
        const itemData = await mockDataService.getItemById(itemId);
        if (!itemData) {
          setError('Item not found');
          return;
        }
        
        setItem(itemData);
        
        // Load the warbond for this item
        const warbondData = await mockDataService.getWarbondById(itemData.warbondId);
        setWarbond(warbondData);
      } catch (err) {
        setError('Failed to load item data. Please try again later.');
        console.error('Error loading item:', err);
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [itemId]);

  if (loading) {
    return (
      <div className="item-detail-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading item details...</p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="item-detail-page">
        <div className="error">
          <p>{error || 'Item not found'}</p>
          <Link to="/" className="btn">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="item-detail-page">
      <div className="container">
        {/* Back button */}
        <div className="back-button">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Item header */}
        <header className="item-header">
          <h1>{item.name}</h1>
          <p className="item-type">{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
          <p className="item-description">{item.description}</p>
        </header>

        {/* Item details based on type */}
        <div className="item-details">
          {item.type === 'armor' && (
            <div className="armor-details">
              <div className="detail-section">
                <h3>Armor Stats</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">Armor Type</span>
                    <span className="stat-value">{item.armorType}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Armor Rating</span>
                    <span className="stat-value">{item.armorRating}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Speed Modifier</span>
                    <span className={`stat-value ${item.speedModifier >= 0 ? 'positive' : 'negative'}`}>
                      {item.speedModifier > 0 ? '+' : ''}{item.speedModifier}%
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Stamina Regen</span>
                    <span className={`stat-value ${item.staminaRegenModifier >= 0 ? 'positive' : 'negative'}`}>
                      {item.staminaRegenModifier > 0 ? '+' : ''}{item.staminaRegenModifier}%
                    </span>
                  </div>
                </div>
              </div>

              {item.traits.length > 0 && (
                <div className="detail-section">
                  <h3>Traits</h3>
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

              <div className="detail-section">
                <h3>Resistances</h3>
                <div className="resistances-grid">
                  {Object.entries(item.resistances).map(([type, value]) => (
                    <div key={type} className="resistance-item">
                      <span className="resistance-type">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                      <span className="resistance-value">{value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {item.type === 'weapon' && (
            <div className="weapon-details">
              <div className="detail-section">
                <h3>Weapon Stats</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">Damage</span>
                    <span className="stat-value">{item.damage}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Damage Type</span>
                    <span className="stat-value">{item.damageType}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Armor Penetration</span>
                    <span className="stat-value">{item.armorPenetration}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Fire Rate</span>
                    <span className="stat-value">{item.fireRate} RPM</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Magazine Size</span>
                    <span className="stat-value">{item.magazineSize}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Range</span>
                    <span className="stat-value">{item.range}m</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Accuracy</span>
                    <span className="stat-value">{item.accuracy}%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Reload Time</span>
                    <span className="stat-value">{item.reloadTime}s</span>
                  </div>
                </div>
              </div>

              {item.traits.length > 0 && (
                <div className="detail-section">
                  <h3>Traits</h3>
                  <div className="traits-list">
                    {item.traits.map((trait) => (
                      <div key={trait.id} className="trait-item">
                        <span className="trait-name">{trait.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {item.type === 'strategem' && (
            <div className="strategem-details">
              <div className="detail-section">
                <h3>Strategem Stats</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">Type</span>
                    <span className="stat-value">{item.strategemType}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Cooldown</span>
                    <span className="stat-value">{item.cooldown}s</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Uses</span>
                    <span className="stat-value">{item.uses}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Call Time</span>
                    <span className="stat-value">{item.callTime}s</span>
                  </div>
                </div>
              </div>

              {item.effects.length > 0 && (
                <div className="detail-section">
                  <h3>Effects</h3>
                  <div className="effects-list">
                    {item.effects.map((effect) => (
                      <div key={effect.id} className="effect-item">
                        <h4>{effect.name}</h4>
                        <p>{effect.description}</p>
                        {(effect.duration || effect.range) && (
                          <div className="effect-details">
                            {effect.duration && <span>Duration: {effect.duration}s</span>}
                            {effect.range && <span>Range: {effect.range}m</span>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {item.type === 'booster' && (
            <div className="booster-details">
              <div className="detail-section">
                <h3>Booster Stats</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">Effect</span>
                    <span className="stat-value">{item.effect}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Duration</span>
                    <span className="stat-value">{item.duration === 0 ? 'Mission' : `${item.duration}s`}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Stackable</span>
                    <span className="stat-value">{item.stackable ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>

              {item.effects.length > 0 && (
                <div className="detail-section">
                  <h3>Effects</h3>
                  <div className="effects-list">
                    {item.effects.map((effect) => (
                      <div key={effect.id} className="effect-item">
                        <h4>{effect.name}</h4>
                        <p>{effect.description}</p>
                        <div className="effect-value">+{effect.value}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Cost and warbond info */}
        <div className="item-footer">
          <div className="cost-section">
            <h3>Cost</h3>
            <div className="cost-item">
              <Medal size={20} />
              <span className="cost-amount">{item.cost.medals}</span>
              <span className="cost-label">Medals</span>
            </div>
          </div>

          {warbond && (
            <div className="warbond-section">
              <h3>Warbond</h3>
              <div className="warbond-info">
                <BookOpen size={20} />
                <div className="warbond-details">
                  <span className="warbond-name">{warbond.name}</span>
                  <span className="warbond-page">Page {item.warbondPage}</span>
                </div>
                <Link to={`/warbonds`} className="btn btn-secondary">
                  View Warbond
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
