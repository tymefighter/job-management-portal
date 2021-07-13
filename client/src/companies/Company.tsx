import { connect } from "react-redux";
import { LoadStatus, StateType } from "../redux/reducer";
import * as types from "../types";
import { useParams, useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";

import  "../styles/Company.scss";

function mapStateToProps(state: StateType) {
    return {
        status: state.companiesStatus,
        companies: state.companies
    };
}

interface CompanyProps {
    status: LoadStatus;
    companies: types.Company[];
}

interface RouteParams {
    companyId: string;
};

function Company({status, companies}: CompanyProps) {

    const {url} = useRouteMatch();
    const { companyId } = useParams<RouteParams>();

    if(status !== "LOADED") return <div>{status}</div>;

    const company = companies.find(company => company.id === companyId);
    if(company === undefined) return <div>Invalid Company</div>;

    return (
        <div className="company">
            <img className="company__img" 
                src={company.imgUrl} alt={company.name} />
            <h1 className="company__name">{company.name}</h1>
            <p className="company__desc">{company.description}</p>

            <div className="company__link-group">
                <Link className="company__link" to={`${url}/jobs`}>Jobs</Link>
                <Link className="company__link" to={`${url}/comments`}>Comments</Link>
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(Company);