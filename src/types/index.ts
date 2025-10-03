/**
 * TypeScript interfaces for Helldivers 2 data structures
 * These interfaces define the shape of data we expect from the community API
 */

// Major Order - The current primary objective for all players
export interface MajorOrder {
  id: string;
  title: string;
  description: string;
  briefing: string;
  progress: number; // 0-100 percentage
  maxProgress: number;
  reward: {
    type: 'medals' | 'requisition' | 'samples';
    amount: number;
  };
  expiresAt: string; // ISO date string
  planet?: {
    id: string;
    name: string;
  };
}

// War Effort - Individual planet campaigns
export interface WarEffort {
  id: string;
  planet: {
    id: string;
    name: string;
    imageUrl?: string;
    biome: string;
    hazardLevel: number; // 1-9 difficulty
  };
  helldiverCount: number; // Number of players on this planet
  progress: number; // 0-100 percentage
  maxProgress: number;
  status: 'active' | 'completed' | 'defeated';
  objectives: WarObjective[];
}

// Individual objectives within a war effort
export interface WarObjective {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  type: 'liberate' | 'defend' | 'attack';
}

// Base item interface that all game items extend
export interface BaseItem {
  id: string;
  name: string;
  description: string;
  imageUrl?: string; // Will be added by user
  warbondId: string; // Links to the warbond this item belongs to
  warbondPage: number; // Page within the warbond
  cost: {
    medals: number;
    requisition?: number;
    samples?: number;
  };
  unlocked: boolean; // Whether the player has unlocked this item
}

// Armor specific properties
export interface Armor extends BaseItem {
  type: 'armor';
  armorType: 'light' | 'medium' | 'heavy';
  armorRating: number; // 0-100
  speedModifier: number; // -50 to +50 percentage
  staminaRegenModifier: number; // -50 to +50 percentage
  traits: ArmorTrait[];
  resistances: {
    fire: number;
    explosion: number;
    acid: number;
  };
}

// Armor trait system for searching
export interface ArmorTrait {
  id: string;
  name: string;
  description: string;
  value: number; // The numeric value of the trait (e.g., +2 grenades)
  type: 'grenade_capacity' | 'stim_capacity' | 'ammo_capacity' | 'armor_rating' | 'speed' | 'stamina' | 'resistance';
}

// Weapon specific properties
export interface Weapon extends BaseItem {
  type: 'weapon';
  weaponType: 'primary' | 'secondary' | 'melee';
  damage: number;
  damageType: 'kinetic' | 'explosive' | 'fire' | 'acid' | 'electric' | 'laser';
  armorPenetration: 'light' | 'medium' | 'heavy' | 'none';
  fireRate: number; // Rounds per minute
  magazineSize: number;
  totalAmmo: number;
  reloadTime: number; // Seconds
  range: number; // Effective range in meters
  accuracy: number; // 0-100
  recoil: number; // 0-100
  traits: WeaponTrait[];
}

// Weapon trait system
export interface WeaponTrait {
  id: string;
  name: string;
  description: string;
  type: 'penetration' | 'damage' | 'fire_rate' | 'accuracy' | 'special';
}

// Strategem specific properties
export interface Strategem extends BaseItem {
  type: 'strategem';
  strategemType: 'offensive' | 'defensive' | 'support' | 'utility';
  cooldown: number; // Seconds
  uses: number; // Number of uses per mission
  callTime: number; // Seconds to input the code
  effects: StrategemEffect[];
}

// Strategem effects for detailed descriptions
export interface StrategemEffect {
  id: string;
  name: string;
  description: string;
  duration?: number; // Seconds, if applicable
  range?: number; // Meters, if applicable
}

// Booster specific properties
export interface Booster extends BaseItem {
  type: 'booster';
  effect: string;
  duration: number; // Mission duration or specific time
  stackable: boolean; // Whether multiple can be used
  effects: BoosterEffect[];
}

// Booster effects for detailed descriptions
export interface BoosterEffect {
  id: string;
  name: string;
  description: string;
  value: number; // The numeric value of the effect
  type: 'damage' | 'armor' | 'speed' | 'stamina' | 'ammo' | 'special';
}

// Warbond - The progression system
export interface Warbond {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  pages: WarbondPage[];
  totalMedals: number; // Total medals needed to complete
  unlocked: boolean; // Whether player has access to this warbond
}

// Individual page within a warbond
export interface WarbondPage {
  pageNumber: number;
  name: string;
  items: (Armor | Weapon | Strategem | Booster)[];
  requiredMedals: number; // Medals needed to unlock this page
}

// Union type for all possible items
export type GameItem = Armor | Weapon | Strategem | Booster;

// Search and filter types
export interface SearchFilters {
  searchTerm: string;
  itemType?: 'armor' | 'weapon' | 'strategem' | 'booster';
  warbondId?: string;
  unlocked?: boolean;
}

// Armor specific filters
export interface ArmorFilters extends SearchFilters {
  armorType?: 'light' | 'medium' | 'heavy';
  traits?: string[]; // Array of trait IDs to filter by
  minArmorRating?: number;
  maxArmorRating?: number;
}

// Weapon specific filters
export interface WeaponFilters extends SearchFilters {
  weaponType?: 'primary' | 'secondary' | 'melee';
  damageType?: string[];
  armorPenetration?: string[];
  minDamage?: number;
  maxDamage?: number;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Navigation types
export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: string;
}
