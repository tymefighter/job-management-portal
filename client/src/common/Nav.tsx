import { useRef } from "react";
import { Link } from "react-router-dom";

import "../styles/Nav.scss";

function Nav() {

    const navRef = useRef<HTMLElement | null>(null);

    function navButtonMobileClickHandler() {
        if(navRef.current) {
            const linkArr = navRef.current.querySelectorAll(".nav__link");
            linkArr.forEach(link => {

                (link as HTMLAnchorElement).style.display = 
                    (link as HTMLAnchorElement).style.display === "none" ? 
                        "block" : "none";
            });
        }
    }

    return (
        <nav ref={navRef} className="nav">
            <button onClick={navButtonMobileClickHandler} 
                aria-label="Navbar Toggle Button for Small Devices"
                className="nav__toggle-button-mobile">&#9776;</button>
            <Link className="nav__link" to="/">Home</Link>
            <Link className="nav__link" to="/companies">Company</Link>
            <Link className="nav__link" to="/jobs">Jobs</Link>
            <Link className="nav__link" to="/information">Information</Link>
        </nav>
    )
}

export default Nav;