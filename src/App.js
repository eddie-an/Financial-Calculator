import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SimpleInterest from "./components/SimpleInterest";
import CompoundingInterest from "./components/CompoundingInterest";
import UniformSeriesCashFlow from "./components/UniformSeriesCashFlow";
import GradientSeriesCashFlow from "./components/GradientSeriesCashFlow";
import Layout from "./components/Layout";

/**
 * This method is used to return a component for an individual radio input button
 * This shortens the JSX code and removes repetitive code for radio input button
 * @param {String} labelTitle The text to be displayed on the radio input button label
 * @param {String} id         The id to be used for each radio button. Id is used to identify each button for CSS styling
 * @param {String} name       The name which is used to group each radio button together
 * @param {Function} onClick  The function to call when the radio input button is clicked
 */
function RadioButton({ labelTitle, id, name, onClick }) {

  return (
      <div className="input-radio-option">
          <input type="radio" id={id} name={name} onClick={onClick} required></input>
          <label htmlFor={id}>{labelTitle}</label>
      </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
            <Route path="/simple-interest" element={<SimpleInterest/>}/>
            <Route path="/compounding-interest" element={<CompoundingInterest RadioButton={RadioButton}/>}/>
            <Route path="/uniform-series-cash-flow" element={<UniformSeriesCashFlow RadioButton={RadioButton}/>}/>
            <Route path="/gradient-series-cash-flow" element={<GradientSeriesCashFlow RadioButton={RadioButton}/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
