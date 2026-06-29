# TicketGhor (Client-Side) - Online Ticket Booking Platform

TicketGhor is a fully responsive MERN-stack application where users can seamlessly discover and book travel tickets (Bus, Train, Launch, Flight etc.). This repository contains the complete user-interface application code developed using React, Vite, and Tailwind CSS.

## Project Links

- **Live Production Site:** `https://ticket-ghor-client.vercel.app`
- **Server-Side Repository:** `https://github.com/mrblack009/ticket-ghor-server.git`

## Key Client Features

- **Role-Based Routing:** Structured dashboards separated dynamically into three user states: **User, Vendor, and Admin**.
- **Advanced Search & Discovery:** Multi-conditional filtering options covering _From $\rightarrow$ To_ inputs, transport modes, and sorted price lists.
- **Dynamic Cart & Stock Guard:** Real-time checking against available inventories with an automated countdown utility tied to ticket departure times.
- **Seamless Payment Checkouts:** Built-in Stripe interface processing for straightforward transaction completion after vendor approval.
- **Complete User Ledger:** Grid and tabular logs recording historical user bookings, current status parameters, and Stripe transaction IDs.
- **Theming Framework:** Global Light/Dark mode state toggle following strict alignment metrics.

## Used npm Packages

- `react` - Main interface framework core
- `react-router` - Client-side routing engine
- `tailwindcss` / `daisyui` - Utility styling engine and UI components
  `swiper` - Modern touch slider for the homepage feature carousel
- `axios` - Promise-based HTTP client for backend API communication
- `firebase` - Backend/Authentication services infrastructure
- `framer-motion` - Production-ready motion library for fluid UI animations
- `react-hook-form` - Performant, flexible, and extensible forms validation
- `chart.js` / `react-chartjs-2` (or `recharts`) - Graph utilities for vendor revenue dashboards
- `lucide-react` / `react-icons` - Modern clean iconography sets
- `sweetalert2` / `react-hot-toast` - Interactive UI notification modals
- `@stripe/stripe-js` / `@stripe/react-stripe-js` - Secure payment interface integration

## Environment Configuration (`.env.local`)

Create a `.env.local` file in your frontend root folder and configure your variables:

```env

apiKey:import.meta.env.VITE_apiKey, 
authDomain:import.meta.env.VITE_authDomain,
projectId:import.meta.env.VITE_projectId, 
storageBucket:import.meta.env.VITE_storageBucket, 
messagingSenderId:import.meta.env.VITE_messagingSenderId, 
appId:import.meta.env.VITE_appId

VITE_IMGBB_API_KEY=your_imgbb_api_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key

```
