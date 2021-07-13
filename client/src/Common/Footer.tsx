import { Link } from "react-router-dom";

import "../styles/Footer.scss";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__section">
                <h2 className="footer__section-head">Nav</h2>
                <ul className="footer__section-list">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/companies">Company</Link></li>
                    <li><Link to="/jobs">Jobs</Link></li>
                    <li><Link to="/information">Information</Link></li>
                </ul>
            </div>
            <div className="footer__section">
                <h2 className="footer__section-head">Contact Me</h2>
                <ul className="footer__section-list">
                    <li> Email me at{" "}
                        <a href="mailto:ahmed.dadarkar@gmail.com">
                            ahmed.dadarkar@gmail.com
                        </a>
                    </li>
                    <li>Phone Number: +91 7594069315</li>
                    <li>WhatsApp Phone Number: +91 9920460903</li>
                </ul>
            </div>
            <div className="footer__section">
                <h2 className="footer__section-head">Ahmed Zaheer Dadarkar</h2>
                <p className="footer__section-para">
                    I am <b>Ahmed Zaheer Dadarkar</b>, also known as <b>tymefighter</b>.
                    I've built this website to practice my HTML, CSS, JS, React, Redux
                    and Typescript skills. This website allows one to manage companies
                    and jobs through an accessible user interface. Hope you enjoy the
                    user experience while engaging with this application !
                </p>
            </div>
        </footer>
    );
}

export default Footer;