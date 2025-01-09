import "./index.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

// Các thành phần
import Landing from "./Pages/Landing";
import MainLayout from "./Layout/MainLayout/index";
import FetchData from "./FetchData/FetchData";
function App() {
  return (
    <Router>
      <Routes>

        {/* Giao diện chính */}
        <Route path="*" element={<MainLayout />}>
          <Route index element={<Landing />} />
          <Route path="data" element={<FetchData />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;