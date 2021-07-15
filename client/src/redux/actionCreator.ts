import * as types from "../types";
import { ActionType } from "./actionTypes";

interface GetCompaniesPassed {
    type: "GET_COMPANIES_PASSED";
    payload: types.Company[];
};

export function getCompaniesPassed(companies: types.Company[]): GetCompaniesPassed {
    return {
        type: "GET_COMPANIES_PASSED",
        payload: companies
    };
}

interface AddCompanyPassed {
    type: "ADD_COMPANY_PASSED";
    payload: types.Company;
};

export function addCompanyPassed(
    company: types.Company
): AddCompanyPassed {
    return {
        type: "ADD_COMPANY_PASSED",
        payload: company
    };
}

interface EditCompanyPassed {
    type: "EDIT_COMPANY_PASSED";
    payload: {
        companyId: string;
        companyEdit: types.CompanyEdit;
    };
};

export function editCompanyPassed(
    companyId: string, 
    companyEdit: types.CompanyEdit
): EditCompanyPassed {
    return {
        type: "EDIT_COMPANY_PASSED",
        payload: {companyId, companyEdit}
    };
}

interface DeleteCompanyPassed {
    type: "DELETE_COMPANY_PASSED";
    payload: string;
};

export function deleteCompanyPassed(companyId: string): DeleteCompanyPassed {
    return {
        type: "DELETE_COMPANY_PASSED",
        payload: companyId
    };
}

interface AddJobPassed {
    type: "ADD_JOB_PASSED";
    payload: {
        companyId: string;
        job: types.Job;
    };
};

export function addJobPassed(
    companyId: string, job: types.Job
): AddJobPassed {
    return {
        type: "ADD_JOB_PASSED",
        payload: {companyId, job}
    };
}

interface EditJobPassed {
    type: "EDIT_JOB_PASSED";
    payload: {
        companyId: string;
        jobId: string;
        jobEdit: types.JobEdit
    };
};

export function editJobPassed(
    companyId: string,
    jobId: string,
    jobEdit: types.JobEdit
): EditJobPassed {
    return {
        type: "EDIT_JOB_PASSED",
        payload: {companyId, jobId, jobEdit}
    };
}

interface DeleteJobPassed {
    type: "DELETE_JOB_PASSED";
    payload: {
        companyId: string;
        jobId: string;
    };
};

export function deleteJobPassed(
    companyId: string,
    jobId: string,
): DeleteJobPassed {
    return {
        type: "DELETE_JOB_PASSED",
        payload: {companyId, jobId}
    };
}

interface ClearFailedStatus {
    type: "CLEAR_FAILED_STATUS";
}

export function clearFailedStatus(): ClearFailedStatus {
    return {
        type: "CLEAR_FAILED_STATUS"
    };
}

type ActionWithFunction = GetCompaniesPassed 
    | AddCompanyPassed
    | EditCompanyPassed
    | DeleteCompanyPassed
    | AddJobPassed
    | EditJobPassed
    | DeleteJobPassed
    | ClearFailedStatus;
 
interface ActionWithoutFunction {
    type: Exclude<ActionType, ActionWithFunction["type"]>;
    payload: string;
};

export type Action = ActionWithFunction | ActionWithoutFunction;