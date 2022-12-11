import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Main from './pages/Main';
import RequireAuth from './utils/RequireAuth';

import './css/default.scss';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth redirectTo="/login">
              <Main />
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
