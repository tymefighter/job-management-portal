import { connect } from "react-redux";
import { LoadStatus, StateType } from "../redux/reducer";
import * as types from "../types";
import * as thunk from "../redux/thunk";
import { Link } from "react-router-dom";
import JobItem from "./JobItem";
import { useEffect } from "react";

import  "../styles/CompanyJobs.scss";

function mapStateToProps(state: StateType) {
    return {
        status: state.companiesStatus,
        companies: state.companies
    };
}

const mapDispatchToProps = {
    getCompanies: thunk.getCompanies
};

interface CompanyProps {
    status: LoadStatus;
    companies: types.Company[];
    getCompanies: () => void
}

function Jobs({status, companies, getCompanies}: CompanyProps) {

    useEffect(() => {
        if(status === "NOT_LOADED") getCompanies();
    }, [status]);

    if(status !== "LOADED") return <div>{status}</div>;

    return (
        <div className="company-jobs">
            {companies.flatMap(company => company.jobs.map(job => {
                return (
                    <Link key={`${company.id}-${job.id}`}
                        className="job-item-link" to={`/company/${company.id}/jobs/${job.id}`}>
                        <JobItem 
                            companyName={company.name}
                            jobName={job.name}
                            salary={job.salary}
                        />
                    </Link>
                )
            }))}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);