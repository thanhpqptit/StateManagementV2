import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Bai1 from './state-management/bai1/Bai1';
import Bai2 from './state-management/bai2/Bai2';
import Bai3 from './state-management/bai3/Bai3';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="content">
        <Routes>
          <Route path="/bai1" element={<Bai1 />} />
          <Route path="/bai2" element={<Bai2 />} />
          <Route path="/bai3" element={<Bai3 />} />
          <Route path="*" element={<Navigate to="/bai1" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
