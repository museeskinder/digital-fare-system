# Digital Fare Payment System

A modern, web-based fare payment system designed to improve the efficiency, transparency, and convenience of public transportation payments in Addis Ababa, Ethiopia.

## Project Highlights

- **Smart Card-Based Payment:**  
  Replaces the traditional cash-based fare collection with a rechargeable digital fare card system, each with a unique barcode.

- **Digital Wallet:**  
  Passengers can top up their wallet balance using banks or mobile payment gateways.

- **QR Code/Barcode Scanning:**  
  Passengers present their card (or QR code) to be scanned by bus/taxi operators for fare deduction.

- **Transaction History:**  
  All transactions are securely stored and can be reviewed by users and administrators.

- **SMS Notifications:**  
  Passengers receive SMS notifications for every transaction, including balance updates.

- **Role-Based Access:**  
  - **Passengers:** Register, top up, view balance, and pay fares.
  - **Drivers:** Authenticate, select routes, scan passenger cards, and process fare deductions.
  - **Managers/Admins:** Manage routes, fares, users, and system data.

- **Regulatory Compliance:**  
  Designed to comply with financial and transportation regulations set by the National Bank of Ethiopia and the Ministry of Transport.

## Out of Scope (Current Version)

- No mobile app (web only)
- No refund processing
- No offline functionality
- Limited to urban Addis Ababa
- No travel history tracking

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/digital-fare-system.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Authors

- Muse Eskinder (NSE/4988/14)
- Eyoel Gashaw (NSE/9622/14)
- Gabriela Begashaw (NSE/1575/14)

## License

MIT

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
