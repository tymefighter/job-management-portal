import { connect } from "react-redux";
import { LoadStatus, StateType } from "../redux/reducer";
import * as types from "../types";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import * as thunk from "../redux/thunk";
import BreadCrumb from "../common/BreadCrumb";

import  "../styles/CompanyEditAndAdd.scss";

function mapStateToProps(state: StateType) {
    return {
        status: state.companiesStatus,
        companies: state.companies
    };
}

const mapDispatchToProps = {
    addCompany: thunk.addCompany,
};

interface AddCompanyProps {
    addCompany: (company: types.CompanyWithoutId) => void;
};

function AddCompany({addCompany}: AddCompanyProps) {

    const [nameInput, setNameInput] = useState("");
    const [descInput, setDescInput] = useState("");
    const history = useHistory();

    function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        history.push(`/companies/`);
    }

    return (
        <>
            <BreadCrumb 
                nameUrlList={[
                    {name: "company", url: "/companies"},
                    {name: "add company", url: `/companies/add-company`}
                ]}
            />
            <form className="company-form" onSubmit={submitHandler}>

                <label className="company-form__label" htmlFor="name">Name</label>
                <input className="company-form__input"
                    type="text" name="name" id="name" 
                    value={nameInput} 
                    onChange={(event) => setNameInput(event.target.value)}
                />

                <label className="company-form__label" htmlFor="description">Description</label>
                <textarea className="company-form__textarea"
                    name="description" id="description" rows={4} 
                    value={descInput}
                    onChange={(event) => setDescInput(event.target.value)}
                />

                <label className="company-form__label" htmlFor="logo-img">Company Logo</label>
                <input className="company-form__file" type="file" name="logo-img" id="logo-img" />

                <button className="company-form__submit-btn"
                    type="submit">Submit</button>
            </form>
        </>
    );
}

interface AddCompanyWithHandlingProps {
    status: LoadStatus;
    companies: types.Company[];
    addCompany: (company: types.CompanyWithoutId) => void;
};

function AddCompanyWithHandling(
    {status, companies, addCompany}: AddCompanyWithHandlingProps
) {

    if(status !== "LOADED") return <div>{status}</div>;

    return <AddCompany addCompany={addCompany} />;
}


export default connect(mapStateToProps, mapDispatchToProps)(AddCompanyWithHandling);