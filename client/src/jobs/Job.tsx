import { connect } from "react-redux";
import { LoadStatus, StateType } from "../redux/reducer";
import { useParams } from "react-router-dom";
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

    const { companyId, jobId } = useParams<RouteParams>();

    if(status !== "LOADED") return <div>{status}</div>;

    const company = companies.find(company => company.id === companyId);
    if(company === undefined) return <div>Invalid Company</div>;

    const job = company.jobs.find(job => job.id === jobId);
    if(job === undefined) return <div>Invalid Job</div>;

    return (
        <div className="job">
            <h1 className="job__name">{job.name}</h1>
            <h2 className="job__company">{company.name}</h2>
            <p className="job__salary">Salary: ₹{job.salary} per month</p>
            <p className="job__location">Location(s): {job.location}</p>
            <p className="job__desc">
                <b>Description</b>: <br />
                {job.description}
            </p>
        </div>
    );
}

export default connect(mapStateToProps)(Job);