import { Link } from "react-router-dom";

import "../styles/FixedLinkButton.scss";

interface FixedLinkButtonProps {
    to: string;
    "aria-label": string;
    children: string;
};

function FixedLinkButton({to, children, ...props}: FixedLinkButtonProps) {
    return (
        <Link aria-label={props["aria-label"]} className="fixed-link-button" to={to}>
            {children}
        </Link>
    )
}

export default FixedLinkButton;