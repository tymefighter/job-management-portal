import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { createStore } from "redux";
import { StateType } from "../../redux/reducer";
import Company from "../Company";
import { mockCompanies } from "./mockCompaniesTestData";

beforeEach(() => {
    window.history.pushState(undefined, "", "/");
})

test("test rendering of company information", () => {
    const initialState: StateType = {
        companies: mockCompanies,
        companiesStatus: "LOADED"
    };
    const store = createStore((state: StateType = initialState, action) => state);

    const companyId = "0";
    const company = mockCompanies.find(company => company.id === companyId);
    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/companies/:companyId">
                        <Company />
                    </Route>
                </Switch>
                <Link to={`/companies/${companyId}`}>Click To View Company</Link>
            </BrowserRouter>
        </Provider>
    );

    const {container, getByText, getByAltText} = render(element);

    getByText("Click To View Company").click();

    expect(getByAltText(company.name).getAttribute("src")).toEqual(company.imgUrl);
    expect(container.textContent).toContain(company.name);
    expect(container.textContent).toContain(company.description);
});

test("test links for company component", () => {
    const initialState: StateType = {
        companies: mockCompanies,
        companiesStatus: "LOADED"
    };
    const store = createStore((state: StateType = initialState, action) => state);

    const companyId = "0";
    const companyPath = `/companies/${companyId}`;
    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/companies/:companyId">
                        <Company />
                    </Route>
                </Switch>
                <Link to={companyPath}>
                    Click To View Company
                </Link>
            </BrowserRouter>
        </Provider>
    );

    const {getByLabelText, getByText} = render(element);

    const linkButton = getByText("Click To View Company");

    linkButton.click();
    expect(window.location.pathname).toEqual(companyPath);
    getByText(/jobs/i).click();
    expect(window.location.pathname).toEqual(`/companies/${companyId}/jobs`);

    linkButton.click();
    expect(window.location.pathname).toEqual(companyPath);
    getByText(/comments/i).click();
    expect(window.location.pathname).toEqual(`/companies/${companyId}/comments`);
});

test("test with wrong company id", () => {
    const initialState: StateType = {
        companies: mockCompanies,
        companiesStatus: "LOADED"
    };
    const store = createStore((state: StateType = initialState, action) => state);

    const companyId = "91923904";
    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/companies/:companyId">
                        <Company />
                    </Route>
                </Switch>
                <Link to={`/companies/${companyId}`}>
                    Click To View Company
                </Link>
            </BrowserRouter>
        </Provider>
    );

    const {container, getByText} = render(element);

    getByText("Click To View Company").click();

    expect(container.textContent).toMatch(/error/i);
    expect(container.textContent).toMatch(/invalid company id/i);
});