import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Todo from './pages/Todo';
import Boss from './pages/Boss';
import User from './pages/User';
import RequireAuth from './utils/RequireAuth';
import RedirectTo from './utils/RedirectTo';

import './css/default.scss';
import { setupInterceptor } from './redux/apis';

function App() {
  const navigate = useNavigate();
  setupInterceptor(navigate);

  return (
    <>
      <Routes>
        <Route path="/" element={<RedirectTo />} />
        <Route
          path="/todo"
          element={
            <RequireAuth redirectTo="/login">
              <Todo />
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
          path="/user"
          element={
            <RequireAuth redirectTo="/login">
              <User />
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
