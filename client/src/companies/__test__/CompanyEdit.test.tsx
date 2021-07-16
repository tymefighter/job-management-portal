import { render } from "@testing-library/react"
import CompanyEdit from "../CompanyEdit";
import * as types from "../../types";
import { mockCompanies } from "./mockCompaniesTestData";
import { DispatchType } from "../../redux/thunk";
import { applyMiddleware, createStore } from "redux";
import { StateType } from "../../redux/reducer";
import thunk from "redux-thunk";
import { Action } from "../../redux/actionCreator";
import { deleteElement, editElement } from "../../redux/dataHelper";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import userEvent from "@testing-library/user-event";

jest.mock("../../redux/thunk", () => {
    return {
        editCompany: (
            companyId: string, 
            companyEdit: types.CompanyEdit
        ) => (dispatch: DispatchType) => {
            dispatch({type: "EDIT_COMPANY", payload: "Initiate edit company"});
            dispatch({
                type: "EDIT_COMPANY_PASSED",
                payload: {
                    companyId,
                    companyEdit
                }
            });
        },
        deleteCompany: (
            companyId: string
        ) => (dispatch: DispatchType) => {
            dispatch({type: "DELETE_COMPANY", payload: "Initiate delete company"});
            dispatch({
                type: "DELETE_COMPANY_PASSED",
                payload: companyId
            });
        }
    };
});

beforeEach(() => {
    window.history.pushState(undefined, "", "/");
});

test("test editing the company", () => {
    const initialState: StateType = {
        companies: mockCompanies,
        companiesStatus: "LOADED"
    };
    const store = createStore((state: StateType = initialState, action: Action) => {
        if(action.type === "EDIT_COMPANY_PASSED")
            return {
                ...state,
                companies: editElement(
                    state.companies, 
                    action.payload.companyId,
                    action.payload.companyEdit
                )
            };
        else return state;
    }, applyMiddleware(thunk));

    const companyId = "0";
    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/companies/:companyId">
                        <CompanyEdit />
                    </Route>
                </Switch>
                <Link to={`/companies/${companyId}`}>
                    Click to Edit Company
                </Link>
            </BrowserRouter>
        </Provider>
    );

    const companyEdit: types.CompanyEdit = {
        name: "New Company Name",
        description: "New Company Description"
    };

    const {getByText, getByLabelText} = render(element);

    getByText("Click to Edit Company").click();

    const nameInput = getByLabelText(/name/i);
    userEvent.clear(nameInput);
    userEvent.type(nameInput, companyEdit.name);

    const descriptionInput = getByLabelText(/description/i);
    userEvent.clear(descriptionInput);
    userEvent.type(descriptionInput, companyEdit.description);

    getByText(/submit/i).click();

    const company = store
        .getState()
        .companies
        .find(company => company.id === companyId);

    expect(company.name).toEqual(companyEdit.name);
    expect(company.description).toEqual(companyEdit.description);

    expect(window.location.pathname).toEqual(`/companies`);
});

test("test deleting the company", () => {
    const initialState: StateType = {
        companies: mockCompanies,
        companiesStatus: "LOADED"
    };
    const store = createStore((state: StateType = initialState, action: Action) => {
        if(action.type === "DELETE_COMPANY_PASSED")
            return {
                ...state,
                companies: deleteElement(
                    state.companies, 
                    action.payload
                )
            };
        else return state;
    }, applyMiddleware(thunk));

    const companyId = "0";
    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/companies/:companyId">
                        <CompanyEdit />
                    </Route>
                </Switch>
                <Link to={`/companies/${companyId}`}>
                    Click to Edit Company
                </Link>
            </BrowserRouter>
        </Provider>
    );

    const company = mockCompanies.find(company => company.id === companyId);
    
    const {getByText, getByLabelText} = render(element);

    getByText("Click to Edit Company").click();

    const companiesBeforeDelete = store
        .getState()
        .companies;
    expect(companiesBeforeDelete).toContainEqual(company);

    getByLabelText("Delete Company Button").click();

    const companiesAfterDelete = store
        .getState()
        .companies;
    expect(companiesAfterDelete).not.toContainEqual(company);

    expect(window.location.pathname).toEqual(`/companies`);
});

test("test with invalid company id", () => {

});