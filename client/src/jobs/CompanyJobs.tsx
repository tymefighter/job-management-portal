import { connect } from "react-redux";
import { LoadStatus, StateType } from "../redux/reducer";
import * as types from "../types";
import { useParams, useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import JobItem from "./JobItem";
import FixedLinkButton from "../common/FixedLinkButton";

import  "../styles/CompanyJobs.scss";

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
    url: string;
};

function CompanyJobs({status, companies}: CompanyProps) {

    const { url } = useRouteMatch();
    const { companyId } = useParams<RouteParams>();

    if(status !== "LOADED") return <div>{status}</div>;

    const company = companies.find(company => company.id === companyId);
    if(company === undefined) return <div>Invalid Company</div>

    return (
        <div className="company-jobs">
            {company.jobs.map(job => {
                return (
                    <Link key={job.id}
                        className="job-item-link" to={`${url}/${job.id}`}>
                        <JobItem 
                            companyName={company.name}
                            jobName={job.name}
                            salary={job.salary}
                        />
                    </Link>
                )
            })}
            <FixedLinkButton to={`${url}/add-job`}>+</FixedLinkButton>
        </div>
    );
}

export default connect(mapStateToProps)(CompanyJobs);