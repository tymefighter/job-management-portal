import * as actionCreator from "./actionCreator";
import * as api from "../api";
import * as types from "../types";

type DispatchType = (action: actionCreator.Action) => void;

export function getCompanies() {
    return (dispatch: DispatchType) => {
        dispatch({type: "GET_COMPANIES"});

        api
        .fetchCompanies()
        .then(companies => 
            dispatch(actionCreator.getCompaniesPassed(companies)))
        .catch(err => dispatch({type: "GET_COMPANIES_FAILED"}));
    }
}

export function addCompany(newCompany: types.CompanyUser) {
    return (dispatch: DispatchType) => {
        dispatch({type: "ADD_COMPANY"});

        api
        .addCompany(newCompany)
        .then(receivedCompany => 
            dispatch(actionCreator.addCompanyPassed(receivedCompany)))
        .catch(err => dispatch({type: "ADD_COMPANY_FAILED"}));
    }
}

export function editCompany(companyId: string, companyEdit: types.CompanyEdit) {
    return (dispatch: DispatchType) => {
        dispatch({type: "EDIT_COMPANY"});

        api
        .editCompany(companyId, companyEdit)
        .then(responseText => 
            dispatch(actionCreator.editCompanyPassed(companyId, companyEdit)))
        .catch(err => dispatch({type: "EDIT_COMPANY_FAILED"}));
    }
}

export function deleteCompany(companyId: string) {
    return (dispatch: DispatchType) => {
        dispatch({type: "DELETE_COMPANY"});

        api
        .deleteCompany(companyId)
        .then(responseText => 
            dispatch(actionCreator.deleteCompanyPassed(companyId)))
        .catch(err => dispatch({type: "DELETE_COMPANY_FAILED"}));
    }
}

export function addJob(
    companyId: string, 
    job: types.JobWithoutId
) {
    return (dispatch: DispatchType) => {
        dispatch({type: "ADD_JOB"});

        api
        .addJob(companyId, job)
        .then(receivedJob => 
            dispatch(actionCreator.addJobPassed(companyId, receivedJob)))
        .catch(err => dispatch({type: "ADD_JOB_FAILED"}));
    }
}

export function editJob(
    companyId: string,
    jobId: string,
    jobEdit: types.JobEdit
) {
    return (dispatch: DispatchType) => {
        dispatch({type: "ADD_JOB"});

        api
        .editJob(companyId, jobId, jobEdit)
        .then(responseText => 
            dispatch(actionCreator.editJobPassed(companyId, jobId, jobEdit)))
        .catch(err => dispatch({type: "EDIT_JOB_FAILED"}));
    }
}

export function deleteJob(
    companyId: string,
    jobId: string
) {
    return (dispatch: DispatchType) => {
        dispatch({type: "ADD_JOB"});

        api
        .deleteJob(companyId, jobId)
        .then(responseText => 
            dispatch(actionCreator.deleteJobPassed(companyId, jobId)))
        .catch(err => dispatch({type: "DELETE_JOB_FAILED"}));
    }
}