import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { createStore } from "redux";
import { StateType } from "../../redux/reducer";
import Company from "../Company";
import { mockCompanies } from "./mockCompaniesTestData";

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

test("test links for company component", () => {});

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