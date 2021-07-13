import React from "react";
import { Link } from "react-router-dom";

import "./styles/Nav.scss";

function Nav() {
    return (
        <nav className="nav">
            <Link className="nav__link" to="/">Home</Link>
            <Link className="nav__link" to="/companies">Company</Link>
            <Link className="nav__link" to="/jobs">Jobs</Link>
            <Link className="nav__link" to="/information">Information</Link>
        </nav>
    )
}

export default Nav;