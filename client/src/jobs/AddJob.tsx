import { connect } from "react-redux";
import { StateType } from "../redux/reducer";
import * as types from "../types";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import * as thunk from "../redux/thunk";
import BreadCrumb from "../common/BreadCrumb";

import  "../styles/JobEditAndAdd.scss";

function mapStateToProps(state: StateType) {
    return {
        companies: state.companies
    };
}

const mapDispatchToProps = {
    addJob: thunk.addJob
};

interface JobAddProps {
    company: types.Company;
    addJob: (companyId: string, job: types.JobWithoutId) => void;
};

function AddJob({company, addJob}: JobAddProps) {

    const [nameInput, setNameInput] = useState("");
    const [salaryInput, setSalaryInput] = useState("");
    const [locationInput, setLocationInput] = useState("");
    const [descInput, setDescInput] = useState("");
    const history = useHistory();

    function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const job: types.JobWithoutId = {
            name: nameInput,
            salary: parseInt(salaryInput),
            location: locationInput,
            description: descInput
        };

        addJob(company.id, job);

        history.push(`/companies/${company.id}/jobs`);
    }

    return (
        <>
            <BreadCrumb 
                nameUrlList={[
                    {name: "company", url: "/companies"},
                    {name: company.name, url: `/companies/${company.id}`},
                    {name: "jobs", url: `/companies/${company.id}/jobs`},
                    {name: "add job", url: `/companies/${company.id}/add-job}`}
                ]}
            />
            <form className="job-edit-form" onSubmit={submitHandler}>
                <img className="job-edit-form__img" 
                    src={company.imgUrl} alt={company.name} />

                <label className="job-edit-form__label" htmlFor="name">Name</label>
                <input className="job-edit-form__input"
                    type="text" name="name" id="name" 
                    value={nameInput} 
                    onChange={(event) => setNameInput(event.target.value)}
                />

                <label className="job-edit-form__label" htmlFor="salary">Salary</label>
                <input className="job-edit-form__input"
                    type="number" name="salary" id="salary" 
                    value={salaryInput} 
                    onChange={(event) => setSalaryInput(event.target.value)}
                />

                <label className="job-edit-form__label" htmlFor="location">Location</label>
                <input className="job-edit-form__input"
                    type="string" name="location" id="location" 
                    value={locationInput} 
                    onChange={(event) => setLocationInput(event.target.value)}
                />

                <label className="job-edit-form__label" htmlFor="description">Description</label>
                <textarea className="job-edit-form__textarea"
                    name="description" id="description" rows={4} 
                    value={descInput}
                    onChange={(event) => setDescInput(event.target.value)}
                />

                <button className="job-edit-form__submit-btn"
                    type="submit">Submit</button>
            </form>
        </>
    );
}

interface AddJobWithHandlingProps {
    companies: types.Company[];
    addJob: (companyId: string, job: types.JobWithoutId) => void;
};

interface RouteParams {
    companyId: string;
};

function AddJobWithHandling(
    {companies, addJob}: AddJobWithHandlingProps
) {
    const { companyId } = useParams<RouteParams>();

    const company = companies.find(company => company.id === companyId);
    if(company === undefined) return <div>Invalid Company</div>;

    return <AddJob company={company} addJob={addJob} />;
}


export default connect(mapStateToProps, mapDispatchToProps)(AddJobWithHandling);