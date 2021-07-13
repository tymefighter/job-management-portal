import { useEffect } from "react";
import { connect } from "react-redux";
import { LoadStatus, StateType } from "../redux/reducer";
import * as thunk from "../redux/thunk";
import * as types from "../types";

import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import CompanyCard from "./CompanyCard";
import Company from "./Company";

import  "../styles/Companies.scss";

function mapStateToProps(state: StateType) {
    return {
        status: state.companiesStatus,
        companies: state.companies
    };
}

const mapDispatchToProps = {
    getCompanies: thunk.getCompanies
};

interface CompaniesProps {
    status: LoadStatus;
    companies: types.Company[];
    getCompanies: () => void
}

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
            <Link className="add-company-btn" to={`${url}/add-company`}>+</Link>
        </div>
    );
}

function Companies({status, companies, getCompanies}: CompaniesProps) {

    const { path } = useRouteMatch();

    useEffect(() => {
        if(status === "NOT_LOADED") getCompanies();
    }, [status]);

    if(status !== "LOADED") return <div>{status}</div>;

    return (
        <Switch>
            <Route path={`${path}/add-company`}>

            </Route>
            <Route path={`${path}/:companyId`}>
                <Company />
            </Route>
            <Route path={`${path}/:companyId/edit`}>

            </Route>
            <Route path={`${path}/:companyId/jobs`}>

            </Route>
            <Route path={`${path}/:companyId/comments`}>

            </Route>
            <Route path={`${path}/:companyId/jobs/add-job`}>

            </Route>
            <Route path={`${path}/:companyId/jobs/:jobId`}>

            </Route>
            <Route path={`${path}/:companyId/jobs/:jobId/edit`}>

            </Route>
            <Route path={`${path}/`}>
                <RenderCompanies companies={companies} />
            </Route>
        </Switch>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Companies);