import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

function Layout() {
    return (
        <>
            <div className="main">
            <NavigationBar/>
            <div className="wrapper">
                <Outlet/>
            </div>
            </div>
            <Footer/>
        </>

    );
}

export default Layout;