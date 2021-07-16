import { render } from "@testing-library/react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import Companies from "../Companies";
import { DispatchType } from "../../redux/thunk";
import { LoadStatus, StateType } from "../../redux/reducer";
import { Action } from "../../redux/actionCreator";
import { mockCompanies } from "./mockCompaniesTestData";

jest.mock("../../redux/thunk", () => {
    return {
        getCompanies: () => (dispatch: DispatchType) => {
            dispatch({type: "GET_COMPANIES", payload: "Initiated Getting Companies"});
            dispatch({
                type: "GET_COMPANIES_PASSED", 
                payload: mockCompanies
            });
        }
    };
});

jest.mock("../../redux/actionCreator", () => {
    return {
        clearFailedStatus: () => {
            return {
                type: "CLEAR_FAILED_STATUS"
            };
        }
    };
});

beforeAll(() => {
    jest.spyOn(global, "alert");
})

beforeEach(() => {
    window.history.pushState(undefined, "", "/");
})

test("Test title", () => {
    const initialState: StateType = {
        companies: [],
        companiesStatus: "LOADING",
    };
    const store = createStore((state = initialState, action) => state);

    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <Companies />
            </BrowserRouter>
        </Provider>
    );

    expect(document.title).toEqual("");
    render(element);
    expect(document.title).toEqual("Companies");
});

test("Test companies links", () => {
    const initialState: StateType = {
        companies: mockCompanies,
        companiesStatus: "LOADED",
    };
    const store = createStore((state = initialState, action) => state);

    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/companies">
                        <Companies />
                    </Route>
                </Switch>
                <Link to="/companies">Link to Companies</Link>
            </BrowserRouter>
        </Provider>
    );

    const {getByText, getByLabelText} = render(element);

    const link = getByText("Link to Companies");

    mockCompanies.forEach(mockCompany => {
        link.click();
        expect(window.location.pathname).toEqual(`/companies`);

        getByLabelText(`Link to ${mockCompany.name}`).click();
        expect(window.location.pathname).toEqual(`/companies/${mockCompany.id}`);
    });

    link.click();
    expect(window.location.pathname).toEqual(`/companies`);

    getByLabelText("Add Company Link").click();
    expect(window.location.pathname).toEqual(`/companies/add-company`);
});

test("Test rendered Load Component JSX Element", () => {
    const initialState: StateType = {
        companies: mockCompanies,
        companiesStatus: "LOADING",
    };
    const store = createStore((state = initialState, action) => state);

    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <Companies />
            </BrowserRouter>
        </Provider>
    );

    const {container} = render(element);
    expect(container.textContent).toMatch(/loading/i);
});

test("Test rendered Error Component JSX Element", () => {
    const errorMessage = "This is an error message";
    const initialState: StateType = {
        companies: mockCompanies,
        companiesStatus: "LOADING_FAILED",
        failedOperationStatus: {
            actionType: "GET_COMPANIES_FAILED",
            message: errorMessage
        }
    };
    const store = createStore((state = initialState, action) => state);

    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <Companies />
            </BrowserRouter>
        </Provider>
    );

    const {container} = render(element);
    expect(container.textContent).toMatch(/error/i);
    expect(container.textContent).toContain(errorMessage);
});

test("Test rendered companies", async () => {
    const initialState: StateType = {
        companies: [],
        companiesStatus: "NOT_LOADED",
    };
    const store = createStore((state: StateType = initialState, action: Action) => {
        if(action.type === "GET_COMPANIES_PASSED") return {
            ...state, 
            companiesStatus: "LOADED" as LoadStatus,
            companies: action.payload
        };
        else return state;
    }, applyMiddleware(thunk));

    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <Companies />
            </BrowserRouter>
        </Provider>
    );

    const {container, getByAltText} = render(element);

    mockCompanies.forEach(company => {
        expect(getByAltText(company.name).getAttribute("src")).toEqual(company.imgUrl);
        expect(container.textContent).toContain(company.name);
        expect(container.textContent).toContain(company.description);
    });
});

test("Test operation failure alert message", () => {
    const initialState: StateType = {
        companies: [],
        companiesStatus: "LOADED",
        failedOperationStatus: {
            actionType: "ADD_COMPANY_FAILED",
            message: "Adding a Company failed"
        }
    };
    const store = createStore((state: StateType = initialState, action: Action) => {
        return state;
    });

    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <Companies />
            </BrowserRouter>
        </Provider>
    );

    render(element);

    expect(alert).toHaveBeenCalledTimes(1);

    expect(alert)
    .toHaveBeenCalledWith(
        expect.stringContaining(initialState.failedOperationStatus.message)
    );

    expect(alert)
    .toHaveBeenCalledWith(
        expect.stringContaining(initialState.failedOperationStatus.actionType)
    );
});