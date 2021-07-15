import { connect } from "react-redux";
import { StateType } from "../redux/reducer";
import { useParams, useRouteMatch } from "react-router-dom";
import * as types from "../types";
import FixedLinkButton from "../common/FixedLinkButton";
import BreadCrumb from "../common/BreadCrumb";

import  "../styles/Job.scss";
import ErrorComponent from "../common/ErrorComponent";

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
    jobId: string;
};

function Job({companies}: CompanyProps) {

    const { url } = useRouteMatch();
    const { companyId, jobId } = useParams<RouteParams>();

    const company = companies.find(company => company.id === companyId);
    if(company === undefined) return <ErrorComponent message="Invalid Company ID" />;

    const job = company.jobs.find(job => job.id === jobId);
    if(job === undefined) return <ErrorComponent message="Invalid Job ID" />;

    return (
        <>
            <BreadCrumb 
                nameUrlList={[
                    {name: "company", url: "/companies"},
                    {name: company.name, url: `/companies/${company.id}`},
                    {name: "jobs", url: `/companies/${company.id}/jobs`},
                    {name: job.name, url: `/companies/${company.id}/jobs/${job.id}`}
                ]}
            />
            <div className="job">
                <h1 className="job__name">{job.name}</h1>
                <h2 className="job__company">{company.name}</h2>
                <p className="job__salary">Salary: ₹{job.salary} per month</p>
                <p className="job__location">Location(s): {job.location}</p>
                <p className="job__desc">
                    <b>Description</b>: <br />
                    {job.description}
                </p>

                <FixedLinkButton aria-label="Edit Job Link"
                    to={`${url}/edit`}>&#9998;</FixedLinkButton>
            </div>
        </>
    );
}

export default connect(mapStateToProps)(Job);