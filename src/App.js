import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import AddTrip from "./pages/AddTrip";
import AddTripSuccess from "./pages/AddTripSucess";
import MyTrip from "./pages/MyTrip";  
import MyTripSuccess from "./pages/MyTripSuccess";  
import Dishes from "./pages/Dishes";
import AddDish from "./pages/AddDish";
export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/add-trip" element={<AddTrip />} />
          <Route path="/add-trip-success" element={<AddTripSuccess />} />
          <Route path="/my-trip" element={<MyTrip />} />
          <Route path="/my-trip-success" element={<MyTripSuccess />} />
          <Route path="/dishes" element={<Dishes />} />
          <Route path="/add-dish" element={<AddDish />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
