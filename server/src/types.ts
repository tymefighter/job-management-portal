/** Types */

export interface Job {
    id: string;
    name: string;
    description: string;
    salary: number;
    location: string;
};

export type JobWithoutId = Omit<Job, "id">;

export interface Comment {
    id: string;
    comment: string;
    date: string;
};

export interface Company {
    id: string;
    imgUrl: string;
    name: string;
    description: string;
    jobs: Job[];
    comments: Comment[]
};

export interface CompanyUser {
    name: string;
    description: string;
};

export interface CompanyEdit {
    name?: string;
    description?: string;
};

export interface JobEdit {
    name?: string;
    description?: string;
    salary?: number;
    location?: string;
};

/** Guards */

function hasJobProps(job: any) {
    if(typeof job !== "object") return false;

    return (
        typeof job.name === "string"
        && typeof job.description === "string"
        && typeof job.salary === "number"
        && typeof job.location === "string"
    );
}

export function isJob(job: any): job is Job {
    return hasJobProps(job)
        && typeof job.id === "string";
}

export function isJobList(jobs: any): jobs is Job[] {
    if(!(jobs instanceof Array)) return false;

    for(const job of jobs)
        if(!isJob(job)) return false;
    
    return true;
}

export function isJobWithoutId(job: any): job is Job {
    return hasJobProps(job);
}

export function isComment(comment: any): comment is Comment {
    if(typeof comment !== "object") return false;

    return (
        typeof comment.id === "string"
        && typeof comment.comment === "string"
        && typeof comment.date === "string"
    );
}

function hasCompanyProps(company: any) {
    if(typeof company !== "object") return false;

    if(
        typeof company.imgUrl !== "string"
        || typeof company.name !== "string"
        || typeof company.description !== "string"
        || !(company.jobs instanceof Array)
        || !(company.comments instanceof Array)
        || !(isJobList(company.jobs))
    ) return false;
    
    for(const comment of company.comments)
        if(!isComment(comment)) return false;

    return true;
}

export function isCompany(company: any): company is Company {
    return hasCompanyProps(company)
        && typeof company.id == "string";
}

export function isCompanyUser(companyUser: any): companyUser is CompanyUser {
    if(typeof companyUser !== "object") return false;

    return (
        typeof companyUser.name === "string"
        && typeof companyUser.description === "string"
    );
}

export function isCompanyList(companies: any): companies is Company[] {
    if(!(companies instanceof Array)) return false;

    for(const company of companies)
        if(!isCompany(company)) return false;
    
    return true;
}

interface AllowedPropsCompanyEditType {
    [key: string]: string | undefined;
    imgUrl: string;
    name: string;
    description: string;
};

const ALLOWED_PROPS_COMPANY_EDIT: AllowedPropsCompanyEditType = {
    imgUrl: "string", 
    name: "string", 
    description: "string"
};

export function isCompanyEdit(companyEdit: any): companyEdit is CompanyEdit {
    if(typeof companyEdit !== "object") return false;

    for(const prop of Object.getOwnPropertyNames(companyEdit))
        if(typeof companyEdit[prop] !== ALLOWED_PROPS_COMPANY_EDIT[prop]) 
            return false;
    
    return true;
}

interface AllowedPropsJobEditType {
    [key: string]: string | undefined;
    name: string;
    description: string;
    salary: string;
    location: string;
};

const ALLOWED_PROPS_JOB_EDIT: AllowedPropsJobEditType = {
    name: "string",
    description: "string",
    salary: "number",
    location: "string",
};

export function isJobEdit(jobEdit: any): jobEdit is JobEdit {
    if(typeof jobEdit !== "object") return false;

    for(const prop of Object.getOwnPropertyNames(jobEdit))
        if(typeof jobEdit[prop] === ALLOWED_PROPS_JOB_EDIT[prop]) 
            return false;
    
    return true;
}