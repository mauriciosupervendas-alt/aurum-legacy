import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import PhotoViewer from './components/PhotoViewer';
import AdminPanel from './components/AdminPanel';
import { ContentProvider } from './contexts/ContentContext';

const App: React.FC = () => {
  return (
    <ContentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/view/:filename" element={<PhotoViewer />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ContentProvider>
  );
};

export default App;