# Server Application

This is the backend of the Referral & Credit System. It provides all business logic, authentication, referral handling, purchase validation, and credit assignment.

---

## Server Architecture Overview

The server is built using **Node.js + Express** with a clean, layered structure.  
Each responsibility is separated into routes, controllers, services, and models.

Primary responsibilities include:

- User authentication (register/login)
- Generating and validating referral codes
- Tracking referrals and conversions
- Assigning credits on first purchase
- Providing analytics for each user
- Managing database operations using MongoDB

---

## API Endpoints

### Authentication Routes (`/auth`)

- **POST /auth/register**
  - Register a new user
  - Body: `{ "email": "string", "password": "string", "referralCode": "string (optional)" }`
  - Response: `{ "message": "User registered successfully", "user": {...}, "token": "string" }`

- **POST /auth/login**
  - Login an existing user
  - Body: `{ "email": "string", "password": "string" }`
  - Response: `{ "message": "Login successful", "user": {...}, "token": "string" }`

- **GET /auth/profile**
  - Get user profile (requires authentication)
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ "user": {...} }`

### Referral Routes (`/referral`)

- **GET /referral/stats**
  - Get referral statistics for the authenticated user
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ "totalReferrals": number, "successfulReferrals": number, "totalCreditsEarned": number }`

- **GET /referral/referred-users**
  - Get list of users referred by the authenticated user
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ "referredUsers": [...] }`

### Purchase Routes (`/purchase`)

- **POST /purchase/first-purchase**
  - Make the first purchase and assign credits if referred
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "amount": number }`
  - Response: `{ "message": "Purchase successful", "creditsEarned": number }`

- **GET /purchase/status**
  - Check purchase status for the authenticated user
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ "hasPurchased": boolean, "purchaseDate": "date" }`

---

## Environment Variables

Create a `.env` file in the server directory based on `.env.example`. The following variables are required:

- `PORT`: Port number for the server (default: 5000)
- `NODE_ENV`: Environment mode (development/production)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing

---

## Technologies Used

### Runtime & Language
- **Node.js**
- **TypeScript**

### Framework
- **Express.js**

### Database
- **MongoDB** with **Mongoose ORM**

### Authentication
- **JWT-based authentication**
- **bcrypt for password hashing**

### Structure & Reliability
- Service-based architecture
- Middlewares for authentication and error handling
- Environment variable configuration

---

## File Structure

```
server/
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── dist/ (compiled output)
├── node_modules/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   │   ├── db.ts
│   │   └── env.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── purchase.controller.ts
│   │   └── referral.controller.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   ├── models/
│   │   ├── Purchase.ts
│   │   ├── Referral.ts
│   │   └── User.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── purchase.routes.ts
│   │   └── referral.routes.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── purchase.service.ts
│   │   └── referral.service.ts
│   ├── types/
│   │   └── express.d.ts
│   └── utils/
│       ├── ApiError.ts
│       ├── hash.ts
│       ├── token.ts
│       └── validator.ts
└── tests/
```

## Setup Instructions

1. Navigate to the server directory:
   ```sh
   cd server
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file based on `.env.example` with your MongoDB URI and JWT secret.

4. For development:
   ```sh
   npm run dev
   ```

5. For production:
   ```sh
   npm run build
   npm start
   ```

The server will run on the port specified in `.env` (default: 5000).

