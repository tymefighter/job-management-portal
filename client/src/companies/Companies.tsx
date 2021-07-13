import { useEffect } from "react";
import { connect } from "react-redux";
import { LoadStatus, StateType } from "../redux/reducer";
import * as thunk from "../redux/thunk";
import * as types from "../types";

import CompanyCard from "./CompanyCard";

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

function Companies({status, companies, getCompanies}: CompaniesProps) {

    useEffect(() => {
        if(status === "NOT_LOADED") getCompanies();
    }, [status]);

    if(status !== "LOADED") return <div>{status}</div>;

    return (
        <div className="companies">
            {companies.map(company => {
                return (
                    <CompanyCard
                        key={company.id}
                        name={company.name} imgUrl={company.imgUrl}
                        description={company.description}
                    />
                )
            })}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Companies);