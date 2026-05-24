  import React from "react";
  import { WatchlistProvider } from "./context/WatchlistContext";
  import { ThemeToggle } from "./components/ThemeToggle";

  import {Navbar} from "./components/Navbar";
  import  {Dashboard}  from "./pages/Dashboard";
import { LandingPage } from "./pages/LandingPage";

  function App() {
    return (

<>
      <LandingPage />
      <WatchlistProvider >
        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] ">
          
          {/* Top Navigation */}
          <Navbar />

          {/* Main Content */}
          <main className="">
            <Dashboard />
            
          </main>
         

        </div>
      </WatchlistProvider>
 </>   );
  }

  export default App;