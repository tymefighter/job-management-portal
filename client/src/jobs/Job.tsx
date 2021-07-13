import { connect } from "react-redux";
import { LoadStatus, StateType } from "../redux/reducer";
import { useParams, useRouteMatch } from "react-router-dom";
import * as types from "../types";

import  "../styles/Job.scss";

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
    jobId: string;
};

function Job({status, companies}: CompanyProps) {

    const { url } = useRouteMatch();
    const { companyId, jobId } = useParams<RouteParams>();

    if(status !== "LOADED") return <div>{status}</div>;

    const company = companies.find(company => company.id === companyId);
    if(company === undefined) return <div>Invalid Company</div>;

    const job = company.jobs.find(job => job.id === jobId);
    if(job === undefined) return <div>Invalid Job</div>;

    return (
        <div className="job">
        </div>
    );
}

export default connect(mapStateToProps)(Job);