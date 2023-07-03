import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Layout() {
    return (
        <>
            <h1>Financial Calculator</h1>
            <div className="navigation-bar">
                <NavLink to="/simple-interest">
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

            <Outlet/>
        </>

    );
}

export default Layout;