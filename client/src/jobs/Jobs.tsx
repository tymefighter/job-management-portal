import { connect } from "react-redux";
import { FailedOperationStatus, LoadStatus, StateType } from "../redux/reducer";
import * as types from "../types";
import * as thunk from "../redux/thunk";
import * as actionCreator from "../redux/actionCreator";
import { Link } from "react-router-dom";
import JobItem from "./JobItem";
import { useEffect } from "react";
import { loadRenderHelper, useOperationFailed } from "../operationHelper";

import  "../styles/CompanyJobs.scss";

function mapStateToProps(state: StateType) {
    return {
        companiesStatus: state.companiesStatus,
        failedOperationStatus: state.failedOperationStatus,
        companies: state.companies
    };
}

const mapDispatchToProps = {
    getCompanies: thunk.getCompanies,
    clearFailedStatus: actionCreator.clearFailedStatus
};

interface CompanyProps {
    companiesStatus: LoadStatus;
    failedOperationStatus: FailedOperationStatus | undefined;
    companies: types.Company[];
    getCompanies: () => void;
    clearFailedStatus: () => void;
};

function Jobs({
    companiesStatus, failedOperationStatus, companies, 
    getCompanies, clearFailedStatus
}: CompanyProps) {

    useEffect(() => {
        if(companiesStatus === "NOT_LOADED") getCompanies();
    }, [companiesStatus]);

    useOperationFailed(companiesStatus, failedOperationStatus, clearFailedStatus);
    
    const loadRenderOutput = loadRenderHelper(companiesStatus, failedOperationStatus);
    if(loadRenderOutput) return loadRenderOutput;

    return (
        <div className="company-jobs">
            {companies.flatMap(company => company.jobs.map(job => {
                return (
                    <Link key={`${company.id}-${job.id}`}
                        className="job-item-link" to={`/companies/${company.id}/jobs/${job.id}`}>
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