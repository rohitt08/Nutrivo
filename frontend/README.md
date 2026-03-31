# Food App - Frontend Setup & Running Guide

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navigation.js      (Top navbar with links)
│   │   ├── PrivateRoute.js    (Protected routes for auth)
│   │   └── Footer.js          (Footer component)
│   ├── context/
│   │   ├── AuthContext.js     (Authentication state)
│   │   └── CartContext.js     (Shopping cart state)
│   ├── pages/
│   │   ├── Login.js           (Login page)
│   │   ├── Register.js        (Registration page)
│   │   ├── Home.js            (Browse restaurants)
│   │   ├── Menu.js            (Browse all food items)
│   │   ├── RestaurantDetails.js (View restaurant menu)
│   │   ├── Cart.js            (Shopping cart)
│   │   ├── Orders.js          (Order history)
│   │   ├── Profile.js         (User profile & settings)
│   │   └── AdminDashboard.js  (Admin system management)
│   ├── services/
│   │   └── api.js             (API calls & axios setup)
│   ├── App.js                 (Main app component & routes)
│   ├── index.js               (React entry point)
│   └── index.css              (Global styles)
├── package.json
└── .gitignore
```

## Installation & Setup

### Prerequisites
- Node.js 14+ installed
- npm or yarn package manager
- Running Node.js backend on http://localhost:8080

### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

### Step 2: Create .env file (Optional)

Create a `.env.local` file in the `frontend` folder:

```
REACT_APP_API_URL=http://localhost:8080/api
```

### Step 3: Start the React Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

## Application Flow

### **User Journey:**

1. **Login/Register** → Authenticate with backend
   - Login page: `/login`
   - Register page: `/register`
   - Authentication handled by AuthContext

2. **Home Page** → Browse Restaurants
   - Route: `/`
   - Displays all available restaurants
   - Click "View Menu" to see restaurant details

3. **Menu** → Browse All Food Items
   - Route: `/menu`
   - Search functionality
   - Add items to cart

4. **Restaurant Details** → View Specific Menu
   - Route: `/restaurant/:id`
   - Shows all items from a specific restaurant
   - Add items to cart

5. **Cart** → Manage Items & Place Order
   - Route: `/cart`
   - View all items, adjust quantities
   - Place order (requires authentication)

6. **Orders** → View Order History
   - Route: `/orders`
   - Shows past orders and their status
   - Protected route (requires login)

7. **Profile** → Manage Account
   - Route: `/profile`
   - Update personal info
   - Change password
   - Logout
   - Protected route (requires login)

8. **Admin Dashboard** → Manage System
   - Route: `/admin`
   - Add/edit/delete restaurants
   - Add/edit/delete food items
   - Add/edit/delete categories
   - View system statistics
   - Protected route (requires admin role)

## Features

### Authentication
- ✅ User registration with validation
- ✅ User login with JWT tokens
- ✅ Token stored in localStorage
- ✅ Automatic token refresh on page load
- ✅ Role-based access (admin/client)

### Shopping Cart
- ✅ Add items to cart
- ✅ Remove items from cart
- ✅ Adjust quantities
- ✅ Local storage persistence
- ✅ Real-time cart count in navbar

### User Profile
- ✅ View & update profile info
- ✅ Change password
- ✅ Delete account
- ✅ View order history

### Admin Controls
- ✅ Manage restaurants (create/read/delete)
- ✅ Manage food items (create/read/delete)
- ✅ Manage categories (create/read/delete)
- ✅ View system statistics

### UI/UX
- ✅ Responsive Bootstrap design
- ✅ Green theme (#1b5e3f) matching design
- ✅ Loading spinners
- ✅ Error alerts
- ✅ Success notifications
- ✅ Card hover effects
- ✅ Mobile-friendly navigation

## API Integration

All API calls are made through `src/services/api.js` with:
- Automatic JWT token injection in headers
- Base URL configuration
- Error handling

### Available API Endpoints:

**Authentication:**
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

**Users:**
- GET `/api/user/getUser` - Get current user
- POST `/api/user/updateUser` - Update profile
- POST `/api/user/updatePassword` - Change password
- DELETE `/api/user/deleteUser/:id` - Delete account

**Restaurants:**
- GET `/api/resturant/getAll` - Get all restaurants
- GET `/api/resturant/get/:id` - Get restaurant by ID
- POST `/api/resturant/create` - Create restaurant (admin)
- POST `/api/resturant/update/:id` - Update restaurant (admin)
- DELETE `/api/resturant/delete/:id` - Delete restaurant (admin)

**Food:**
- GET `/api/food/getAll` - Get all food items
- GET `/api/food/get/:id` - Get food by ID
- GET `/api/food/getByResturant/:id` - Get items by restaurant
- POST `/api/food/create` - Create food item (admin)
- POST `/api/food/update/:id` - Update food item (admin)
- DELETE `/api/food/delete/:id` - Delete food item (admin)
- POST `/api/food/placeorder` - Place order (authenticated)

**Categories:**
- GET `/api/category/getAll` - Get all categories
- POST `/api/category/create` - Create category (admin)
- POST `/api/category/update/:id` - Update category (admin)
- DELETE `/api/category/delete/:id` - Delete category (admin)

## Build for Production

```bash
npm run build
```

Creates optimized production build in `build/` folder.

## Environment Variables

- `REACT_APP_API_URL` - Backend API base URL (default: http://localhost:8080/api)

## Troubleshooting

### CORS Issues
- Make sure backend is running on port 8080
- Backend has CORS enabled

### API Errors
- Check if backend is running: `npm run server` in the Food-App folder
- Verify MongoDB connection
- Check .env file in backend

### Login Issues
- Ensure credentials are correct
- Check browser localStorage for token
- Verify backend user registration was successful

### Cart Not Persisting
- Check localStorage is enabled in browser
- Clear cache and reload if needed

## Notes

- Default theme color: `#1b5e3f` (green)
- All styling uses Bootstrap 5
- Images can be URL strings or local file paths
- Cart persists across browser sessions
- Authentication token persists with localStorage