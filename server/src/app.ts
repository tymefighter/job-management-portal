import * as express from "express";
import * as types from "./types";
import * as data from "./data";

// Get Express Application
const app = express();

/** Middleware */

app.use(express.json());

/** Routes */

/** Companies */ 
app.route("/companies")
// get the list of companies
.get((req, res) => { 
    res.status(200).json(data);
})
// add a new company
.post((req, res) => { 
    const company = req.body;
    if(types.isCompany(company)) {
        data.addCompany(company);
        res.status(200).end();
    }
    else 
        res
        .status(400)
        .end("Invalid Request Data");
})

/** Particular Company */
app.route("/companies/:companyId")
// get company with id being companyId
.get((req, res) => { 
    const company = data.getCompany(req.params.companyId);
    if(company)
        res.status(200).json(company);

    else 
        res
        .status(404)
        .end(`Company with id ${req.params.companyId} not found`);
})
// update company of company whose id is companyId
.put((req, res) => { 
    const companyEdit = req.body;
    if(
        types.isCompanyEdit(companyEdit) 
        && data.editCompany(req.params.companyId, companyEdit)
    )
        res.status(200).end();

    else 
        res
        .status(400)
        .end("Update was not successful due to errors in request");
})
.delete((req, res) => {
    if(data.deleteCompany(req.params.companyId))
        res.status(200).end();
    
    else 
        res
        .status(400)
        .end("Deletion was not successful due to errors in request");
});

/** Jobs */
app.route("/companies/:companyId/jobs")
// get jobs of company with id being companyId
.get((req, res) => { 
    const jobs = data.getJobs(req.params.companyId);

    if(jobs) res.status(200).json(jobs);

    else 
        res
        .status(404)
        .end(`Company with id ${req.params.companyId} not found`)
})
// add a new job to company having id as companyId
.post((req, res) => {
    const job = req.body;
    if(
        types.isJob(job)
        && data.addJob(req.params.companyId, job)
    )
        res.status(200).end();

    else 
        res
        .status(400)
        .end("Addition was not successful due to errors in request")
})

/** Particular Job */
app.route("/companies/:companyId/jobs/:jobId")
// get job with jobId of company with id being companyId
.get((req, res) => { 
    const job = data.getJob(req.params.companyId, req.params.jobId);

    if(job) res.status(200).json(job);

    else
        res
        .status(404)
        .end(
            `Company id ${req.params.companyId} `
            + `or Job id ${req.params.jobId} not found`
        );
})
.put((req, res) => {
    const jobEdit = req.body;
})
.delete((req, res) => {

});