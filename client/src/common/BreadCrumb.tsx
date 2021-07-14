import { Link } from "react-router-dom";

import "../styles/BreadCrumb.scss";

interface BreadCrumbProps {
    nameUrlList: {name: string, url: string}[]
};

function BreadCrumb({nameUrlList}: BreadCrumbProps) {
    return (
        <ul className="bread-crumb">
            {nameUrlList.map(({name, url}) => {
                return (
                    <li className="bread-crumb__element" key={url}>
                        <Link className="bread-crumb__link" to={url}>
                            {name}
                        </Link>
                    </li>
                )
            })}
        </ul>
    );
};

export default BreadCrumb;