import { connect } from "react-redux";
import { LoadStatus, StateType } from "../redux/reducer";
import * as types from "../types";
import { useParams } from "react-router-dom";
import { useState } from "react";
import * as thunk from "../redux/thunk";

import  "../styles/CompanyEdit.scss";

function mapStateToProps(state: StateType) {
    return {
        status: state.companiesStatus,
        companies: state.companies
    };
}

const mapDispatchToProps = {
    editCompany: thunk.editCompany
};

interface CompanyEditProps {
    company: types.Company;
    editCompany: (companyId: string, companyEdit: types.CompanyEdit) => void;
};

function CompanyEdit({company, editCompany}: CompanyEditProps) {

    const [nameInput, setNameInput] = useState(company.name);
    const [descInput, setDescInput] = useState(company.description);

    function submitHandler(event: React.FormEvent<HTMLButtonElement>) {
        event.preventDefault();
        
        const companyEdit: types.CompanyEdit = {};

        if(nameInput !== company.name) companyEdit.name = nameInput;
        if(descInput !== company.description) companyEdit.description = descInput;

        editCompany(company.id, companyEdit);
    }

    return (
        <form className="company-edit-form">
            <img className="company-edit-form__img" 
                src={company.imgUrl} alt={company.name} />

            <label className="company-edit-form__name-label" htmlFor="name">Name</label>
            <input className="company-edit-form__name-input"
                type="text" name="name" id="name" 
                value={nameInput} 
                onChange={(event) => setNameInput(event.target.value)}
            />

            <label className="company-edit-form__desc-label" htmlFor="description">Description</label>
            <textarea className="company-edit-form__desc-input"
                name="description" id="description" rows={4} 
                value={descInput}
                onChange={(event) => setDescInput(event.target.value)}
            />

            <button className="company-edit-form__submit-btn"
                type="submit" onSubmit={submitHandler}>Submit</button>
        </form>
    );
}

interface CompanyEditWithHandlingProps {
    status: LoadStatus;
    companies: types.Company[];
    editCompany: (companyId: string, companyEdit: types.CompanyEdit) => void;
};

interface RouteParams {
    companyId: string;
};

function CompanyEditWithHandling(
    {status, companies, editCompany}: CompanyEditWithHandlingProps
) {
    const { companyId } = useParams<RouteParams>();

    if(status !== "LOADED") return <div>{status}</div>;

    const company = companies.find(company => company.id === companyId);
    if(company === undefined) return <div>Invalid Company</div>;

    return <CompanyEdit company={company} editCompany={editCompany} />;
}


export default connect(mapStateToProps, mapDispatchToProps)(CompanyEditWithHandling);