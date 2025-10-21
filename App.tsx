import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import { initializeDataStorage } from './services/dataService';

import Layout from './components/layout/Layout';
import HolographicGrid from './components/three/HolographicGrid';
import FloatingSymbols from './components/three/FloatingSymbols';
import CustomCursor from './components/CustomCursor';

import HomePage from './pages/HomePage';
import CodesPage from './pages/CodesPage';
import ChatPage from './pages/ChatPage';
import AdminPage from './pages/AdminPage';

const App: React.FC = () => {
  useEffect(() => {
    // Initialize data storage on app mount
    initializeDataStorage();
  }, []);

  return (
    <ToastProvider>
      <Router>
        <div className="bg-background text-foreground min-h-screen">
          <HolographicGrid />
          <FloatingSymbols />
          <CustomCursor />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/codes" element={<CodesPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </ToastProvider>
  );
};

export default App;
