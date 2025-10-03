/**
 * Mock data service for Helldivers 2 Tool
 * This service provides sample data that mimics what would come from the community API
 * In a real application, this would be replaced with actual API calls
 */

import { 
  MajorOrder, 
  WarEffort, 
  Armor, 
  Weapon, 
  Strategem, 
  Booster, 
  Warbond,
  ArmorTrait,
  WeaponTrait 
} from '../types';

// Mock armor traits for searching
const armorTraits: ArmorTrait[] = [
  { id: 'grenade_capacity_2', name: 'Grenade Capacity', description: 'Increases grenade capacity by 2', value: 2, type: 'grenade_capacity' },
  { id: 'stim_capacity_2', name: 'Stim Capacity', description: 'Increases stim capacity by 2', value: 2, type: 'stim_capacity' },
  { id: 'ammo_capacity_50', name: 'Ammo Capacity', description: 'Increases ammo capacity by 50%', value: 50, type: 'ammo_capacity' },
  { id: 'armor_rating_50', name: 'Armor Rating', description: 'Increases armor rating by 50', value: 50, type: 'armor_rating' },
  { id: 'speed_10', name: 'Speed Boost', description: 'Increases movement speed by 10%', value: 10, type: 'speed' },
  { id: 'stamina_20', name: 'Stamina Boost', description: 'Increases stamina regeneration by 20%', value: 20, type: 'stamina' },
  { id: 'fire_resistance_25', name: 'Fire Resistance', description: 'Reduces fire damage by 25%', value: 25, type: 'resistance' },
];

// Mock weapon traits
const weaponTraits: WeaponTrait[] = [
  { id: 'heavy_penetration', name: 'Heavy Armor Penetration', description: 'Can penetrate heavy armor', type: 'penetration' },
  { id: 'medium_penetration', name: 'Medium Armor Penetration', description: 'Can penetrate medium armor', type: 'penetration' },
  { id: 'explosive_damage', name: 'Explosive Damage', description: 'Deals explosive damage', type: 'damage' },
  { id: 'fire_damage', name: 'Fire Damage', description: 'Deals fire damage', type: 'damage' },
  { id: 'high_fire_rate', name: 'High Fire Rate', description: 'Fires at a high rate', type: 'fire_rate' },
  { id: 'high_accuracy', name: 'High Accuracy', description: 'Very accurate weapon', type: 'accuracy' },
];

// Mock warbonds
const warbonds: Warbond[] = [
  {
    id: 'helldivers_mobilize',
    name: 'Helldivers Mobilize',
    description: 'Basic equipment for new recruits',
    totalMedals: 1000,
    unlocked: true,
    pages: [
      {
        pageNumber: 1,
        name: 'Basic Equipment',
        requiredMedals: 0,
        items: [] // Will be populated with items
      }
    ]
  },
  {
    id: 'steeled_veterans',
    name: 'Steeled Veterans',
    description: 'Advanced equipment for experienced soldiers',
    totalMedals: 2000,
    unlocked: true,
    pages: [
      {
        pageNumber: 1,
        name: 'Veteran Gear',
        requiredMedals: 1000,
        items: []
      }
    ]
  }
];

// Mock major order
export const getMajorOrder = async (): Promise<MajorOrder> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: 'major_order_1',
    title: 'Liberate Veld',
    description: 'The Automatons have fortified their position on Veld. We must break through their defenses and liberate the planet.',
    briefing: 'Intelligence reports indicate heavy Automaton presence on Veld. Our forces need to establish a beachhead and push inland to secure key objectives. The enemy has deployed advanced defensive systems, so expect heavy resistance.',
    progress: 67,
    maxProgress: 1000000,
    reward: {
      type: 'medals',
      amount: 50
    },
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    planet: {
      id: 'veld',
      name: 'Veld'
    }
  };
};

// Mock war efforts data
export const getWarEfforts = async (): Promise<WarEffort[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [
    {
      id: 'effort_1',
      planet: {
        id: 'veld',
        name: 'Veld',
        biome: 'Desert',
        hazardLevel: 7
      },
      helldiverCount: 15420,
      progress: 67,
      maxProgress: 1000000,
      status: 'active',
      objectives: [
        {
          id: 'obj_1',
          title: 'Establish Beachhead',
          description: 'Secure landing zones on the planet surface',
          progress: 85,
          maxProgress: 100,
          type: 'liberate'
        },
        {
          id: 'obj_2',
          title: 'Destroy Command Center',
          description: 'Eliminate the Automaton command structure',
          progress: 45,
          maxProgress: 100,
          type: 'attack'
        }
      ]
    },
    {
      id: 'effort_2',
      planet: {
        id: 'crimson_shore',
        name: 'Crimson Shore',
        biome: 'Volcanic',
        hazardLevel: 9
      },
      helldiverCount: 12850,
      progress: 23,
      maxProgress: 1000000,
      status: 'active',
      objectives: [
        {
          id: 'obj_3',
          title: 'Defend Research Station',
          description: 'Protect the scientific outpost from Terminid attacks',
          progress: 60,
          maxProgress: 100,
          type: 'defend'
        }
      ]
    },
    {
      id: 'effort_3',
      planet: {
        id: 'ice_peak',
        name: 'Ice Peak',
        biome: 'Arctic',
        hazardLevel: 5
      },
      helldiverCount: 8750,
      progress: 91,
      maxProgress: 1000000,
      status: 'active',
      objectives: [
        {
          id: 'obj_4',
          title: 'Clear Terminid Nests',
          description: 'Eliminate all Terminid breeding grounds',
          progress: 95,
          maxProgress: 100,
          type: 'liberate'
        }
      ]
    },
    {
      id: 'effort_4',
      planet: {
        id: 'jungle_world',
        name: 'Jungle World',
        biome: 'Tropical',
        hazardLevel: 6
      },
      helldiverCount: 6200,
      progress: 12,
      maxProgress: 1000000,
      status: 'active',
      objectives: [
        {
          id: 'obj_5',
          title: 'Secure Resource Deposits',
          description: 'Capture and hold key mining facilities',
          progress: 30,
          maxProgress: 100,
          type: 'liberate'
        }
      ]
    }
  ];
};

// Mock armor data
export const getArmor = async (): Promise<Armor[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return [
    {
      id: 'armor_1',
      name: 'Light Armor',
      description: 'Basic light armor for mobility',
      type: 'armor',
      armorType: 'light',
      armorRating: 25,
      speedModifier: 10,
      staminaRegenModifier: 5,
      traits: [armorTraits[0], armorTraits[4]], // grenade capacity + speed
      resistances: {
        fire: 0,
        explosion: 0,
        acid: 0
      },
      warbondId: 'helldivers_mobilize',
      warbondPage: 1,
      cost: { medals: 50 },
      unlocked: true
    },
    {
      id: 'armor_2',
      name: 'Heavy Assault Armor',
      description: 'Heavy armor with enhanced protection',
      type: 'armor',
      armorType: 'heavy',
      armorRating: 75,
      speedModifier: -20,
      staminaRegenModifier: -10,
      traits: [armorTraits[3], armorTraits[6]], // armor rating + fire resistance
      resistances: {
        fire: 25,
        explosion: 15,
        acid: 0
      },
      warbondId: 'steeled_veterans',
      warbondPage: 1,
      cost: { medals: 150 },
      unlocked: false
    }
  ];
};

// Mock weapons data
export const getWeapons = async (): Promise<Weapon[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return [
    {
      id: 'weapon_1',
      name: 'AR-23 Liberator',
      description: 'Standard assault rifle for all situations',
      type: 'weapon',
      weaponType: 'primary',
      damage: 45,
      damageType: 'kinetic',
      armorPenetration: 'light',
      fireRate: 600,
      magazineSize: 30,
      totalAmmo: 300,
      reloadTime: 2.5,
      range: 200,
      accuracy: 75,
      recoil: 30,
      traits: [weaponTraits[1]], // medium penetration
      warbondId: 'helldivers_mobilize',
      warbondPage: 1,
      cost: { medals: 25 },
      unlocked: true
    },
    {
      id: 'weapon_2',
      name: 'SG-8 Punisher',
      description: 'Heavy shotgun with devastating close-range damage',
      type: 'weapon',
      weaponType: 'primary',
      damage: 120,
      damageType: 'kinetic',
      armorPenetration: 'heavy',
      fireRate: 60,
      magazineSize: 8,
      totalAmmo: 80,
      reloadTime: 3.0,
      range: 50,
      accuracy: 40,
      recoil: 80,
      traits: [weaponTraits[0]], // heavy penetration
      warbondId: 'steeled_veterans',
      warbondPage: 1,
      cost: { medals: 100 },
      unlocked: false
    }
  ];
};

// Mock strategems data
export const getStrategems = async (): Promise<Strategem[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return [
    {
      id: 'strategem_1',
      name: 'Orbital Precision Strike',
      description: 'Calls in a precision orbital strike',
      type: 'strategem',
      strategemType: 'offensive',
      cooldown: 30,
      uses: 2,
      callTime: 2,
      effects: [
        {
          id: 'effect_1',
          name: 'Explosive Damage',
          description: 'Deals massive explosive damage in a small area',
          duration: 0,
          range: 10
        }
      ],
      warbondId: 'helldivers_mobilize',
      warbondPage: 1,
      cost: { medals: 75 },
      unlocked: true
    }
  ];
};

// Mock boosters data
export const getBoosters = async (): Promise<Booster[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return [
    {
      id: 'booster_1',
      name: 'Stamina Enhancement',
      description: 'Increases stamina regeneration for the entire mission',
      type: 'booster',
      effect: 'Enhanced stamina regeneration',
      duration: 0, // Entire mission
      stackable: false,
      effects: [
        {
          id: 'boost_1',
          name: 'Stamina Regen',
          description: 'Increases stamina regeneration by 25%',
          value: 25,
          type: 'stamina'
        }
      ],
      warbondId: 'helldivers_mobilize',
      warbondPage: 1,
      cost: { medals: 50 },
      unlocked: true
    }
  ];
};

// Mock warbonds data
export const getWarbonds = async (): Promise<Warbond[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return warbonds;
};

// Search functions
export const searchArmor = async (filters: any): Promise<Armor[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const armor = await getArmor();
  
  // Simple filtering logic (in a real app, this would be more sophisticated)
  return armor.filter(item => {
    if (filters.searchTerm && !item.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false;
    }
    if (filters.armorType && item.armorType !== filters.armorType) {
      return false;
    }
    if (filters.unlocked !== undefined && item.unlocked !== filters.unlocked) {
      return false;
    }
    return true;
  });
};

export const searchWeapons = async (filters: any): Promise<Weapon[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const weapons = await getWeapons();
  
  return weapons.filter(item => {
    if (filters.searchTerm && !item.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false;
    }
    if (filters.weaponType && item.weaponType !== filters.weaponType) {
      return false;
    }
    if (filters.damageType && !filters.damageType.includes(item.damageType)) {
      return false;
    }
    if (filters.armorPenetration && !filters.armorPenetration.includes(item.armorPenetration)) {
      return false;
    }
    if (filters.unlocked !== undefined && item.unlocked !== filters.unlocked) {
      return false;
    }
    return true;
  });
};

// Get item by ID
export const getItemById = async (itemId: string): Promise<any> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const [armor, weapons, strategems, boosters] = await Promise.all([
    getArmor(),
    getWeapons(),
    getStrategems(),
    getBoosters()
  ]);
  
  const allItems = [...armor, ...weapons, ...strategems, ...boosters];
  return allItems.find(item => item.id === itemId) || null;
};

// Get warbond by ID
export const getWarbondById = async (warbondId: string): Promise<Warbond | null> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const warbonds = await getWarbonds();
  return warbonds.find(warbond => warbond.id === warbondId) || null;
};
