import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Quest from './pages/Quest';
import Boss from './pages/Boss';
import Event from './pages/Event';
import RequireAuth from './utils/RequireAuth';

import './css/default.scss';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/quest"
          element={
            <RequireAuth redirectTo="/login">
              <Quest />
            </RequireAuth>
          }
        />
        <Route
          path="/boss"
          element={
            <RequireAuth redirectTo="/login">
              <Boss />
            </RequireAuth>
          }
        />
        <Route
          path="/event"
          element={
            <RequireAuth redirectTo="/login">
              <Event />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
