import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Map, 
  Shield, 
  Swords, 
  Zap, 
  Battery, 
  BookOpen,
  Menu,
  X
} from 'lucide-react';
import { NavigationItem } from '../types';
import './Navigation.css';

/**
 * Navigation component for the Helldivers 2 Tool
 * Provides mobile-friendly bottom navigation with hamburger menu for additional items
 * Uses Lucide React icons for consistent iconography
 */
export const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation items - main items shown on mobile, additional in hamburger menu
  const mainNavItems: NavigationItem[] = [
    { id: 'home', label: 'Home', path: '/', icon: 'Home' },
    { id: 'war-efforts', label: 'War', path: '/war-efforts', icon: 'Map' },
    { id: 'armor', label: 'Armor', path: '/armor', icon: 'Shield' },
    { id: 'weapons', label: 'Weapons', path: '/weapons', icon: 'Swords' },
  ];

  const additionalNavItems: NavigationItem[] = [
    { id: 'strategems', label: 'Strategems', path: '/strategems', icon: 'Zap' },
    { id: 'boosters', label: 'Boosters', path: '/boosters', icon: 'Battery' },
    { id: 'warbonds', label: 'Warbonds', path: '/warbonds', icon: 'BookOpen' },
  ];

  // Check if current path matches navigation item
  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  // Get icon component from string
  const getIcon = (iconName: string) => {
    const icons = {
      Home,
      Map,
      Shield,
      Swords,
      Zap,
      Battery,
      BookOpen,
    };
    return icons[iconName as keyof typeof icons] || Home;
  };

  return (
    <>
      {/* Mobile hamburger menu overlay */}
      {isMenuOpen && (
        <div className="nav-overlay" onClick={() => setIsMenuOpen(false)}>
          <div className="nav-menu" onClick={(e) => e.stopPropagation()}>
            <div className="nav-menu-header">
              <h3>Menu</h3>
              <button 
                className="nav-close-btn"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="nav-menu-items">
              {additionalNavItems.map((item) => {
                const IconComponent = getIcon(item.icon);
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`nav-menu-item ${isActive(item.path) ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <IconComponent size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Bottom navigation bar */}
      <nav className="bottom-nav">
        <div className="nav-container">
          {/* Main navigation items */}
          {mainNavItems.map((item) => {
            const IconComponent = getIcon(item.icon);
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              >
                <IconComponent size={20} />
                <span className="nav-label">{item.label}</span>
              </Link>
            );
          })}
          
          {/* Hamburger menu button for additional items */}
          <button
            className="nav-item nav-menu-btn"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
            <span className="nav-label">More</span>
          </button>
        </div>
      </nav>
    </>
  );
};
