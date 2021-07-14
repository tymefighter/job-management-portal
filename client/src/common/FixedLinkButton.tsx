import { Link } from "react-router-dom";

import "../styles/FixedLinkButton.scss";

interface FixedLinkButtonProps {
    to: string;
    children: string;
};

function FixedLinkButton({to, children}: FixedLinkButtonProps) {
    return (
        <Link className="fixed-link-button" to={to}>
            {children}
        </Link>
    )
}

export default FixedLinkButton;