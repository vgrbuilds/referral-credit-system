# Referral & Credit System - Client Application

## Overview

This is the frontend client for the Referral & Credit System. It is built using **Next.js**, **Tailwind CSS**, and **Zustand** for state management. The client communicates with the backend APIs deployed on Render to manage users, referrals, and credit tracking.

The client provides a responsive, modern dashboard where users can:

* Register, log in, and log out securely
* View and share their unique referral link
* Track referred users and their conversion status
* Simulate purchases and earn credits
* See real-time metrics for total referred users, converted users, and total credits earned

Animations and visual feedback are implemented using **Framer Motion**.

---

## Features

1. **Authentication**

   * Secure sign-up and login flows
   * Session management handled in Zustand store

2. **Referral Management**

   * Generates a unique referral link per user
   * Copy and share functionality for referral links
   * Tracks referral status (pending, converted)

3. **Purchases**

   * Simulated purchase action triggers credit assignment for first-time referred users

4. **Dashboard**

   * Displays metrics: total referred users, converted users, total credits
   * Updates in real-time using Zustand for state management
   * Uses Tailwind CSS for responsive design

5. **Error Handling & Validation**

   * Client-side validation for inputs
   * Graceful handling of failed API requests or duplicate actions

---

## Environment Variables

The client expects a `.env.local` file in the root directory with the following variables:

```env
PORT=3000
NEXT_PUBLIC_API_URL=https://your-backend-render-link.onrender.com
```

* **PORT**: Local development port for Next.js app.
* **NEXT_PUBLIC_API_URL**: The base URL for all API requests to the backend.

Access the variables in your code as:

```ts
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

---

## Tech Stack

* **Next.js** - React framework for server-side rendering and routing
* **Tailwind CSS** - Utility-first CSS framework for styling
* **Zustand** - Lightweight state management for storing user session and dashboard data

No other frontend libraries or UI kits are used.

---

## Project Structure

```
/pages          # Next.js pages
/components     # Reusable React components
/store          # Zustand store for state management
/styles         # Tailwind CSS configurations and global styles
/utils          # Utility functions and API helpers
/public         # Public assets
```

---

## Getting Started

1. Clone the repository:

```bash
git clone <repo-url>
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file with PORT and SERVER_URL

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## API Integration

All API requests should point to the backend using `SERVER_URL`. Example:

```ts
const response = await fetch(`${process.env.SERVER_URL}/api/referrals`);
```

Ensure that the backend deployed on Render is running and accessible.

---

## Contributing

* Follow modular, clean code practices
* Use TypeScript types wherever possible
* Ensure state updates are handled via the Zustand store
* Maintain consistent commit messages and project structure

---

## Notes

* The client focuses on simplicity, responsiveness, and clarity
* Only Next.js, Tailwind CSS, Zustand, and Framer Motion are used
* No prebuilt UI kits or additional libraries except for Axios if necessary for API calls
