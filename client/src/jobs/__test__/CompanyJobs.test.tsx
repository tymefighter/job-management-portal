import { render } from "@testing-library/react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { createStore } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import CompanyJobs from "../CompanyJobs";
import { LoadStatus, StateType } from "../../redux/reducer";
import { Action } from "../../redux/actionCreator";
import { mockCompanies } from "./mockJobsTestData";

beforeEach(() => {
    window.history.pushState(undefined, "", "/");
});

test("Test rendered jobs", () => {
    const initialState: StateType = {
        companies: mockCompanies,
        companiesStatus: "LOADED"
    };
    const store = createStore((state: StateType = initialState, action) => state);

    const companyId = "0";
    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/companies/:companyId/jobs">
                        <CompanyJobs />
                    </Route>
                </Switch>
                <Link to={`/companies/${companyId}/jobs`}>Company Jobs</Link>
            </BrowserRouter>
        </Provider>
    );

    const {container, getByText} = render(element);

    getByText("Company Jobs").click();

    const jobs = mockCompanies
        .find(company => company.id === companyId)
        .jobs;

    jobs.forEach(job => {
        expect(container.textContent).toContain(job.name);
        expect(container.textContent).toContain(job.salary.toString());
    });
});

test("Test rendered job links", () => {
    const initialState: StateType = {
        companies: mockCompanies,
        companiesStatus: "LOADED"
    };
    const store = createStore((state: StateType = initialState, action) => state);

    const companyId = "0";
    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/companies/:companyId/jobs">
                        <CompanyJobs />
                    </Route>
                </Switch>
                <Link to={`/companies/${companyId}/jobs`}>Company Jobs</Link>
            </BrowserRouter>
        </Provider>
    );

    const {container, getByText} = render(element);

    getByText("Company Jobs").click();

    const jobs = mockCompanies
        .find(company => company.id === companyId)
        .jobs;

    jobs.forEach(job => {
        expect(container.textContent).toContain(job.name);
        expect(container.textContent).toContain(job.salary.toString());
    });
});

test("Test job links", () => {
    const initialState: StateType = {
        companies: mockCompanies,
        companiesStatus: "LOADED"
    };
    const store = createStore((state: StateType = initialState, action) => state);

    const companyId = "0";
    const companyLink = `/companies/${companyId}/jobs`;
    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/companies/:companyId/jobs">
                        <CompanyJobs />
                    </Route>
                </Switch>
                <Link to={companyLink}>Company Jobs</Link>
            </BrowserRouter>
        </Provider>
    );

    const {getByLabelText, getByText} = render(element);
    const linkButton = getByText("Company Jobs");

    const jobs = mockCompanies
        .find(company => company.id === companyId)
        .jobs;

    jobs.forEach(job => {
        linkButton.click();
        expect(window.location.pathname).toEqual(companyLink);

        getByLabelText(`Link to Job ${job.name}`).click()
        expect(window.location.pathname)
            .toEqual(`/companies/${companyId}/jobs/${job.id}`);
    });
});

test("Test with wrong company id", () => {
    const initialState: StateType = {
        companies: mockCompanies,
        companiesStatus: "LOADED"
    };
    const store = createStore((state: StateType = initialState, action) => state);

    const companyId = "912930";
    const companyLink = `/companies/${companyId}/jobs`;
    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/companies/:companyId/jobs">
                        <CompanyJobs />
                    </Route>
                </Switch>
                <Link to={companyLink}>Company Jobs</Link>
            </BrowserRouter>
        </Provider>
    );

    const {getByText, container} = render(element);

    getByText("Company Jobs").click();

    expect(container.textContent).toMatch(/error/i);
    expect(container.textContent).toMatch(/invalid company id/i);
});

