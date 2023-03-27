import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./features/home/Home";
import Details from "./features/details/Details";
import Navigation from "./components/navigation/Navigation";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:nasa_id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
