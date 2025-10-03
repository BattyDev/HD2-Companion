# Helldivers 2 Tool

A mobile-friendly web application built with TypeScript and React for exploring all available equipment and tracking the galactic war effort in Helldivers 2.

## 🎯 Overview

This application allows players to explore all possible items in Helldivers 2, even those they haven't unlocked yet. The in-game menu only shows items you've earned, but this tool provides complete visibility into all available equipment, weapons, armor, strategems, and boosters.

## ✨ Features

### 🏠 Home Page
- **Major Order Display**: Shows the current primary objective with progress tracking
- **War Statistics**: Total helldivers, active campaigns, and most active planets
- **Top Planets**: List of planets ordered by helldiver count
- **Quick Navigation**: Easy access to all equipment categories

### 🌍 War Efforts Page
- **Planet Campaigns**: All active war efforts across different planets
- **Sorting Options**: Sort by helldiver count, progress, or hazard level
- **Detailed Objectives**: Individual mission objectives with progress tracking
- **Real-time Stats**: Live data on campaign progress and player counts

### 🛡️ Armor Database
- **Trait-based Search**: Find armor by specific traits like "Gives +2 grenade capacity"
- **Advanced Filtering**: Filter by armor type, traits, armor rating, and availability
- **Detailed Stats**: Speed modifiers, stamina regeneration, resistances
- **Trait System**: Comprehensive trait descriptions and values

### ⚔️ Weapons Database
- **Damage Type Search**: Find weapons by damage type (kinetic, explosive, fire, etc.)
- **Armor Penetration**: Filter by penetration levels (light, medium, heavy)
- **Weapon Stats**: Fire rate, accuracy, range, reload time, and more
- **Trait Information**: Special weapon characteristics and abilities

### ⚡ Strategems Database
- **Type-based Filtering**: Offensive, defensive, support, and utility strategems
- **Effect Details**: Comprehensive effect descriptions with duration and range
- **Cooldown Information**: Call time, cooldown, and usage limits
- **Strategic Planning**: Plan your loadout with detailed strategem information

### 🔋 Boosters Database
- **Mission Enhancements**: Find boosters for specific mission types
- **Effect Tracking**: Detailed booster effects and values
- **Stackability**: Information on which boosters can be combined
- **Duration Tracking**: Mission-long or time-limited effects

### 📖 Warbonds System
- **Progression Tracking**: View all available warbonds and their requirements
- **Item Organization**: See which items belong to which warbond
- **Cost Analysis**: Medal requirements for each warbond and page
- **Unlock Status**: Track your progression through each warbond

### 🔍 Advanced Search & Filtering
- **Multi-criteria Search**: Combine multiple filters for precise results
- **Real-time Filtering**: Instant results as you type or adjust filters
- **Save Search States**: Maintain filter preferences across sessions
- **Mobile-optimized**: Touch-friendly interface for mobile devices

## 🏗️ Technical Architecture

### Frontend Stack
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Full type safety and enhanced developer experience
- **React Router**: Client-side routing for single-page application
- **Vite**: Fast build tool and development server
- **CSS3**: Custom CSS with mobile-first responsive design

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Navigation.tsx   # Bottom navigation component
│   └── Navigation.css   # Navigation styles
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page with major order
│   ├── WarEffortsPage.tsx # War efforts and planet tracking
│   ├── ArmorPage.tsx   # Armor search and filtering
│   ├── WeaponsPage.tsx # Weapons search and filtering
│   ├── StrategemsPage.tsx # Strategems database
│   ├── BoostersPage.tsx # Boosters database
│   ├── WarbondsPage.tsx # Warbonds progression
│   └── ItemDetailPage.tsx # Individual item details
├── services/           # Data services
│   └── mockDataService.ts # Mock data for development
├── types/              # TypeScript type definitions
│   └── index.ts        # All data type interfaces
├── App.tsx             # Main application component
├── App.css             # Global application styles
├── main.tsx            # Application entry point
└── index.css           # Base styles and resets
```

### Data Types
The application uses comprehensive TypeScript interfaces for all game data:

- **MajorOrder**: Current primary objectives
- **WarEffort**: Individual planet campaigns
- **Armor**: Armor pieces with traits and resistances
- **Weapon**: Weapons with damage types and stats
- **Strategem**: Support and offensive abilities
- **Booster**: Mission enhancement items
- **Warbond**: Progression system pages
- **Search Filters**: Advanced filtering interfaces

### Mobile-First Design
- **Responsive Grid**: Adapts from 1 column on mobile to 4+ on desktop
- **Touch-friendly**: Large touch targets and intuitive gestures
- **Bottom Navigation**: Mobile-optimized navigation pattern
- **Hamburger Menu**: Additional navigation items on mobile
- **Progressive Enhancement**: Works on all screen sizes

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/helldivers-2-tool.git
cd helldivers-2-tool
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Building for Production
```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- **TypeScript**: Strict mode enabled for type safety
- **ESLint**: Configured for React and TypeScript best practices
- **Prettier**: Code formatting (recommended)
- **Comments**: Extensive comments for learning purposes

### Adding New Features
1. **Data Types**: Add new interfaces in `src/types/index.ts`
2. **Components**: Create reusable components in `src/components/`
3. **Pages**: Add new pages in `src/pages/`
4. **Services**: Extend data services in `src/services/`
5. **Styling**: Follow mobile-first CSS patterns

## 📱 Mobile Optimization

### Design Principles
- **Mobile-First**: Designed for mobile devices first, then enhanced for desktop
- **Touch-Friendly**: Large touch targets (minimum 44px)
- **Thumb Navigation**: Bottom navigation for easy thumb access
- **Readable Text**: Appropriate font sizes for mobile screens
- **Fast Loading**: Optimized images and minimal JavaScript

### Responsive Breakpoints
- **Mobile**: < 640px (1 column layouts)
- **Tablet**: 640px - 1024px (2-3 column layouts)
- **Desktop**: > 1024px (3-4+ column layouts)

### Performance Optimizations
- **Code Splitting**: Lazy loading of page components
- **Image Optimization**: Responsive images and lazy loading
- **Bundle Size**: Minimal dependencies and tree shaking
- **Caching**: Service worker for offline functionality (future enhancement)

## 🔮 Future Enhancements

### Planned Features
- **Real API Integration**: Replace mock data with actual Helldivers 2 API
- **User Accounts**: Save favorite items and custom loadouts
- **Loadout Builder**: Create and share custom equipment combinations
- **Damage Calculator**: Calculate effective damage against different enemy types
- **Progression Tracker**: Track your personal progression through warbonds
- **Offline Support**: Service worker for offline functionality
- **Dark/Light Themes**: Multiple theme options
- **Accessibility**: Enhanced screen reader support and keyboard navigation

### API Integration
The current implementation uses mock data. To integrate with the real Helldivers 2 community API:

1. Replace `mockDataService.ts` with actual API calls
2. Add error handling for network requests
3. Implement caching for better performance
4. Add loading states and error boundaries

## 🤝 Contributing

### How to Contribute
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and patterns
- Add TypeScript types for all new data structures
- Include comprehensive comments for learning purposes
- Test on multiple screen sizes
- Ensure mobile-first responsive design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### Credits
- **Helldivers 2**: Game by Arrowhead Game Studios
- **Community API**: Data provided by the Helldivers 2 community
- **Icons**: Lucide React icon library
- **Fonts**: System fonts for optimal performance

### Inspiration
This tool was created to help the Helldivers 2 community explore all available equipment and make informed decisions about their loadouts. The in-game interface only shows unlocked items, making it difficult to plan progression or discover new equipment combinations.

### Special Thanks
- The Helldivers 2 community for their dedication and data sharing
- Arrowhead Game Studios for creating an amazing game
- Open source contributors who make tools like this possible

## 📞 Support

If you encounter any issues or have suggestions for improvements:

1. **GitHub Issues**: Create an issue on the repository
2. **Discussions**: Use GitHub Discussions for questions and ideas
3. **Pull Requests**: Submit improvements and bug fixes

## 🔗 Links

- **Repository**: [GitHub Repository](https://github.com/yourusername/helldivers-2-tool)
- **Live Demo**: [Live Application](https://yourusername.github.io/helldivers-2-tool)
- **Helldivers 2**: [Official Game Website](https://www.helldivers2.com)
- **Community**: [Helldivers 2 Discord](https://discord.gg/helldivers2)

---

**Note**: This is a fan-made tool and is not officially affiliated with Arrowhead Game Studios or Sony Interactive Entertainment. All game data and assets belong to their respective owners.
