import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { Analytics } from "@vercel/analytics/react";
import { Camera } from "lucide-react";
import PrivacyPolicy from "./components/PrivacyPolicy";
import React from "react";
import ScannerApp from "./components/ScannerApp";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div
        className="app-container"
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        {/* Header Navigation */}
        <header
          style={{
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid var(--glass-border)",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: 600,
              fontSize: "1.1rem",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Camera size={32} color="#a855f7" />
            <h1 style={{ margin: "10px" }}>ScanStack</h1>
          </Link>
          <nav style={{ display: "flex", gap: "16px" }}>
            <Link
              to="/"
              style={{ color: "var(--text-secondary)", textDecoration: "none" }}
            >
              Home
            </Link>
            <Link
              to="/privacy-policy"
              style={{ color: "var(--text-secondary)", textDecoration: "none" }}
            >
              Privacy Policy
            </Link>
          </nav>
        </header>

        <main style={{ flex: 1, padding: "24px 0" }}>
          <Routes>
            <Route path="/" element={<ScannerApp />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Analytics />

        <footer
          style={{
            padding: "24px",
            textAlign: "center",
            borderTop: "1px solid var(--glass-border)",
            color: "var(--text-secondary)",
            fontSize: "0.875rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginBottom: "8px",
            }}
          >
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              Scanner
            </Link>
            <Link
              to="/privacy-policy"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Privacy Policy
            </Link>
          </div>
          <p>© {new Date().getFullYear()} ScanStack. All rights reserved.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
