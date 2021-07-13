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
                    (link as HTMLAnchorElement).style.display === "block" ? 
                        "none" : "block";
            });
        }
    }

    return (
        <nav ref={navRef} className="nav">
            <button onClick={navButtonMobileClickHandler}
                className="nav__toggle-button-mobile">&#9776;</button>
            <Link className="nav__link" to="/">Home</Link>
            <Link className="nav__link" to="/companies">Company</Link>
            <Link className="nav__link" to="/jobs">Jobs</Link>
            <Link className="nav__link" to="/information">Information</Link>
        </nav>
    )
}

export default Nav;