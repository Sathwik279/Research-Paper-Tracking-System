import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddConference from './pages/AddConference';
import Papers from './pages/Papers';
import Submissions from './pages/Submissions';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <main className="animate-fade-in">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-conference" element={<AddConference />} />
            <Route path="/papers" element={<Papers />} />
            <Route path="/submissions" element={<Submissions />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
