import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Layout() {
    return (
        <>
            <h1>Financial Calculator</h1>
            <NavLink to="/simple-interest">
                <h6>Simple Interest</h6>
            </NavLink>
            <NavLink to="/compounding-interest">
                <h6>Compounding Interest</h6>
            </NavLink>
            <NavLink to="/uniform-series-annuities">
                <h6>Uniform Series Annuities</h6>
            </NavLink>
            <NavLink to="/gradient-series-annuities">
                <h6>Gradient Series Annuities</h6>
            </NavLink>
            <Outlet/>
        </>

    );
}

export default Layout;