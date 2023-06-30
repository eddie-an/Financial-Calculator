import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SimpleInterest from "./components/SimpleInterest";
import CompoundingInterest from "./components/CompoundingInterest";
import UniformSeriesAnnuities from "./components/UniformSeriesAnnuities";
import GradientSeriesAnnuities from "./components/GradientSeriesAnnuities";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/simple-interest" element={<SimpleInterest/>}/>
          <Route path="/compounding-interest" element={<CompoundingInterest/>}/>
          <Route path="/uniform-series-annuities" element={<UniformSeriesAnnuities/>}/>
          <Route path="/gradient-series-annuities" element={<GradientSeriesAnnuities/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
