import { NavLink } from "react-router-dom";

function NavigationBar() {
    return(
    <div className="navigation-bar">
        <div className="navigation-title-container">
            <h1>Financial Calculator</h1>
        </div>
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
    );
}

export default NavigationBar;