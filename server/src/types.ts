/** Types */

export interface Job {
    id: string;
    name: string;
    description: string;
    salary: number;
    location: string;
};

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

/** Guards */

export function isJob(job: any): job is Job {
    if(typeof job !== "object") return false;

    return (
        typeof job.id === "string"
        && job.name === "string"
        && job.description === "string"
        && job.salary === "number"
        && job.location === "string"
    );
}

export function isComment(comment: any): comment is Comment {
    if(typeof comment !== "object") return false;

    return (
        typeof comment.id === "string"
        && comment.comment === "string"
        && comment.date === "string"
    );
}

export function isCompany(company: any): company is Company {
    if(typeof company !== "object") return false;

    if(
        typeof company.id !== "string" 
        || typeof company.imgUrl !== "string"
        || typeof company.name !== "string"
        || typeof company.description !== "string"
        || !(company.jobs instanceof Array)
        || !(company.comments instanceof Array)
    ) return false;

    for(const job of company.jobs)
        if(!isJob(job)) return false;
    
    for(const comment of company.comments)
        if(!isComment(comment)) return false;

    return true;
}

