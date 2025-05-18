# Runtime Frost — Online Store Interface (React + Redux)

A fully functional e-commerce frontend built with React and Redux. Includes product catalog, filtering, authentication, cart management, order history, and responsive UI with dark/light theme support.

## Features

- **Dynamic Product Catalog** — Fetches products via Axios from an external API.
- **Product Cards** — Includes product descriptions, availability, and user reviews.
- **Advanced Filtering** — Filter by brands, models, and generations.
- **Authentication** — User registration and login with token-based auth and protected routes.
- **Global State Management** — Implemented with Redux for scalable architecture.
- **Asynchronous Logic** — Handled via Redux middleware (e.g. Redux Thunk).
- **Modal Management** — Custom React hooks for modals.
- **Routing** — SPA navigation with React Router (home, cart, product pages, user dashboard).
- **Shopping Cart** — Add/remove items and adjust quantities.
- **Checkout Flow** — Contact form with error validation and order confirmation.
- **User Dashboard** — Displays order history.
- **Responsive Design** — TailwindCSS layout with full mobile/tablet support.
- **Dark/Light Theme** — Toggle between UI themes seamlessly.

## Tech Stack

- **Frontend**: JavaScript, HTML, CSS, React, Redux, React Router, Axios, Tailwind CSS

## Screenshots

### Home Page
Displays a clean and responsive product grid. Each product card includes image, price, title, and a quick action button.

<div style="display: flex; gap: 10px;">
  <img src="./public/screenshots/home-light.png" width="400" alt="Light Theme Screenshot Light Theme" />
  <img src="./public/screenshots/home-dark.png" width="400" alt="Dark Theme Screenshot Dark Theme" />
</div>

### Filtering Panel
Filter products by brand, model, or generation. The UI updates dynamically based on selected filters.

<div style="display: flex; gap: 10px;">
  <img src="./public/screenshots/filter-light.png" width="400" alt="Filter Screenshot Light Theme" />
  <img src="./public/screenshots/filter-dark.png" width="400" alt="Filter Screenshot Dark Theme" />
</div>

### Product Card  
Detailed product view including description, specifications, user reviews, price, and availability status. The design is responsive and user-friendly.

<div style="display: flex; gap: 10px;">
  <img src="./public/screenshots/productcard-light.png" width="400" alt="Product Card Screenshot Light Theme" />
  <img src="./public/screenshots/productcard-dark.png" width="400" alt="Filter Screenshot Dark Theme" />
</div>

### Shopping Cart
Easily add and remove items, adjust quantities, and proceed to checkout. The total amount updates automatically.

<div style="display: flex; gap: 10px;">
  <img src="./public/screenshots/cart-light.png" width="400" alt="Cart Screenshot Light Theme" />
  <img src="./public/screenshots/cart-dark.png" width="400" alt="Cart Screenshot Dark Theme" />
</div>

### Checkout Form  
Form for entering contact details and delivery information to finalize the order. Includes validation and helpful error messages for incorrect inputs.

<div style="display: flex; gap: 10px;">
  <img src="./public/screenshots/checkout-light.png" width="400" alt="Checkout Screenshot Light Theme" />
  <img src="./public/screenshots/checkout-dark.png" width="400" alt="Checkout Screenshot Dark Theme" />
</div>

### Login & Registration
Secure user authentication with email and password. Protected routes redirect unauthenticated users.

<div style="display: flex; gap: 10px;">
  <img src="./public/screenshots/login-light.png" width="400" alt="Login Screenshot Light Theme" />
  <img src="./public/screenshots/signup-dark.png" width="400" alt="Signup Screenshot Dark Theme" />
</div>

### User Dashboard
View order history in the dashboard.

<div style="display: flex; gap: 10px;">
  <img src="./public/screenshots/orders-light.png" width="400" alt="Orders Screenshot Light Theme" />
  <img src="./public/screenshots/orders-dark.png" width="400" alt="Orders Screenshot Dark Theme" />
</div>
