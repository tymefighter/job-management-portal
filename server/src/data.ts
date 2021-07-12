import * as types from "./types";
import * as fs from "fs";

/** Data */

const DATA_PATH = "./data/companies.json";
let data = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8")) as types.Company[];

/** Helpers */

function writeDataToFile() {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data), "utf-8");
}

export function getCompanies(): types.Company[] {
    return data;
}

export function addCompany(company: types.Company) {
    data.push(company);
    writeDataToFile();
}

export function getCompany(companyId: string): types.Company | undefined {
    return data.find(company => company.id === companyId);
}

export function deleteCompany(companyId: string): Boolean {
    const prevLength = data.length;
    data = data.filter(company => company.id !== companyId);
    writeDataToFile();

    return data.length < prevLength;
}

export function editCompany(
    companyId: string,
    companyEdit: types.CompanyEdit
): Boolean {
    const company = getCompany(companyId);

    type PropType = keyof types.CompanyEdit;

    if(company) {
        for(const prop of Object.getOwnPropertyNames(companyEdit) as PropType[])
            company[prop] = companyEdit[prop] as string;

        writeDataToFile();
        return true;
    }

    return false;
}

export function getJobs(companyId: string): types.Job[] | undefined {
    return getCompany(companyId) ?. jobs;
}

export function addJob(companyId: string, job: types.Job): Boolean {
    const company = getCompany(companyId);

    if(company) {
        company.jobs.push(job);
        writeDataToFile();
        return true;
    }

    return false;
}

export function getJob(companyId: string, jobId: string): types.Job | undefined {
    return getCompany(companyId) 
        ?. jobs 
        ?. find(job => job.id === jobId); 
}

export function deleteJob(companyId: string, jobId: string): Boolean {
    const company = getCompany(companyId);

    if(company) {
        company.jobs = company.jobs.filter(job => job.id !== jobId);
        writeDataToFile();
        return true;
    }

    return false;
}

export function editJob(
    companyId: string, 
    jobId: string,
    jobEdit: types.JobEdit
): Boolean {
    const job = getJob(companyId, jobId);

    type PropType = keyof types.JobEdit;
    type LooseType = {[prop: string]: any};

    if(job) {
        for(const prop of Object.getOwnPropertyNames(jobEdit) as PropType[])
            (job as LooseType)[prop] = jobEdit[prop];

        writeDataToFile();
        return true;
    }

    return false;
}