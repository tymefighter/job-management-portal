import { connect } from "react-redux";
import { StateType } from "../redux/reducer";
import * as types from "../types";
import { useParams, useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import JobItem from "./JobItem";
import FixedLinkButton from "../common/FixedLinkButton";
import BreadCrumb from "../common/BreadCrumb";
import ErrorComponent from "../common/ErrorComponent";

import  "../styles/CompanyJobs.scss";

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
    url: string;
};

function CompanyJobs({companies}: CompanyProps) {

    const { url } = useRouteMatch();
    const { companyId } = useParams<RouteParams>();

    const company = companies.find(company => company.id === companyId);
    if(company === undefined) return <ErrorComponent message="Invalid Company ID" />;

    return (
        <>
            <BreadCrumb 
                nameUrlList={[
                    {name: "company", url: "/companies"},
                    {name: company.name, url: `/companies/${company.id}`},
                    {name: "jobs", url: `/companies/${company.id}/jobs`}
                ]}
            />
            <div className="company-jobs">
                {company.jobs.map(job => {
                    return (
                        <Link key={job.id}
                            className="job-item-link" to={`${url}/${job.id}`}
                            aria-label={`Link to Job ${job.name}`}
                        >
                            <JobItem 
                                companyName={company.name}
                                jobName={job.name}
                                salary={job.salary}
                            />
                        </Link>
                    )
                })}
                <FixedLinkButton to={`${url}/add-job`}
                    aria-label="Add Job Link">+</FixedLinkButton>
            </div>
        </>
    );
}

export default connect(mapStateToProps)(CompanyJobs);