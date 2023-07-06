import React from "react";

function Footer() {

    const year = new Date().getFullYear();

    return (
        <footer>
            <p>&#169; Edward An {year}</p>
        </footer>

    );
}

export default Footer;