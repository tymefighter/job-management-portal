import * as express from "express";
import * as bodyParser from "body-parser";
import * as types from "./types";
import * as data from "./data";

// Get Express Application
const app = express();

/** Middleware */

app.use(bodyParser.json());

/** Routes */

/** Companies */ 
app.route("/companies")
// get the list of companies
.get((req, res) => { 
    res
        .status(200)
        .json(data);
})
// add a new company
.post((req, res) => { 
    const company = req.body;
    if(types.isCompany(company)) {

    }
    else 
        res
            .status(400)
            .end("Invalid Request Data");
})
// operation not supported
.put((req, res) => { 

});

/** Particular Company */
app.route("/companies/:companyId")
// get company with id being companyId
.get((req, res) => { 

})
// operation not supported
.post((req, res) => { 

})
// update company of company whose id is companyId
.put((req, res) => { 

})
.delete((req, res) => {

});

/** Jobs */
app.route("/companies/:companyId/jobs")
// get jobs of company with id being companyId
.get((req, res) => { 

})
// add a new job to company having id as companyId
.post((req, res) => { 

})
// operation not supported
.put((req, res) => { 

});

/** Particular Job */
app.route("/companies/:companyId/jobs/:jobId")
// get jobs of company with id being companyId
.get((req, res) => { 

})
// add a new job to company having id as companyId
.post((req, res) => { 

})
// operation not supported
.put((req, res) => { 

})
.delete((req, res) => {

});