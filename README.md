# UniRide - Campus Carpooling Platform

A modern, full-featured web application built with Next.js 16 and React 19 that connects UAE university students for safe, affordable carpooling across emirates.

## 🚀 Overview

UniRide is a comprehensive student-focused carpooling platform that allows verified university students to share rides, split costs, and travel safely across the UAE. The application features advanced authentication, wallet management, comprehensive user profiles, Google Maps integration, and a complete set of modern web features.

## 🛠️ Technology Stack

- **Framework**: Next.js 16.0.0 with App Router & Turbopack
- **Language**: TypeScript with strict type checking
- **React**: React 19.2.0
- **Styling**: Tailwind CSS with custom color palette (Primary Dark, Secondary Gray, Accent Red)
- **State Management**: React Context API for authentication and app state
- **Icons**: Lucide React with optimized imports
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives with custom styling
- **Maps**: Google Maps JavaScript API with Places, Directions, and Autocomplete
- **Performance**: Web Vitals monitoring, caching strategies, and optimization
- **Accessibility**: Full ARIA support, keyboard navigation, and WCAG compliance

## 🔐 Authentication System

The application uses a robust protected route system with comprehensive authentication features:

### Features:
- **SSR-Safe Authentication**: Client-side hydration protection prevents hydration mismatches
- **Persistent Sessions**: User authentication state persists across browser sessions
- **Protected Routes**: Automatic redirect to login for unauthorized access attempts
- **Real-time Auth State**: Dynamic UI updates based on authentication status
- **Error Handling**: Comprehensive error handling for authentication failures

### Test Accounts Available:
- **Email**: `test@uaeu.ac.ae` | **Password**: `test123`
- **Email**: `demo@aus.edu` | **Password**: `demo456`
- **Email**: `admin@zu.ac.ae` | **Password**: `admin789`

### Authentication Flow:
1. **Login Form**: Enhanced with real-time validation, error display, and loading states
2. **Signup Form**: University email validation, password strength indicators, and comprehensive field validation
3. **Auto-redirect**: Authenticated users automatically redirected to dashboard from login/signup pages
4. **Logout**: Secure logout with state cleanup and redirect to home page

## 📱 Website Flow & Navigation

### 🏠 **Public Pages (Unauthenticated Users)**

#### 1. Home Page (`/`)
**Features:**
- **Complete Landing Page** with modern hero section, scroll animations, and comprehensive content
- **Hero Section**: UniRide branding, tagline, and call-to-action buttons
- **How It Works**: 3-step process explanation with icons and animations
- **Why Choose UniRide**: 4 benefit cards with hover effects and scroll reveal
- **Statistics Section**: Live metrics with animated counters (500+ students, 1000+ rides, etc.)
- **Trust & Safety**: University verification and safety features showcase
- **Final CTA**: Comprehensive call-to-action with gradient background
- **Footer**: Multi-column layout with links and social media
- **Smart Authentication**: Auto-redirects authenticated users to dashboard

#### 2. Login Page (`/login`)
**Features:**
- **Enhanced Form**: Real-time validation, error handling, and loading states
- **Dual Input Support**: Email or University ID login options
- **Visual Feedback**: Success/error states with toast notifications
- **Auto-redirect**: Authenticated users automatically go to dashboard
- **Responsive Design**: Mobile-optimized layout with proper accessibility

#### 3. Signup Page (`/signup`)
**Features:**
- **Comprehensive Registration**: Complete form with university email validation
- **University Support**: UAEU, AUS, UOS, ZU, AUD, HCT integration
- **Password Strength**: Real-time password strength indicators
- **Form Validation**: Client-side and server-side validation with helpful error messages
- **Auto-redirect**: Successful signup leads to dashboard

#### 4. Dashboard (`/dashboard`) - **NEW**
**Features:**
- **Welcome Header**: Personalized greeting with current date and quick stats
- **Action Cards**: Large navigation cards for Find Ride, Post Ride, Wallet, Profile
- **Recent Activity**: Split view showing upcoming rides and recent transactions
- **Empty States**: Helpful guidance when no data is available
- **Hover Effects**: Smooth animations and micro-interactions

### 🔒 **Protected Pages (Authenticated Users Only)**

#### 5. Find Ride Page (`/find-ride`)
**Features:**
- Advanced ride filtering system:
  - Destination search
  - Date selection
  - Gender preference filtering
  - University filtering
- Ride cards showing:
  - Route details (start → destination)
  - Date and time
  - Cost per person
  - Available seats
  - Driver information with ratings
  - Gender preferences (if any)
- "Request Ride" buttons leading to pickup confirmation

#### 6. Post Ride Page (`/post-ride`)
**Features:**
- Complete ride posting form with enhanced validation
- Location input with autocomplete and geocoding
- Date and time selection with calendar integration
- Seat availability setting and cost calculation
- Gender preference options and route planning tools
- Form validation with real-time feedback

#### 7. Wallet Page (`/wallet`)
**Features:**
- **Enhanced UI**: Current balance display with animated counters
- **Transaction Management**: Add funds, withdraw funds, comprehensive history
- **Real-time Updates**: Live balance updates and transaction tracking
- **Monthly Analytics**: Earnings, spending patterns, and transaction statistics
- **Empty States**: Helpful guidance for new users

#### 8. Profile Page (`/profile`)
**Features:**
- **Dynamic Profile Header**: Name, university, email, phone with user data integration
- **Rating System**: User rating display and total trips counter
- **Trip History**: Comprehensive ride history with filtering
- **Reviews Section**: User reviews and rating breakdown
- **Profile Management**: Edit profile functionality with form validation

#### 9. Pickup Confirmation Page (`/pickup-confirmation`)
**Features:**
- **Ride Summary**: Detailed ride information and booking confirmation
- **Time Management**: Time slot selection and scheduling
- **Vehicle Verification**: Car number and driver verification system
- **Payment Integration**: Wallet integration for seamless payments
- **Final Confirmation**: Complete booking flow with confirmation steps

#### 10. Contact Page (`/contact`) - **NEW**
**Features:**
- **Contact Form**: Complete contact form with validation and success states
- **Contact Information**: Email, phone, and hours display cards
- **FAQ Section**: Common questions with accordion-style display
- **Multiple Layout**: Clean, professional contact page layout

#### 11. About Page (`/about`) - **NEW**
**Features:**
- **Company Story**: UniRide's mission and vision
- **Values Section**: Core company values with icons and descriptions
- **Statistics**: Platform metrics and success stories
- **Team Information**: Company information and contact details

#### 12. FAQ Page (`/faq`) - **NEW**
**Features:**
- **Comprehensive FAQ**: Organized by categories (Getting Started, Safety, Rides, Payments, Account)
- **Search Functionality**: Filter questions by keyword
- **Accordion UI**: Clean, expandable question/answer format
- **Quick Navigation**: Easy access to relevant information

#### 13. Legal Pages - **NEW**
- **Terms of Service** (`/terms`): Complete terms and conditions
- **Privacy Policy** (`/privacy`): Data handling and privacy information

## 🧭 Navigation System

### **Enhanced Header System**
**Smart Authentication-Based Navigation:**

**For Unauthenticated Users:**
- **Logo**: Links to home page
- **Navigation**: Home, Contact Us links
- **Actions**: Login and Sign Up buttons (animated on scroll)

**For Authenticated Users:**
- **Logo**: Links to dashboard
- **Navigation**: Dashboard, Find Ride, Post Ride, Wallet, Profile links
- **Action**: Logout button with confirmation

**Header Features:**
- **Sticky Behavior**: Transparent at top, backdrop blur when scrolled
- **Scroll Animations**: Login/Signup buttons slide in from left on scroll
- **Responsive Design**: Mobile-optimized with proper touch targets
- **Accessibility**: Full keyboard navigation and ARIA support

### **Mobile Navigation (Bottom Bar)**
**Updated for Dashboard Access:**
- 🏠 Dashboard (for authenticated users)
- 🔍 Find Ride, ➕ Post Ride, 💰 Wallet, 👤 Profile
- 🚪 Logout functionality

## 🔄 User Flow Examples

### **New User Journey:**
1. **Landing** → Complete landing page with hero, features, and trust indicators
2. **Registration** → Comprehensive signup form with university verification
3. **Authentication** → Automatic redirect to dashboard
4. **Dashboard** → Welcome overview with quick access to all features
5. **Exploration** → Find rides, post rides, manage wallet and profile

### **Returning User Journey:**
1. **Landing** → Smart redirect to dashboard if already authenticated
2. **Authentication** → Quick login with enhanced error handling
3. **Dashboard** → Centralized access to all platform features
4. **Navigation** → Seamless movement between all sections with protected routes

## 🎨 UI/UX Features

### **Enhanced Design System:**
- **Custom Color Palette**: Primary Dark (#171717), Secondary Gray (#444444), Accent Red (#DA0037), Light Background (#EDEDED)
- **Modern Interface**: Clean, professional design with gradient accents and smooth animations
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Component Library**: Comprehensive shadcn/ui integration with custom variants
- **Active Navigation**: Visual indication of current page in header and mobile menu
- **Animations**: Smooth scroll reveals, hover effects, and micro-interactions
- **Loading States**: Comprehensive loading indicators and map loading spinners
- **Error Handling**: Global error boundaries, map error states, and form validation feedback
- **Accessibility**: WCAG 2.1 AA compliance with keyboard navigation and screen reader support

### **Advanced User Experience:**
- **Authentication**: SSR-safe auth with persistent sessions and auto-redirects
- **Protected Routes**: Seamless route protection with loading states
- **Smart Navigation**: Context-aware navigation based on authentication status
- **Form Validation**: Real-time validation with helpful error messages and success states
- **Toast Notifications**: Comprehensive feedback system for user actions
- **Scroll Animations**: Intersection Observer-based scroll reveals and stagger effects
- **Performance**: Optimized loading with caching strategies and Web Vitals monitoring

## 🗂️ Project Structure

```
app/                          # Next.js 16 App Router
├── page.tsx                  # Home/Landing page
├── layout.tsx                # Root layout with providers
├── error.tsx                 # Global error boundary
├── globals.css               # Global styles
├── dashboard/                # Dashboard
├── login/                    # Authentication
├── signup/
├── find-ride/               # Find rides with map integration
├── post-ride/               # Post rides with route selection
├── wallet/                  # Wallet & transactions
├── profile/                 # User profile
├── contact/                 # Contact page
├── about/                   # About page
├── faq/                     # FAQ page
├── terms/                   # Terms of service
├── privacy/                 # Privacy policy
└── pickup-confirmation/     # Booking confirmation

components/
├── auth/                    # Authentication forms
├── find-ride/              # Ride browsing & filtering
├── post-ride/              # Ride creation
├── profile/                # Profile management
├── wallet/                 # Wallet components
├── pickup/                 # Booking components
├── maps/                   # Google Maps components
│   ├── ride-list-map.tsx   # Map showing multiple rides
│   ├── single-ride-map.tsx # Individual ride route
│   ├── route-selection-map.tsx # Route selection
│   └── location-search-input.tsx # Location autocomplete
├── ui/                     # Reusable component library
├── header.tsx              # Smart navigation header
├── navigation.tsx          # Mobile navigation
├── footer.tsx             # Footer
└── logo.tsx               # Logo component

lib/
├── auth-context.tsx        # Authentication state
├── form-validation.ts      # Form validation
├── cache.ts                # Caching strategies
├── data-fetching.ts        # Data fetching
├── mock-data.ts            # Mock data for development
├── mock-rides.ts           # Mock ride data
├── google-maps-config.ts   # Google Maps setup
└── utils.ts                # Utility functions

hooks/                       # Custom React hooks
public/                      # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Google Maps API key (optional for maps features)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Open http://localhost:3000
   - Use test credentials to explore features
   - Navigate through different sections

### Build for production
```bash
npm run build
npm start
```

## 🔧 Comprehensive Feature Set

### 🏗️ **Core Application Features**
- ✅ **Complete Authentication System**: Login/signup with SSR-safe context, protected routes, and persistent sessions
- ✅ **Dashboard Interface**: Centralized user hub with welcome header, action cards, and recent activity
- ✅ **Ride Management**: Advanced find/post ride system with Google Maps integration, filtering, validation, and confirmation flow
- ✅ **Google Maps Integration**: Interactive maps with route visualization, autocomplete, and live directions
- ✅ **Wallet System**: Complete payment management with balance tracking, transactions, and analytics
- ✅ **User Profiles**: Dynamic profile management with ratings system and trip history

### 🎨 **Enhanced UI/UX**
- ✅ **Modern Landing Page**: Complete marketing website with hero, features, statistics, and trust indicators
- ✅ **Responsive Design**: Mobile-first approach with optimized breakpoints and touch-friendly interfaces
- ✅ **Color Palette**: Custom design system with Primary Dark, Secondary Gray, and Accent Red colors
- ✅ **Advanced Animations**: Scroll reveals, hover effects, stagger animations, and micro-interactions
- ✅ **Loading States**: Comprehensive loading indicators, map loading spinners, and progress feedback
- ✅ **Error Handling**: Global error boundaries, map error states, and comprehensive form validation
- ✅ **Active Navigation**: Visual indication of current page in navigation

### 🚀 **Performance & Accessibility**
- ✅ **Next.js 16 Performance**: Turbopack for faster builds, optimized code splitting, and efficient rendering
- ✅ **React 19 Features**: Latest React features with improved performance and developer experience
- ✅ **Multi-layer Caching**: Application-level caching, browser caching, and stale-while-revalidate strategies
- ✅ **Accessibility Compliance**: WCAG 2.1 AA compliance with keyboard navigation, ARIA labels, and screen reader support
- ✅ **SEO Optimization**: Complete meta tags, Open Graph, Twitter Cards, and structured data

### 🛡️ **Security & Quality**
- ✅ **Form Validation**: Real-time client-side validation with comprehensive error handling and success states
- ✅ **Input Security**: Password strength indicators, email validation, and XSS protection
- ✅ **Error Boundaries**: Global error handling with user-friendly error pages and recovery options
- ✅ **Google Maps Error Handling**: Graceful error states for maps API failures with helpful messages

## 🚀 Performance Optimization

### **Next.js 16 & React 19 Features**
- **Turbopack**: Faster build times and hot module replacement
- **React 19**: Latest React features with improved performance
- **Code Splitting**: Automatic route-based code splitting
- **Tree Shaking**: Unused code elimination
- **Image Optimization**: Next.js Image component with lazy loading
- **Dynamic Imports**: Lazy loading for Google Maps components

### **Google Maps Optimization**
- **Lazy Loading**: Maps load only when needed (Map View)
- **Marker Clustering**: Efficient rendering for multiple rides
- **Caching**: Route and location data caching
- **Loading States**: Visual feedback during map initialization
- **Error Handling**: Graceful degradation when Maps API unavailable

### **Caching Strategies**
- **Static Assets**: Long-term caching for images, fonts, and CSS
- **API Responses**: Stale-while-revalidate caching for dynamic content
- **Browser Caching**: Efficient caching strategies for better performance

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run ship` - Commit all changes with a generic message and push to main

## 🗺️ Google Maps Integration

UniRide uses Google Maps JavaScript API for:
- **Location Autocomplete**: Search and select pickup/drop-off locations
- **Route Visualization**: Visual route display with Directions API
- **Interactive Maps**: Multiple maps for different features:
  - **Ride List Map**: Shows all available rides with numbered markers
  - **Single Ride Map**: Shows route for individual ride
  - **Route Selection Map**: Allows users to select and adjust routes when posting rides

### Setup
1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Directions API
3. Add your API key to `.env.local`:
   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
   ```

---

## 🎯 **Ready for Production**

UniRide is a fully-featured, production-ready carpooling platform with enterprise-level code quality and modern web development best practices.

**UniRide** - Connecting students for smarter, cheaper, and safer travel across the UAE! 🚗💨

*Built with Next.js 16, React 19, TypeScript, Tailwind CSS, and Google Maps API.*

## 📦 Recent Updates

- Wallet
  - Automatic balance refresh after successful payments (no page reload).
  - Enabled Withdraw flow: instant balance deduction, transaction added, success toast.
  - Credit Card flow: validation (card, expiry MM/YY, CVV), masks, success state.
  - New user empty state shows 0 values and subtle guidance.
- Post Ride
  - Driver contact auto-fetched from profile and displayed in Driver Information.
  - Location labels changed to Start/End; validation updated; Google Maps flow maintained.
  - Time selection replaced with clean Time Slot dropdown (e.g., 1:00-2:00, 2:00-3:00 ...).
  - Car details improved: seats up to 7, required Car Number Plate.
  - Removed Price per Seat field (to be auto-calculated later).

