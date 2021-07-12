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

interface AddCompany {
    type: "ADD_COMPANY";
    payload: types.CompanyWithoutId;
};

export function addCompany(company: types.CompanyWithoutId): AddCompany {
    return {
        type: "ADD_COMPANY",
        payload: company
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

interface EditCompany {
    type: "EDIT_COMPANY";
    payload: {
        companyId: string;
        companyEdit: types.CompanyEdit;
    };
};

export function editCompany(
    companyId: string, 
    companyEdit: types.CompanyEdit
): EditCompany {
    return {
        type: "EDIT_COMPANY",
        payload: {companyId, companyEdit}
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

interface DeleteCompany {
    type: "DELETE_COMPANY";
    payload: string;
};

export function deleteCompany(companyId: string): DeleteCompany {
    return {
        type: "DELETE_COMPANY",
        payload: companyId
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

interface AddJob {
    type: "ADD_JOB";
    payload: {
        companyId: string;
        job: types.JobWithoutId;
    };
};

export function addJob(companyId: string, job: types.JobWithoutId): AddJob {
    return {
        type: "ADD_JOB",
        payload: {companyId, job}
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

interface EditJob {
    type: "EDIT_JOB";
    payload: {
        companyId: string;
        jobId: string;
        jobEdit: types.JobEdit
    };
};

export function editJob(
    companyId: string,
    jobId: string,
    jobEdit: types.JobEdit
): EditJob {
    return {
        type: "EDIT_JOB",
        payload: {companyId, jobId, jobEdit}
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

interface DeleteJob {
    type: "DELETE_JOB";
    payload: {
        companyId: string;
        jobId: string;
    };
};

export function deleteJob(
    companyId: string,
    jobId: string,
): DeleteJob {
    return {
        type: "DELETE_JOB",
        payload: {companyId, jobId}
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

type ActionWithPayload = GetCompaniesPassed 
    | AddCompany | AddCompanyPassed
    | EditCompany | EditCompanyPassed
    | DeleteCompany | DeleteCompanyPassed
    | AddJob | AddJobPassed
    | EditJob | EditJobPassed
    | DeleteJob | DeleteJobPassed;
 
interface ActionWithoutPayload {
    type: Exclude<ActionType, ActionWithPayload["type"]>
};

export type Action = ActionWithPayload | ActionWithoutPayload;