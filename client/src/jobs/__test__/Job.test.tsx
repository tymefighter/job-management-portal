import { render } from "@testing-library/react";
import Job from "../Job";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { createStore } from "redux";
import { StateType } from "../../redux/reducer";
import { mockCompanies } from "./mockJobsTestData";
import { Action } from "../../redux/actionCreator";
import { Provider } from "react-redux";

beforeEach(() => {
    window.history.pushState(undefined, "", "/");
})

test("test rendering job information", () => {
    const initialState: StateType = {
        companies: mockCompanies,
        companiesStatus: "LOADED",
    };

    const store = createStore((state: StateType = initialState, action: Action) => {
        return state;
    });

    const companyId = "0";
    const jobId = "0";
    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/companies/:companyId/jobs/:jobId">
                        <Job />
                    </Route>
                </Switch>
                <Link to={`/companies/${companyId}/jobs/${jobId}`}>Click To Job</Link>
            </BrowserRouter>
        </Provider>
    );

    const {container, getByText} =  render(element);

    getByText("Click To Job").click();

    const job = mockCompanies
        .find(company => company.id === companyId)
        .jobs
        .find(job => job.id === jobId);

    expect(container.textContent).toContain(job.name);
    expect(container.textContent).toContain(job.description);
    expect(container.textContent).toContain(job.salary.toString());
    expect(container.textContent).toContain(job.location);
});

test("test edit link", () => {
    const initialState: StateType = {
        companies: mockCompanies,
        companiesStatus: "LOADED",
    };

    const store = createStore((state: StateType = initialState, action: Action) => {
        return state;
    });

    const companyId = "0";
    const jobId = "0";
    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/companies/:companyId/jobs/:jobId">
                        <Job />
                    </Route>
                </Switch>
                <Link to={`/companies/${companyId}/jobs/${jobId}`}>Click To Job</Link>
            </BrowserRouter>
        </Provider>
    );

    const {getByText, getByLabelText} =  render(element);

    getByText("Click To Job").click();

    const linkButton = getByLabelText("Edit Job Link");

    expect(window.location.pathname)
        .toEqual(`/companies/${companyId}/jobs/${jobId}`);
    linkButton.click();
    expect(window.location.pathname)
        .toEqual(`/companies/${companyId}/jobs/${jobId}/edit`);
});

test("test with wrong company ID", () => {
    const initialState: StateType = {
        companies: mockCompanies,
        companiesStatus: "LOADED",
    };

    const store = createStore((state: StateType = initialState, action: Action) => {
        return state;
    });

    const companyId = "123410";
    const jobId = "0";
    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/companies/:companyId/jobs/:jobId">
                        <Job />
                    </Route>
                </Switch>
                <Link to={`/companies/${companyId}/jobs/${jobId}`}>Click To Job</Link>
            </BrowserRouter>
        </Provider>
    );

    const {container, getByText} =  render(element);

    getByText("Click To Job").click();
    
    expect(container.textContent).toMatch(/error/i);
    expect(container.textContent).toMatch(/invalid company id/i);
});

test("test with wrong job ID", () => {
    const initialState: StateType = {
        companies: mockCompanies,
        companiesStatus: "LOADED",
    };

    const store = createStore((state: StateType = initialState, action: Action) => {
        return state;
    });

    const companyId = "0";
    const jobId = "9129310";
    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/companies/:companyId/jobs/:jobId">
                        <Job />
                    </Route>
                </Switch>
                <Link to={`/companies/${companyId}/jobs/${jobId}`}>Click To Job</Link>
            </BrowserRouter>
        </Provider>
    );

    const {container, getByText} =  render(element);

    getByText("Click To Job").click();
    
    expect(container.textContent).toMatch(/error/i);
    expect(container.textContent).toMatch(/invalid job id/i);
});