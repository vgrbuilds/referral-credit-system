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

