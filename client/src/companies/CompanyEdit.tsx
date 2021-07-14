import { connect } from "react-redux";
import { LoadStatus, StateType } from "../redux/reducer";
import * as types from "../types";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import * as thunk from "../redux/thunk";
import FixedButton from "../common/FixedButton";
import BreadCrumb from "../common/BreadCrumb";

import  "../styles/CompanyEdit.scss";

function mapStateToProps(state: StateType) {
    return {
        status: state.companiesStatus,
        companies: state.companies
    };
}

const mapDispatchToProps = {
    editCompany: thunk.editCompany,
    deleteCompany: thunk.deleteCompany
};

interface CompanyEditProps {
    company: types.Company;
    editCompany: (companyId: string, companyEdit: types.CompanyEdit) => void;
    deleteCompany: (companyId: string) => void;
};

function CompanyEdit({company, editCompany, deleteCompany}: CompanyEditProps) {

    const [nameInput, setNameInput] = useState(company.name);
    const [descInput, setDescInput] = useState(company.description);
    const history = useHistory();

    function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        const companyEdit: types.CompanyEdit = {};

        if(nameInput !== company.name) companyEdit.name = nameInput;
        if(descInput !== company.description) companyEdit.description = descInput;

        editCompany(company.id, companyEdit);

        history.push(`/companies/${company.id}`);
    }

    function deleteHandler() {
        deleteCompany(company.id);
        history.replace(`/companies/`);
    }

    return (
        <>
            <BreadCrumb 
                nameUrlList={[
                    {name: "company", url: "/companies"},
                    {name: company.name, url: `/companies/${company.id}`},
                    {name: "edit", url: `/companies/${company.id}/edit`}
                ]}
            />
            <form className="company-edit-form" onSubmit={submitHandler}>
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
                    type="submit">Submit</button>

                <FixedButton onClick={deleteHandler}>&#128465;</FixedButton>
            </form>
        </>
    );
}

interface CompanyEditWithHandlingProps {
    status: LoadStatus;
    companies: types.Company[];
    editCompany: (companyId: string, companyEdit: types.CompanyEdit) => void;
    deleteCompany: (companyId: string) => void;
};

interface RouteParams {
    companyId: string;
};

function CompanyEditWithHandling(
    {status, companies, editCompany, deleteCompany}: CompanyEditWithHandlingProps
) {
    const { companyId } = useParams<RouteParams>();

    if(status !== "LOADED") return <div>{status}</div>;

    const company = companies.find(company => company.id === companyId);
    if(company === undefined) return <div>Invalid Company</div>;

    return <CompanyEdit company={company} 
        editCompany={editCompany} deleteCompany={deleteCompany} />;
}


export default connect(mapStateToProps, mapDispatchToProps)(CompanyEditWithHandling);