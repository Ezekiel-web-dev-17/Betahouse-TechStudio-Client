# 🏠 BetaHouse Frontend Client

> Modern, responsive React single-page application for the BetaHouse real estate marketplace. Built with Vite, Tailwind CSS 4, React Router 7, and Context API for cart, favorites, and real-time state management.

---

## 🎨 Key Features & User Experience

- **🔎 Property Discovery & Filtering**:
  - Interactive multi-criteria filter (Location, Property Type, Bedroom Count).
  - Real-time API query integration with instant results update.
- **🏡 Property Detail View**:
  - High-resolution visual gallery, property specifications, title documentation info, and instant tour booking.
- **🛒 Shopping Cart & Property Reservation**:
  - Context-driven cart management (`CartContext`) with persistent `localStorage` synchronization.
  - Subtotal and legal title verification fee calculation.
- **💳 Secure Checkout & Order Management**:
  - Seamless integration with Paystack payment gateway.
  - Support for Card payment, Bank Wire Transfer, and Installment Plans.
  - Order verification status page and order history tracking.
- **❤️ Favorites & Saved Properties**:
  - Save favorite properties to your account wishlist (`FavoritesContext`).
- **🔐 User Authentication**:
  - Email & Password sign-in / registration.
  - Google One Tap login integration via `@react-oauth/google`.
  - Client-side route protection using `ProtectedRoute`.
- **📱 Fully Responsive Design**:
  - Mobile slide-in drawer navigation, glassmorphism header backdrop, and animated toast notifications (`react-toastify`).

---

## 🛠️ Technology Stack

- **Core Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Authentication**: [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google)
- **UI Components & Icons**: [React Icons](https://react-icons.github.io/react-icons/), [React Toastify](https://fkhadra.github.io/react-toastify/)

---

## 📁 Repository Structure

```text
Betahouse-TechStudio-Client/
├── src/
│   ├── assets/              # Static images, SVG icons, and branding logos
│   ├── components/          # Reusable UI components
│   │   ├── Discover.jsx            # Featured properties showcase
│   │   ├── DisplayProperties.jsx   # Grid view for property listings
│   │   ├── Header.jsx              # Hero banner with filter search bar
│   │   ├── NavBar.jsx              # Responsive header & mobile menu drawer
│   │   ├── ProtectedRoute.jsx      # Authentication route guard
│   │   └── ...
│   ├── layouts/             # Router page layouts
│   │   ├── RootLayout.jsx          # Main layout (Navbar + Outlet + Footer)
│   │   └── AuthLayout.jsx          # Dedicated auth page layout
│   ├── pages/               # Application pages
│   │   ├── Home.jsx                # Landing page
│   │   ├── Properties.jsx          # All properties page
│   │   ├── PropertyDetail.jsx      # Single property showcase
│   │   ├── Cart.jsx                # Saved properties cart
│   │   ├── Checkout.jsx            # Payment & legal reservation checkout
│   │   ├── OrderSuccess.jsx        # Paystack verification & order confirmation
│   │   ├── MyOrders.jsx            # User order history
│   │   ├── Login.jsx               # Sign-in page
│   │   └── SignUp.jsx              # User registration page
│   ├── ApiContext.jsx       # Axios instance Context
│   ├── Axios.jsx            # Centralized Axios setup & request interceptors
│   ├── CartContext.jsx      # Cart state provider & total calculator
│   ├── FavoritesContext.jsx # Saved favorites provider
│   ├── App.jsx              # Main routes configuration
│   └── main.jsx             # React DOM root entrypoint
├── index.html               # HTML entry file
└── vite.config.js           # Vite configuration
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root of the client folder:

```env
# Backend API Base URL
VITE_API_BASE_URL=http://localhost:5000/api/v1/

# Google OAuth Client ID
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id.apps.googleusercontent.com
```

---

## 🚦 Installation & Local Setup

1. **Navigate to the client directory**:
   ```bash
   cd Betahouse-TechStudio-Client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   The client will start locally at `http://localhost:5173`.

4. **Build for Production**:
   ```bash
   npm run build
   ```

5. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## 🔄 API Interceptor & Session Management

- The app uses an Axios interceptor configured in [`Axios.jsx`](file:///home/ezekiel/projects/mine/Betahouse/Betahouse-TechStudio-Client/src/Axios.jsx) to automatically attach `Authorization: Bearer <token>` headers to outgoing requests.
- Auth tokens are retrieved seamlessly from `sessionStorage` or `localStorage` depending on user selection during login ("Remember Me").
