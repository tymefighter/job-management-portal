import { Provider } from "react-redux";
import JobEdit from "../JobEdit";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { StateType } from "../../redux/reducer";
import { mockCompanies } from "./mockJobsTestData";
import * as types from "../../types";
import { DispatchType } from "../../redux/thunk";
import { Action } from "../../redux/actionCreator";
import { editInnerElement } from "../../redux/dataHelper";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("../../redux/thunk", () => {
    return {
        editJob: (
            companyId: string, 
            jobId: string,
            jobEdit: types.JobEdit
        ) => (dispatch: DispatchType) => {
            dispatch({
                type: "EDIT_JOB", 
                payload: "Initiated Editing Job"
            });
            dispatch({
                type: "EDIT_JOB_PASSED",
                payload: {
                    companyId,
                    jobId,
                    jobEdit
                }
            });
        },
        deleteJob: (
            companyId: string, jobId: string
        ) => (dispatch: DispatchType) => {
            dispatch({
                type: "DELETE_JOB", 
                payload: "Initiated Deleting Job"
            });
            dispatch({
                type: "DELETE_JOB_PASSED",
                payload: {companyId, jobId}
            });
        }
    };
});

test("test editing job information", () => {
    const initialState: StateType = {
        companies: mockCompanies,
        companiesStatus: "LOADED"
    };
    const store = createStore((
        state: StateType = initialState, 
        action: Action
    ) => {
        if(action.type === "EDIT_JOB_PASSED")
            return  {
                ...state,
                companies: editInnerElement(
                    state.companies,
                    action.payload.companyId,
                    "jobs",
                    action.payload.jobId,
                    action.payload.jobEdit
                )
            };

        else return state;
    }, applyMiddleware(thunk));

    const companyId = "0";
    const jobId = "0";
    const jobEdit: types.JobEdit = {
        name: "Brand New Job Name",
        description: "A whole new job description",
        salary: 1923124513919,
        location: "Mumbai, Pune, Bangalore, Delhi, Dubai, Kerala"
    };

    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/companies/:companyId/jobs/:jobId/edit">
                        <JobEdit />
                    </Route>
                </Switch>
                <Link to={`/companies/${companyId}/jobs/${jobId}/edit`}>
                    Job Edit Link
                </Link>
            </BrowserRouter>
        </Provider>
    );

    const {getByText, getByLabelText} = render(element);

    getByText("Job Edit Link").click();

    const nameInput = getByLabelText(/name/i);
    userEvent.clear(nameInput)
    userEvent.type(nameInput, jobEdit.name);
    
    const salaryInput = getByLabelText(/salary/i);
    userEvent.clear(salaryInput);
    userEvent.type(salaryInput, jobEdit.salary.toString());

    const locationInput = getByLabelText(/location/i);
    userEvent.clear(locationInput);
    userEvent.type(locationInput, jobEdit.location);

    const descriptionInput = getByLabelText(/description/i);
    userEvent.clear(descriptionInput);
    userEvent.type(descriptionInput, jobEdit.description);

    getByText(/submit/i).click();

    const jobInState = store
        .getState()
        .companies
        .find(company => company.id === companyId)
        .jobs
        .find(job => job.id === jobId);

    expect(jobInState.name).toEqual(jobEdit.name);
    expect(jobInState.salary).toEqual(jobEdit.salary);
    expect(jobInState.location).toEqual(jobEdit.location);
    expect(jobInState.description).toEqual(jobEdit.description);

    expect(window.location.pathname).toEqual(`/companies/${companyId}/jobs/`);
});

test("test deleting a job", () => {


});

test("test with wrong company id", () => {

});

test("test with wrong job id", () => {

});