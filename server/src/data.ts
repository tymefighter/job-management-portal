import * as types from "./types";
import * as fs from "fs";

/** Data */

const DATA_PATH = "./data/companies.json";
const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8")) as types.Company[];

/** Helpers */

function writeDataToFile() {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data), "utf-8");
}

export function getCompanies(): types.Company[] {

}

export function addCompany(company: types.Company) {

}

export function getCompany(companyId: string): types.Company {

}

export function deleteCompany(companyId: string) {

}

export function editCompany(companyId: string, companyEdit: types.CompanyEdit) {

}

export function getJobs(companyId: string): types.Job[] {

}

export function addJob(company: types.Job) {

}

export function deleteJob(companyId: string, jobId: string) {

}

export function editJob(
    companyId: string, 
    jobId: string,
    jobEdit: types.JobEdit
) {

}