import { render } from "@testing-library/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import Jobs from "../Jobs";
import { DispatchType } from "../../redux/thunk";
import { LoadStatus, StateType } from "../../redux/reducer";
import { Action } from "../../redux/actionCreator";
import { mockCompanies, mockJobs } from "./mockJobsTestData";

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
                <Jobs />
            </BrowserRouter>
        </Provider>
    );

    expect(document.title).toEqual("");
    render(element);
    expect(document.title).toEqual("All Jobs");
});

test("Test job links", () => {
    const initialState: StateType = {
        companies: mockCompanies,
        companiesStatus: "LOADED",
    };
    const store = createStore((state = initialState, action) => state);

    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <Jobs />
            </BrowserRouter>
        </Provider>
    );

    expect(window.location.pathname).toEqual("/");
    const {getByLabelText} = render(element);

    mockCompanies.forEach(mockCompany => {
        mockCompany.jobs.forEach(mockJob => {
            const link = 
                getByLabelText(`Link to Job ${mockJob.name} of ${mockCompany.name}`);

            link.click();
            expect(window.location.pathname)
                .toEqual(`/companies/${mockCompany.id}/jobs/${mockJob.id}`);
        })
    });
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
                <Jobs />
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
                <Jobs />
            </BrowserRouter>
        </Provider>
    );

    const {container} = render(element);
    expect(container.textContent).toMatch(/error/i);
    expect(container.textContent).toContain(errorMessage);
});

test("Test rendered jobs", async () => {
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
                <Jobs />
            </BrowserRouter>
        </Provider>
    );

    const {container} = render(element);

    mockCompanies.forEach(mockCompany => {
        mockCompany.jobs.forEach(mockJob => {
            expect(container.textContent).toContain(mockJob.name);
            expect(container.textContent).toContain(mockCompany.name);
            expect(container.textContent).toContain(mockJob.salary);
        })
    });
});

test("Test operation failure alert message", () => {
    const initialState: StateType = {
        companies: [],
        companiesStatus: "LOADED",
        failedOperationStatus: {
            actionType: "ADD_JOB_FAILED",
            message: "Adding a Job failed"
        }
    };
    const store = createStore((state: StateType = initialState, action: Action) => {
        return state;
    });

    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <Jobs />
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