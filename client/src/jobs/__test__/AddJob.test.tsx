import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import AddJob from "../AddJob";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { DispatchType } from "../../redux/thunk";
import { StateType } from "../../redux/reducer";
import { mockCompanies } from "./mockJobsTestData";
import * as types from "../../types";
import { Action } from "../../redux/actionCreator";
import { Provider } from "react-redux";
import { addInnerElement } from "../../redux/dataHelper";

const mockJobId = "909090";

jest.mock("../../redux/thunk", () => {
    return {
        addJob: (companyId: string, job: types.JobWithoutId) => (dispatch: DispatchType) => {
            dispatch({type: "ADD_JOB", payload: "Initiated Adding Job"});
            dispatch({
                type: "ADD_JOB_PASSED", 
                payload: {
                    companyId,
                    job: {
                        ...job,
                        id: mockJobId
                    }
                }
            });
        }
    };
});

beforeEach(() => {
    window.history.pushState(undefined, "", "/");
})

test("test adding a job", () => {
    const initialState: StateType = {
        companies: mockCompanies,
        companiesStatus: "LOADED",
    };

    const store = createStore((state: StateType = initialState, action: Action) => {
        if(action.type === "ADD_JOB_PASSED")
            return {
                ...state,
                companies: addInnerElement(
                    state.companies, 
                    action.payload.companyId,
                    "jobs",
                    action.payload.job
                )
            };

        else return state;
    }, applyMiddleware(thunk));

    const companyId = "0";
    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/companies/:companyId/add-job">
                        <AddJob />
                    </Route>
                </Switch>
                <Link to={`/companies/${companyId}/add-job`}>Add Job</Link>
            </BrowserRouter>
        </Provider>
    );

    const newJob: types.JobWithoutId = {
        name: "A New Job", description: "the most amazing new job ever",
        salary: 1919293, location: "Mumbai, Kerala, Dubai, Bangalore, Delhi"
    };

    const {getByLabelText, getByText} = render(element);

    getByText("Add Job").click();

    userEvent.type(getByLabelText(/name/i), newJob.name);
    userEvent.type(getByLabelText(/salary/i), newJob.salary.toString());
    userEvent.type(getByLabelText(/location/i), newJob.location);
    userEvent.type(getByLabelText(/description/i), newJob.description);
    getByText("Submit").click();

    const job = store
        .getState()
        .companies
        .find(company => company.id === companyId)
        .jobs
        .find(job => job.id === mockJobId);
    
    expect(job).toEqual({...newJob, id: mockJobId});
    expect(window.location.pathname).toEqual(`/companies/${companyId}/jobs`);
});

test("testing error with invalid company id", () => {
    const initialState: StateType = {
        companies: mockCompanies,
        companiesStatus: "LOADED",
    };

    const store = createStore((state: StateType = initialState, action: Action) => state);
    const companyId = "12939910";
    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/companies/:companyId/add-job">
                        <AddJob />
                    </Route>
                </Switch>
                <Link to={`/companies/${companyId}/add-job`}>Add Job</Link>
            </BrowserRouter>
        </Provider>
    );

    const {container, getByText} = render(element);
    getByText("Add Job").click();

    expect(container.textContent).toMatch(/error/i);
    expect(container.textContent).toMatch(/invalid company id/i);
});