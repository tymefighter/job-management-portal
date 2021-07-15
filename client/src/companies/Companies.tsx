import { useEffect } from "react";
import { connect } from "react-redux";
import { LoadStatus, FailedOperationStatus, StateType } from "../redux/reducer";
import * as thunk from "../redux/thunk";
import * as actionCreator from "../redux/actionCreator";
import * as types from "../types";

import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import CompanyCard from "./CompanyCard";
import Company from "./Company";
import CompanyJobs from "../jobs/CompanyJobs";
import Job from "../jobs/Job";
import FixedLinkButton from "../common/FixedLinkButton";
import CompanyComments from "./CompanyComments";
import CompanyEdit from "./CompanyEdit";
import JobEdit from "../jobs/JobEdit";
import AddJob from "../jobs/AddJob";
import AddCompany from "./AddCompany";
import { loadRenderHelper, useOperationFailed } from "../operationHelper";

import  "../styles/Companies.scss";

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

interface CompaniesProps {
    companiesStatus: LoadStatus;
    failedOperationStatus: FailedOperationStatus | undefined;
    companies: types.Company[];
    getCompanies: () => void;
    clearFailedStatus: () => void;
};

function RenderCompanies({companies}: {companies: types.Company[]}) {
    const { url } = useRouteMatch();

    return (
        <div className="companies">
            {companies.map(company => {
                return (
                    <Link className="companies__link"
                        key={company.id} to={`/companies/${company.id}`}>
                        <CompanyCard       
                            name={company.name} imgUrl={company.imgUrl}
                            description={company.description}
                        />
                    </Link>
                )
            })}
            <FixedLinkButton to={`${url}/add-company`}>+</FixedLinkButton>
        </div>
    );
}

function Companies({
    companiesStatus, failedOperationStatus, companies, 
    getCompanies, clearFailedStatus
}: CompaniesProps) {

    const { path } = useRouteMatch();

    useEffect(() => {
        if(companiesStatus === "NOT_LOADED") getCompanies();
    }, [companiesStatus]);

    useOperationFailed(companiesStatus, failedOperationStatus, clearFailedStatus);

    const loadRenderOutput = loadRenderHelper(companiesStatus, failedOperationStatus);
    if(loadRenderOutput) return loadRenderOutput;

    return (
        <Switch>
            <Route path={`${path}/add-company`} exact>
                <AddCompany />
            </Route>
            <Route path={`${path}/:companyId`} exact>
                <Company />
            </Route>
            <Route path={`${path}/:companyId/edit`} exact>
                <CompanyEdit />
            </Route>
            <Route path={`${path}/:companyId/jobs`} exact>
                <CompanyJobs />
            </Route>
            <Route path={`${path}/:companyId/comments`} exact>
                <CompanyComments />
            </Route>
            <Route path={`${path}/:companyId/jobs/add-job`} exact>
                <AddJob />
            </Route>
            <Route path={`${path}/:companyId/jobs/:jobId`} exact>
                <Job />
            </Route>
            <Route path={`${path}/:companyId/jobs/:jobId/edit`} exact>
                <JobEdit />
            </Route>
            <Route path={`${path}/`}>
                <RenderCompanies companies={companies} />
            </Route>
        </Switch>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Companies);