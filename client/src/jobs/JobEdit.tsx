import { connect } from "react-redux";
import { LoadStatus, StateType } from "../redux/reducer";
import * as types from "../types";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import * as thunk from "../redux/thunk";

import  "../styles/JobEditAndAdd.scss";
import FixedButton from "../common/FixedButton";

function mapStateToProps(state: StateType) {
    return {
        status: state.companiesStatus,
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

        history.push(`/companies/${company.id}/jobs/${job.id}`);
    }

    function deleteHandler() {
        deleteJob(company.id, job.id);
        history.replace(`/companies/${company.id}/jobs/`);
    }

    return (
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
                onChange={(event) => setSalaryInput(parseInt(event.target.value))}
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
                
            <FixedButton onClick={deleteHandler}>&#128465;</FixedButton>
        </form>
    );
}

interface JobEditWithHandlingProps {
    status: LoadStatus;
    companies: types.Company[];
    editJob: (companyId: string, jobId: string, jobEdit: types.JobEdit) => void;
    deleteJob: (companyId: string, jobId: string) => void;
};

interface RouteParams {
    companyId: string;
    jobId: string;
};

function JobEditWithHandling(
    {status, companies, editJob, deleteJob}: JobEditWithHandlingProps
) {
    const { companyId, jobId } = useParams<RouteParams>();

    if(status !== "LOADED") return <div>{status}</div>;

    const company = companies.find(company => company.id === companyId);
    if(company === undefined) return <div>Invalid Company</div>;

    const job = company.jobs.find(job => job.id === jobId);
    if(job === undefined) return <div>Invalid Job</div>;

    return <JobEdit company={company} job={job} 
        editJob={editJob} deleteJob={deleteJob} />;
}


export default connect(mapStateToProps, mapDispatchToProps)(JobEditWithHandling);