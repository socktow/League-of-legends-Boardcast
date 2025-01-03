import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FetchData from './FetchData/FetchData';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the League of Legends Broadcast application!</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/fetch">Fetch Data</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fetch" element={<FetchData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;