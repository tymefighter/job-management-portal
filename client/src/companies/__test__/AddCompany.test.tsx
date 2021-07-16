import { render } from "@testing-library/react"
import AddCompany from "../AddCompany";
import * as types from "../../types";
import { mockCompanies } from "./mockCompaniesTestData";
import { DispatchType } from "../../redux/thunk";
import { applyMiddleware, createStore } from "redux";
import { StateType } from "../../redux/reducer";
import thunk from "redux-thunk";
import { Action } from "../../redux/actionCreator";
import { addElement } from "../../redux/dataHelper";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const mockCompanyId = "9195481029391";

function mockImageName2url(imageName) {
    return "/" + imageName;
}

jest.mock("../../redux/thunk", () => {
    return {
        addCompany: (company: types.CompanyUser) => (dispatch: DispatchType) => {
            dispatch({type: "ADD_COMPANY", payload: "Initiate addition of a company"});
            dispatch({
                type: "ADD_COMPANY_PASSED",
                payload: {
                    id: mockCompanyId,
                    imgUrl: mockImageName2url(company.image.name),
                    name: company.name,
                    description: company.description,
                    jobs: [],
                    comments: []
                }
            });
        }
    }
});

beforeEach(() => {
    window.history.pushState(undefined, "", "/");
})

test("test the addition of a company", () => {
    const initialState: StateType = {
        companies: mockCompanies,
        companiesStatus: "LOADED"
    };

    const store = createStore((state: StateType = initialState, action: Action) => {

        if(action.type === "ADD_COMPANY_PASSED")
            return {
                ...state,
                companies: addElement(state.companies, action.payload)
            };

        else return state;

    }, applyMiddleware(thunk));

    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <AddCompany />
            </BrowserRouter>
        </Provider>
    );

    const mockCompany = {
        name: "This is a Sample Company",
        description: "This is the description of a sample company"
    };

    const mockImage = new File(["Sample Content"], "sample.txt", {
        type: "text/plain"
    });

    const {getByText, getByLabelText} = render(element);

    userEvent.type(getByLabelText(/name/i), mockCompany.name);
    userEvent.type(getByLabelText(/description/i), mockCompany.description);
    userEvent.upload(getByLabelText(/company logo/i), mockImage);

    getByText(/submit/i).click();

    const company = store
        .getState()
        .companies
        .find(company => company.id === mockCompanyId);

    expect(company.comments).toEqual([]);
    expect(company.jobs).toEqual([]);
    expect(company.name).toEqual(mockCompany.name);
    expect(company.description).toEqual(mockCompany.description);
    expect(company.imgUrl).toEqual(mockImageName2url(mockImage.name));
    expect(company.id).toEqual(mockCompanyId);

    expect(window.location.pathname).toEqual("/companies");
});

test("add company fail without image", () => {
    const initialState: StateType = {
        companies: mockCompanies,
        companiesStatus: "LOADED"
    };

    const store = createStore((state: StateType = initialState, action: Action) => {

        if(action.type === "ADD_COMPANY_PASSED")
            return {
                ...state,
                companies: addElement(state.companies, action.payload)
            };

        else return state;

    }, applyMiddleware(thunk));

    const element = (
        <Provider store={store}>
            <BrowserRouter>
                <AddCompany />
            </BrowserRouter>
        </Provider>
    );

    const mockCompany = {
        name: "This is a Sample Company",
        description: "This is the description of a sample company"
    };

    const mockImage = new File(["Sample Content"], "sample.txt", {
        type: "text/plain"
    });

    const {getByText, getByLabelText} = render(element);

    userEvent.type(getByLabelText(/name/i), mockCompany.name);
    userEvent.type(getByLabelText(/description/i), mockCompany.description);

    getByText(/submit/i).click();

    const companies = store
        .getState()
        .companies;

    companies.forEach(company => {
        expect(company.id).not.toEqual(mockCompanyId);
    });

    expect(window.location.pathname).toEqual("/");
});