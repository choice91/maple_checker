import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';

import './css/default.scss';

function App() {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
