# Kisan Suvidha

**Digital Farmer Procurement & Market Platform**

Kisan Suvidha is a farmer-focused digital platform designed to simplify agricultural procurement, improve price transparency, and provide direct access to buyers and government-supported services.

The platform helps farmers understand **where to sell, when to arrive, and what price they can expect**, while reducing unnecessary waiting time and intermediaries.

---

## Features

### Farmer Services

* Crop registration
* Farmer dashboard
* Procurement centre discovery
* Procurement queue and waiting-time information
* Direct connection with buyers
* Market and price information
* Transaction tracking

### Procurement Centres

* View procurement centre status
* Check current queue/waiting information
* Identify centres with high queues
* Compare available procurement options

### Direct Market

* Find potential buyers
* Compare buyer offers
* Improve direct market access for farmers

### Price Information

* Reference crop prices
* Buyer offer ranges
* Price comparison for better decision-making

### Transactions

* Track completed transactions
* Track ongoing transactions
* Centralized transaction information

### Government-Service Interface

The interface follows a government-service portal style with:

* Farmer Login
* Buyer Login
* Officer Login
* Notifications
* Hindi/English language options
* Accessibility controls

---

## Tech Stack

### Frontend

* **React**
* **TypeScript**
* **TanStack Start**
* **TanStack Router**
* **Vite**
* **Tailwind CSS**
* **shadcn/ui / Radix UI components**
* **React Hook Form**
* **Zod**
* **Lucide React**
* **Recharts**

### Development Tools

* ESLint
* Prettier
* npm / Bun
* TypeScript

---

## Project Structure

```text
kisansetu/
│
├── public/
│   ├── kisan-favicon.png
│   └── robots.txt
│
├── src/
│   ├── router.tsx
│   ├── routeTree.gen.ts
│   ├── server.ts
│   ├── start.tsx
│   └── styles.css
│
├── node_modules/
│
├── components.json
├── eslint.config.js
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
│
└── README.md
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

If the project has peer-dependency conflicts:

```bash
npm install --legacy-peer-deps
```

### 3. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run preview
```

Runs the production build locally.

```bash
npm run lint
```

Checks the project for ESLint issues.

```bash
npm run format
```

Formats the project using Prettier.

---

## Production Build

Create a production build with:

```bash
npm run build
```

Then preview it locally:

```bash
npm run preview
```

---

## Vite Configuration

The project uses TanStack Start with Vite.

The main configuration is located at:

```text
vite.config.ts
```

It includes:

* TanStack Start
* React
* TypeScript path resolution
* Tailwind CSS

---

## User Roles

The platform is designed around three primary user types:

| Role    | Purpose                                                                      |
| ------- | ---------------------------------------------------------------------------- |
| Farmer  | Register crops, find procurement centres, view prices and track transactions |
| Buyer   | Find farmers/products and compare offers                                     |
| Officer | Manage and monitor procurement-related operations                            |

---

## Core Workflow

```text
Farmer
   │
   ▼
Register Crop
   │
   ▼
Find Procurement Centre
   │
   ▼
Check Queue & Waiting Time
   │
   ▼
View Market Prices
   │
   ▼
Compare Buyer Offers
   │
   ▼
Complete Transaction
   │
   ▼
Track Transaction
```

---

## Design Goals

Kisan Suvidha focuses on:

* **Simplicity** — Make agricultural services easy to understand.
* **Transparency** — Provide clear price and procurement information.
* **Accessibility** — Support different languages and accessibility requirements.
* **Efficiency** — Reduce unnecessary waiting at procurement centres.
* **Direct Market Access** — Help farmers connect with buyers.
* **Centralization** — Bring important farmer services into one platform.

---

## Current Status

The frontend is currently running successfully with **TanStack Start + Vite** and is accessible locally through:

```text
http://localhost:5173
```

The current implementation primarily focuses on the **frontend user interface and application structure**.

---

## Future Scope

Potential future integrations include:

* Real-time procurement-centre queues
* Government API integration
* Real-time mandi/market prices
* Farmer and buyer authentication
* Database-backed crop registration
* Transaction management
* SMS/WhatsApp notifications
* GIS-based procurement-centre discovery
* Multilingual support
* Officer administration dashboard
* Payment integration
* Government scheme integration

---

## Vision

**Kisan Suvidha aims to create a unified digital layer between farmers, procurement centres, buyers, and government services — making agricultural selling more transparent, accessible, and efficient.**

---

## License

This project is developed as a technology/project prototype. Add the appropriate license here if the project is released publicly.
