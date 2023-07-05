import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Layout() {
    return (
        <>
            <div className="navigation-bar">
                <h1 className="navigation-title">Financial Calculator</h1>
                <NavLink to="/simple-interest" className="navigation-button">
                    <h6>Simple Interest</h6>
                </NavLink>
                <NavLink to="/compounding-interest">
                    <h6>Compounding Interest</h6>
                </NavLink>
                <NavLink to="/uniform-series-cash-flow">
                    <h6>Uniform Series Cash Flow</h6>
                </NavLink>
                <NavLink to="/gradient-series-cash-flow">
                    <h6>Gradient Series Cash Flow</h6>
                </NavLink>
            </div>

            <div className="wrapper">
                <Outlet/>
            </div>
        </>

    );
}

export default Layout;