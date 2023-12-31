import { NavLink } from "react-router-dom";
import React, { useState } from "react";


function OverLay({setPopupState}) {
    return (
        <div className="overlay-container">
            <NavLink to="/simple-interest" onClick={ () => setPopupState(false)}>
            <div className="overlay-button-container">
                <p>Simple Interest</p>
            </div>
            </NavLink>
            <NavLink to="/compounding-interest">
                <div className="overlay-button-container" onClick={ () => setPopupState(false)}>
                    <p>Compounding Interest</p>
                </div>
            </NavLink>
            <NavLink to="/uniform-series-cash-flow">
                <div className="overlay-button-container" onClick={ () => setPopupState(false)}>
                    <p>Uniform Series Cash Flow</p>
                </div>
            </NavLink>
            <div className='close-button-container'> 
                <button onClick={ () => setPopupState(false) }>X</button>
            </div>

        </div>
    );
}

function NavigationBar() {

    const [ popupState, setPopupState] = useState(false); 

    return(
    popupState === true ?
    <OverLay setPopupState={setPopupState}/> :
    <div className="navigation-bar">
        <div className="navigation-hamburger-menu-container">
            <button className="hamburger-menu-button" onClick={()=>setPopupState(true)}>&#9776;</button>
        </div>
        <div className="navigation-title-container">
            <h1>Financial Calculator</h1>
        </div>
        <div className="navigation-menu-components">
            <NavLink to="/simple-interest" >
            <div className="navigation-button-container">
                <p>Simple Interest</p>
            </div>
            </NavLink>
            <NavLink to="/compounding-interest">
                <div className="navigation-button-container">
                    <p>Compounding Interest</p>
                </div>
            </NavLink>
            <NavLink to="/uniform-series-cash-flow">
                <div className="navigation-button-container">
                    <p>Uniform Series Cash Flow</p>
                </div>
            </NavLink>
        </div>
    </div>  
    
    
    );
}



export default NavigationBar;