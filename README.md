# zakat-calculator
Zakat Calculator USA - An online Islamic tool for calculating Zakat accurately. Built for Muslims in the United States to easily determine their Zakat obligation on wealth, savings, gold, and silver according to modern financial standards.

# Zakat Calculator USA 🇺🇸

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

A modern, accurate, and open-source Zakat calculator designed specifically for Muslims living in the United States. This tool helps you fulfill your religious obligation by calculating Zakat on cash, savings, gold, silver, and other modern assets according to correct Islamic principles and current market values.

**Live Demo:** [Calculate Your Zakat on dlightdaily.com](https://dlightdaily.com/zakat-calculator)

## ✨ Features

- **USA-Centric Calculations:** Pre-configured with current Nisab values based on silver (~612.36g) or gold (~87.48g) and USD ($).
- **Comprehensive Asset Support:** Calculate Zakat on:
  - Cash & Savings (Checking/Savings Accounts)
  - Gold & Silver (in ounces, grams, or Tolas)
  - Stocks, ETFs, and Retirement Funds (401k, IRA)
  - Cryptocurrency (BTC, ETH, etc.) - with optional API price fetching
  - Business Assets and Receivables
- **Dynamic Nisab Updates:** Automatically fetches or can be updated with the latest silver and gold prices to determine the accurate Nisab threshold.
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile devices.
- **Privacy-Focused:** All calculations are performed locally in your browser; your financial data is never sent to our servers.
- **Detailed Breakdown:** View a step-by-step summary of your calculation for clarity and trust.

## 🚀 How to Use

Using the calculator is simple:

1. **Visit** the [live calculator](https://dlightdaily.com/zakat-calculator).
2. **Enter** the amounts for each applicable asset category in the input fields.
3. **Select** your preferred Nisab basis (Silver (recommended) or Gold).
4. **Click** "Calculate Zakat".
5. **Review** the detailed breakdown of your total Zakatable wealth, Nisab value, and the final Zakat amount due (2.5%).

## 🛠️ For Developers: Installation & Local Development

This project is built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/). To run a local copy for development or contribution:

### Prerequisites

- Node.js (v16 or higher)
- npm, yarn, or pnpm

### Steps

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/zakat-calculator-usa.git
    cd zakat-calculator-usa
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  **Open your browser** and navigate to `http://localhost:3000` (or the port provided in the terminal).

### Building for Production

To create a production build:

```bash
npm run build
