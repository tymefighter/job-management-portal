import { connect } from "react-redux";
import { StateType } from "../redux/reducer";
import * as types from "../types";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import * as thunk from "../redux/thunk";
import FixedButton from "../common/FixedButton";
import BreadCrumb from "../common/BreadCrumb";
import ErrorComponent from "../common/ErrorComponent";

import  "../styles/JobEditAndAdd.scss";

function mapStateToProps(state: StateType) {
    return {
        companies: state.companies
    };
}

const mapDispatchToProps = {
    editJob: thunk.editJob,
    deleteJob: thunk.deleteJob
};

interface JobEditProps {
    company: types.Company;
    job: types.Job;
    editJob: (companyId: string, jobId: string, jobEdit: types.JobEdit) => void;
    deleteJob: (companyId: string, jobId: string) => void;
};

function JobEdit({company, job, editJob, deleteJob}: JobEditProps) {

    const [nameInput, setNameInput] = useState(job.name);
    const [salaryInput, setSalaryInput] = useState(job.salary);
    const [locationInput, setLocationInput] = useState(job.location);
    const [descInput, setDescInput] = useState(job.description);
    const history = useHistory();

    function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const jobEdit: types.JobEdit = {};
        
        if(nameInput !== job.name) jobEdit.name = nameInput;
        if(salaryInput !== job.salary) jobEdit.salary = salaryInput;
        if(locationInput !== job.location) jobEdit.location = locationInput;
        if(descInput !== job.description) jobEdit.description = descInput;

        editJob(company.id, job.id, jobEdit);

        history.push(`/companies/${company.id}/jobs/`);
    }

    function deleteHandler() {
        deleteJob(company.id, job.id);
        history.replace(`/companies/${company.id}/jobs/`);
    }

    return (
        <>
            <BreadCrumb 
                nameUrlList={[
                    {name: "company", url: "/companies"},
                    {name: company.name, url: `/companies/${company.id}`},
                    {name: "jobs", url: `/companies/${company.id}/jobs`},
                    {name: job.name, url: `/companies/${company.id}/jobs/${job.id}`},
                    {name: "edit", url: `/companies/${company.id}/jobs/${job.id}/edit`}
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
                    onChange={(event) => {
                        const value = event.target.value;
                        setSalaryInput(value === "" ? 0 : parseInt(value))
                    }}
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
                    
                <FixedButton aria-label="Delete Job Button"
                    onClick={deleteHandler}>&#128465;</FixedButton>
            </form>
        </>
    );
}

interface JobEditWithHandlingProps {
    companies: types.Company[];
    editJob: (companyId: string, jobId: string, jobEdit: types.JobEdit) => void;
    deleteJob: (companyId: string, jobId: string) => void;
};

interface RouteParams {
    companyId: string;
    jobId: string;
};

function JobEditWithHandling(
    {companies, editJob, deleteJob}: JobEditWithHandlingProps
) {
    const { companyId, jobId } = useParams<RouteParams>();

    const company = companies.find(company => company.id === companyId);
    if(company === undefined) return <ErrorComponent message="Invalid Company ID" />;

    const job = company.jobs.find(job => job.id === jobId);
    if(job === undefined) return <ErrorComponent message="Invalid Job ID" />;

    return <JobEdit company={company} job={job} 
        editJob={editJob} deleteJob={deleteJob} />;
}


export default connect(mapStateToProps, mapDispatchToProps)(JobEditWithHandling);