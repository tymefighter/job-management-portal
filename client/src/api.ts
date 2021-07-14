import * as types from "./types";

const baseUrl = "http://localhost:3000";

export async function fetchCompanies() {
    const response = await fetch(baseUrl + "/companies", {
        method: "GET"
    });

    if(!response.ok) {
        const text = await response.text()
        return Promise.reject(text);
    }

    const companies = await response.json();

    if(types.isCompanyList(companies)) return companies;
    else return Promise.reject("company list does not have the correct type");
}

export async function addCompany(company: types.CompanyWithoutId) {
    const response = await fetch(baseUrl + "/companies", {
        method: "POST",
        body: JSON.stringify(company)
    });

    if(!response.ok) {
        const text = await response.text()
        return Promise.reject(text);
    }

    const companyReceived = await response.json();

    if(types.isCompany(companyReceived)) return companyReceived;
    else return Promise.reject("company does not have the correct type");
}

export async function fetchCompany(companyId: string) {
    const response = await fetch(baseUrl + `/companies/${companyId}`, {
        method: "GET"
    });

    if(!response.ok) {
        const text = await response.text();
        return Promise.reject(text);
    }

    const company = await response.json();

    if(types.isCompany(company)) return company;
    else return Promise.reject("company does not have the correct type");
}

export async function editCompany(
    companyId: string, companyEdit: types.CompanyEdit
) {
    const response = await fetch(baseUrl + `/companies/${companyId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(companyEdit)
    });

    const text = await response.text()

    if(!response.ok) return Promise.reject(text);
    else return text;
}

export async function deleteCompany(companyId: string) {
    const response = await fetch(baseUrl + `/companies/${companyId}`, {
        method: "DELETE"
    });

    const text = await response.text()

    if(!response.ok) return Promise.reject(text);
    else return text;
}

export async function fetchJobs(companyId: string) {
    const response = await fetch(baseUrl + `/companies/${companyId}/jobs`, {
        method: "GET"
    });

    if(!response.ok) {
        const text = await response.text();
        return Promise.reject(text);
    }

    const jobList = await response.json();

    if(types.isJobList(jobList)) return jobList;
    else return Promise.reject("job list does not have the correct type");
}

export async function addJob(companyId: string, job: types.JobWithoutId) {
    const response = await fetch(baseUrl + `/companies/${companyId}/jobs`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(job)
    });

    if(!response.ok) {
        const text = await response.text()
        return Promise.reject(text);
    }

    const jobReceived = await response.json();

    if(types.isJob(jobReceived)) return jobReceived;
    else return Promise.reject("job does not have the correct type");
}

export async function fetchJob(
    companyId: string, jobId: string
) {
    const response = await fetch(baseUrl + `/companies/${companyId}/jobs/${jobId}`, {
        method: "GET"
    });

    if(!response.ok) {
        const text = await response.text();
        return Promise.reject(text);
    }

    const job = await response.json();

    if(types.isJob(job)) return job;
    else return Promise.reject("job does not have the correct type");
}

export async function editJob(
    companyId: string, jobId: string, jobEdit: types.JobEdit
) {
    const response = await fetch(baseUrl + `/companies/${companyId}/jobs/${jobId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobEdit)
    });

    const text = await response.text()

    if(!response.ok) return Promise.reject(text);
    else return text;
}

export async function deleteJob(
    companyId: string, jobId: string
) {
    const response = await fetch(baseUrl + `/companies/${companyId}/jobs/${jobId}`, {
        method: "DELETE"
    });

    const text = await response.text()

    if(!response.ok) return Promise.reject(text);
    else return text;
}