# Poolara — Campus Ridesharing for Students

A vibrant, playful, and secure web app that helps students share rides, split costs, and build community. 

## 🚗 What is Poolara?
**Poolara** is a student-first ridesharing platform designed to make getting around campus easier, cheaper, and greener. Built with Next.js, React, and an energetic palette inspired by our logo (purple, magenta, coral, navy), Poolara delivers an ultra-modern, youthful experience for students everywhere. 

**Why Poolara?** Because campus journeys are better when shared with friends! Poolara lets you:
- **Share or find rides** for classes, events, or weekend trips
- **Split costs automatically** (no awkward math!)
- **Reduce your carbon footprint** (every shared ride counts)
- **Connect with classmates safely** (only .edu/university email join)

---

## 🌈 Brand & Design System
- **Logo-Inspired Colors:** Vibrant purple (#A259F7), magenta pink (#FF51AE), cheerful coral/peach (#FFC39E/#FF9076), deep navy background (#1F1632), classic white.
- **Typography:** Poppins — rounded, bold, and approachable. Large playful headings, easy-to-read body text, and energetic button/text styles throughout.
- **UX DNA:** Fluid gradients, circular community motifs, and generous spacing bring the Poolara brand to life.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **React:** 19
- **Styling:** Tailwind CSS (custom Poolara palette & typography), responsive mobile-first
- **State:** React Context API
- **Maps:** Google Maps JS API (directions, autocomplete)
- **Forms:** React Hook Form + Zod
- **UI Library:** Radix UI + custom playful components
- **Performance:** Caching, Web Vitals, optimized chunking
- **Accessibility:** WCAG AA, ARIA, keyboard-friendly, and color-contrast guaranteed

---

## 🚦 Quick Start

1. **Install:**
   ```bash
   npm install
   ```
2. **Google Maps Setup:**
   Put your API key in `.env.local`:
   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
   ```
   **Required Google Maps APIs:**
   - Maps JavaScript API
   - Places API (for location autocomplete)
   - Directions API (for route calculation)
   - Geocoding API (for address conversion)
3. **Run locally:**
   ```bash
   npm run dev
   ```
   Then visit [http://localhost:3000](http://localhost:3000)

---

## ✨ Recent Features & Improvements

### Post Ride Page Enhancements
- **Integrated Map Functionality:** Start and end location inputs automatically update the map
  - Map centers and zooms when start location is selected
  - Second marker appears when end location is added
  - Map automatically adjusts bounds to show both markers
  - Real-time route calculation with distance and duration
- **Automatic Price Calculation:** 
  - Price per seat calculated automatically based on:
    - Distance (km)
    - Duration (minutes)
    - Number of available seats
  - Updates instantly when route or seat count changes
  - Uses fare calculation logic from `lib/fare.ts`

### UI/UX Improvements
- **Enhanced Dialog Overlays:** All modals and dialogs now use opaque backgrounds (80% opacity) for better visibility and focus
  - Applied to: Add Funds, Withdraw Funds, Edit Profile, and all other dialogs

---

## 🎨 Product Features 

### Home & Onboarding
- Super-hero section: Big playful headline, gradient buttons, rolling counter for rides/CO₂
- 3-step process: Post/join, split the cost, arrive together
- Animated benefit cards — friendly, simple copy and iconography

### Authentication & Profiles
- **Secure sign up:** Only students (university email required)
- **Live feedback:** Password strength and validation
- **Complete profiles:** Ratings, trip history, reviews, and peer networking
- **Edit Profile:** Easy-to-use modal with opaque overlay for better focus

### Finding & Posting Rides
- **Filter by destination, campus, date**
- **Smart ride cards:** Actual route, cost, seats, driver info, and request button
- **Google Maps integration:** Autocomplete locations, interactive maps (list + single view)
- **Post a ride:** 
  - Interactive route selection with live map updates
  - Start and end location inputs with instant map centering and zoom
  - Real-time markers for both pickup and dropoff locations
  - Automatic route calculation with distance and duration
  - **Automatic price calculation** based on distance, duration, and number of seats
  - Map automatically adjusts to show both locations with proper bounds
  - Date picker, time slot selection, car details, and notes

### Payments & Wallet
- **Auto-split:** Costs calculated for groups (no manual math)
- **Add/Withdraw Funds:** User-friendly dialogs with opaque overlays
- **Fund wallet, track transactions**
- **Monthly insights:** Balance graphs & analytics

### Social & Community
- Real reviews, ratings, and vibrant testimonials
- Growing metrics banner and animated stats for trust

### Modern UI/UX
- **Theming:** Cohesive logo-driven colors in gradients, all sections/cards/buttons
- **Typography:** Poppins, bold sizing, accessible hierarchy
- **Responsive:** Looks great on both mobile and desktop
- **Fun micro-animations:** On scroll, button/interactions
- **Improved Dialog Overlays:** Opaque backgrounds (80% opacity) for better focus and readability in modals and dialogs

---

## 🗺️ Project Structure
```
app/           # Next.js App Router structure
components/    # All Poolara components and UI
hooks/         # Custom hooks
lib/           # App logic, helpers, maps, mocks
public/        # Static assets (logo, images, etc.)
tailwind.config.js  # Design tokens
app/globals.css     # Global styling, fonts
```

---

## 📝 License & Community
- Powered by Next.js, React, Tailwind CSS, Radix UI
- Built by students, for students
- Open to feedback and collaboration! [hello@poolara.com](mailto:hello@poolara.com)

---

## 🚀 Tagline
### Poolara — Your Circle on the Move.

