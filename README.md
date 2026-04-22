📈 Stock Watchlist App

A modern, responsive stock market watchlist dashboard built with React.js and Tailwind CSS, designed to track real-time stock prices and performance with a clean UI.

🚀 Features
🔍 Search and add stocks to your watchlist
📊 Real-time stock data (price, % change, etc.)
📈 Interactive charts for price trends
🧾 Clean dashboard layout
⚡ Fast and responsive UI with Tailwind CSS
❌ Remove stocks from watchlist
🔄 Auto updates with API integration


🛠️ Tech Stack
Frontend: React.js
Styling: Tailwind CSS
Charts: Recharts
API: Twelve Data API (or any stock API you're using)
State Management: React Hooks (useState, useEffect)


📂 Project Structure
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── StockCard.jsx
│   ├── Chart.jsx
│   └── SearchBar.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   └── ErrorPage.jsx
│
├── services/
│   └── api.js
│
├── App.jsx
└── main.jsx

## ⚙️ Setup

```bash
git clone https://github.com/your-username/stock-watchlist.git
cd stock-watchlist
npm install
npm run dev
