# EduMaterials - Educational Resources E-commerce

## Overview

EduMaterials is a React-based e-commerce platform specializing in Cambridge and Edexcel educational resources including question papers and mark schemes. The application provides a streamlined interface for browsing, filtering, and purchasing academic materials organized by examination board, level (A Level, O Level, IGCSE), and subject.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: React Router DOM for client-side navigation with dedicated routes for products, checkout, and success pages
- **Styling**: Tailwind CSS with custom design system implementing educational brand colors and components
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible interface elements
- **State Management**: React Context API for cart functionality, enabling persistent shopping cart across the application

### Component Structure
- **Layout Components**: Header with cart indicator and navigation
- **Product Components**: SyllabusButton for category navigation, ProductGallery for visual previews, SubjectFilter for content filtering
- **Shopping Features**: Cart context managing items, checkout flow, and success confirmation
- **Utility Components**: Comprehensive UI component library including buttons, forms, dialogs, and feedback elements

### Data Management
- **Mock Data Structure**: Subjects containing papers with metadata (year ranges, prices, components)
- **Product Organization**: Hierarchical structure by board → level → type → subject → individual papers
- **Cart Logic**: Items identified by unique IDs with duplicate prevention and total calculations

### Styling System
- **Design Tokens**: Educational theme with primary blue (#3b82f6) and secondary purple (#8b5cf6) color schemes
- **Typography**: Space Grotesk for headings and Inter for body text
- **Responsive Design**: Mobile-first approach with container-based layouts
- **Component Variants**: Consistent styling patterns for buttons, cards, and interactive elements

### Development Tools
- **Build System**: Vite for fast development and optimized production builds
- **Code Quality**: ESLint with TypeScript support, configured for React best practices
- **Development Experience**: Hot reload, component tagging for development mode

## External Dependencies

### UI and Styling
- **@radix-ui/react-***: Complete suite of accessible, unstyled UI primitives for dialogs, dropdowns, forms, and navigation
- **tailwindcss**: Utility-first CSS framework with custom configuration for educational design system
- **class-variance-authority**: Type-safe component variant management
- **lucide-react**: Modern icon library for consistent visual elements

### State and Data Management
- **@tanstack/react-query**: Server state management and caching (prepared for future API integration)
- **react-hook-form** with **@hookform/resolvers**: Form handling with validation support
- **date-fns**: Date manipulation utilities for educational material organization

### Enhanced UX Components
- **cmdk**: Command palette functionality for improved navigation
- **embla-carousel-react**: Touch-friendly carousel for product galleries
- **react-day-picker**: Date picker component for filtering by publication dates
- **next-themes**: Theme management system supporting light/dark modes
- **sonner**: Toast notification system for user feedback

### Development and Build
- **vite**: Modern build tool with React SWC plugin for fast compilation
- **typescript**: Static type checking for improved code reliability
- **eslint**: Code linting with React-specific rules and TypeScript integration
- **lovable-tagger**: Development-mode component tagging for enhanced debugging