import { connect } from "react-redux";
import { StateType } from "../redux/reducer";
import * as types from "../types";
import { useParams, useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import FixedLinkButton from "../common/FixedLinkButton";
import BreadCrumb from "../common/BreadCrumb";
import ErrorComponent from "../common/ErrorComponent";

import  "../styles/Company.scss";

function mapStateToProps(state: StateType) {
    return {
        companies: state.companies
    };
}

interface CompanyProps {
    companies: types.Company[];
}

interface RouteParams {
    companyId: string;
};

function Company({companies}: CompanyProps) {

    const {url} = useRouteMatch();
    const { companyId } = useParams<RouteParams>();

    const company = companies.find(company => company.id === companyId);
    if(company === undefined) return <ErrorComponent message="Invalid Company ID" />;

    return (
        <>
            <BreadCrumb 
                nameUrlList={[
                    {name: "company", url: "/companies"},
                    {name: company.name, url: `/companies/${company.id}`}
                ]}
            />
            <div className="company">

                <img className="company__img" 
                    src={company.imgUrl} alt={company.name} />
                <h1 className="company__name">{company.name}</h1>
                <p className="company__desc">{company.description}</p>

                <div className="company__link-group">
                    <Link className="company__link" to={`${url}/jobs`}>Jobs</Link>
                    <Link className="company__link" to={`${url}/comments`}>Comments</Link>
                </div>

                <FixedLinkButton to={`${url}/edit`}>&#9998;</FixedLinkButton>
            </div>
        </>
    );
}

export default connect(mapStateToProps)(Company);