import { Action } from "./actionCreator";
import * as types from "../types";
import * as dataHelper from "./dataHelper";

export type Theme = "DARK" | "LIGHT";

export type LoadStatus = "NOT_LOADED" | "LOADING" | "LOADED";

export interface StateType {
    companies: types.Company[],
    companiesStatus: LoadStatus,
    theme: Theme
};

const initialState: StateType = {
    companies: [],
    companiesStatus: "NOT_LOADED",
    theme: "DARK"
};

export function reducer(
    state = initialState, 
    action: Action
): StateType {
    
    switch(action.type) {
        case "GET_COMPANIES":
            return {...state, companiesStatus: "LOADING"};

        case "GET_COMPANIES_PASSED":
            return {...state, companies: action.payload, companiesStatus: "LOADED"};

        case "ADD_COMPANY_PASSED":
            return {
                ...state, 
                companies: dataHelper.addElement(
                    state.companies,
                    action.payload
                )
            };

        case "EDIT_COMPANY_PASSED":
            return {
                ...state,
                companies: dataHelper.editElement(
                    state.companies,
                    action.payload.companyId,
                    action.payload.companyEdit
                )
            };

        case "DELETE_COMPANY_PASSED":
            return {
                ...state,
                companies: dataHelper.deleteElement(
                    state.companies,
                    action.payload
                )
            };

        case "ADD_JOB_PASSED":
            return {
                ...state,
                companies: dataHelper.addInnerElement(
                    state.companies,
                    action.payload.companyId,
                    "jobs",
                    action.payload.job
                )
            };

        case "EDIT_JOB_PASSED":
            return {
                ...state,
                companies: dataHelper.editInnerElement(
                    state.companies,
                    action.payload.companyId,
                    "jobs",
                    action.payload.jobId,
                    action.payload.jobEdit
                )
            };

        case "DELETE_JOB_PASSED":
            return {
                ...state,
                companies: dataHelper.deleteInnerElement(
                    state.companies,
                    action.payload.companyId,
                    "jobs",
                    action.payload.jobId
                )
            };

        case "GET_COMPANIES_FAILED":
        case "ADD_COMPANY_FAILED":
        case "EDIT_COMPANY_FAILED":
        case "DELETE_JOB_FAILED":
        case "ADD_JOB_FAILED":
        case "EDIT_JOB_FAILED":
        case "DELETE_JOB_FAILED":
            console.log("Failure Occurred:", action.type);
            return state;

        default:
            return state;
    }
}