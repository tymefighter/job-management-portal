import * as express from "express";
import * as types from "./types";
import * as data from "./data";
import * as cors from "cors";

const PORT = 3000;

// Get Express Application
const app = express();

/** Middleware */

app.use(express.static("server/public"));
app.use(express.json());
app.use(cors());

/** Routes */

/** Companies */ 
app.route("/companies")
// get the list of companies
.get((req, res) => { 
    res.status(200).json(data.getCompanies());
})
// add a new company
.post((req, res) => { 
    const companyWithoutId = req.body;
    if(types.isCompanyWithoutId(companyWithoutId)) {
        const company = data.addCompany(companyWithoutId);
        res
        .setHeader("content-type", "application/json")
        .status(200)
        .json(company);
    }
    else 
        res
        .setHeader("content-type", "text/plain")
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
    const jobWithoutId = req.body;
    let job;

    if(
        types.isJobWithoutId(jobWithoutId)
        && (job = data.addJob(req.params.companyId, jobWithoutId))
    )
        res.status(200).json(job);

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

    if(
        data.editJob(
            req.params.companyId,
            req.params.jobId,
            jobEdit
        )
    ) res.status(200).end();

    else
        res
        .status(400)
        .end("Update was not successful due to errors in request")
})
.delete((req, res) => {
    if(
        data.deleteJob(
            req.params.companyId,
            req.params.jobId
        ) 
    ) res.status(200).end();

    else
        res
        .status(400)
        .end("Deletion was not successful due to errors in request")
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});