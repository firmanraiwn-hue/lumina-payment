# Lumina Villas - Premium Booking Template

A premium, modern React template for cottage, villa, and hotel booking. Designed with a fintech-inspired UI to build trust and provide a seamless booking experience.

## Features

- **Modern Fintech UI**: Clean, trustworthy design inspired by Stripe and Airbnb.
- **WhatsApp Booking Flow**: Seamlessly transition from web booking to WhatsApp confirmation.
- **Multiple Payment Methods**: Support for Manual Bank Transfer and QRIS (Static QR).
- **Configurable**: Easy to update business info, bank accounts, and theme via a single config file.
- **Responsive**: Fully optimized for mobile and desktop.
- **Animations**: Smooth page transitions and micro-interactions using Framer Motion.
- **State Management**: Persistent booking state using Zustand.

## Tech Stack

- React 19
- Vite
- Tailwind CSS v4
- Framer Motion
- Zustand
- React Router DOM
- Lucide React (Icons)

## Setup & Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Configuration

All business information is centralized in `src/config/siteConfig.ts`.

### Change Bank Accounts
Open `src/config/siteConfig.ts` and locate the `payment.bankAccounts` array. Add or modify the objects:

```typescript
bankAccounts: [
  {
    id: "bca",
    bankName: "BCA",
    accountNumber: "1234567890",
    accountHolder: "PT Lumina Villas",
    logo: "URL_TO_LOGO"
  }
]
```

### Replace QRIS Image
Open `src/config/siteConfig.ts` and update `payment.qrisImage` with the URL or path to your static QRIS image.

### Change WhatsApp Number
Open `src/config/siteConfig.ts` and update `whatsappNumber`. Use the country code without `+` or spaces (e.g., `6281234567890`).

### Update Properties
Property data is stored in `src/data/cottages.ts`. Modify this array to add your own villas or cottages.

## Deployment

Build the project for production:

```bash
npm run build
```

The output will be in the `dist` directory, ready to be deployed to Vercel, Netlify, or any static hosting provider.
