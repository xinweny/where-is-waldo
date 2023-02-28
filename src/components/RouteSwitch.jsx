import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

import LevelSelectPage from '../pages/LevelSelectPage';
import LevelPage from '../pages/LevelPage';
import LeaderboardPage from '../pages/LeaderboardPage';
import CreateLevelPage from '../pages/CreateLevelPage';
import EditLevelPage from '../pages/EditLevelPage';
import AdminLoginPage from '../pages/AdminLoginPage';
import AdminRoute from './AdminRoute';

function RouteSwitch({ isAdmin, handleSignIn, handleSignOut }) {
  return (
    <BrowserRouter>
      <Header isAdmin={isAdmin} handleSignOut={handleSignOut} />
      <Routes>
        <Route
          path="/login"
          element={
            <AdminLoginPage handleSignIn={handleSignIn} />
          }
        />
        <Route path="/" element={<LevelSelectPage isAdmin={isAdmin} />} />
        <Route
          path="/level/create"
          element={(
            <AdminRoute isAdmin={isAdmin}>
              <CreateLevelPage />
            </AdminRoute>
    )}
        />
        <Route path="/levels/:id" element={<LevelPage />}>
          <Route
            path="edit"
            element={(
              <AdminRoute isAdmin={isAdmin}>
                <EditLevelPage />
              </AdminRoute>
     )}
          />
        </Route>
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default RouteSwitch;
