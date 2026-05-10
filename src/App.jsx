import React from "react";
import { WatchlistProvider } from "./context/WatchlistContext";
import { ThemeToggle } from "./components/ThemeToggle";

import {Navbar} from "./components/Navbar";
import  {Dashboard}  from "./pages/Dashboard";

function App() {
  return (
    <WatchlistProvider>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        
        {/* Top Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className="p-4 md:p-6">
          <Dashboard />
        </main>

      </div>
    </WatchlistProvider>
  );
}

export default App;