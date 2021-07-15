import { Action } from "./actionCreator";
import * as types from "../types";
import * as dataHelper from "./dataHelper";
import { ActionType } from "./actionTypes";

export type Theme = "DARK" | "LIGHT";

export type LoadStatus = "NOT_LOADED" | "LOADING" | "LOADED" | "LOADING_FAILED";

export interface FailedOperationStatus {
    actionType: ActionType;
    message: string;
};

export interface StateType {
    companies: types.Company[];
    companiesStatus: LoadStatus;
    failedOperationStatus?: FailedOperationStatus;
    theme: Theme;
};

const initialState: StateType = {
    companies: [],
    companiesStatus: "NOT_LOADED",
    theme: "DARK"
};

function logReducerInfo(actionType: ActionType, info: string) {
    console.log(`Reducer - Action: ${actionType}, Info: ${info}`);
}

export function reducer(
    state = initialState, 
    action: Action
): StateType {
    
    switch(action.type) {
        case "GET_COMPANIES":
            logReducerInfo(action.type, action.payload);
            return {...state, companiesStatus: "LOADING"};

        case "GET_COMPANIES_PASSED":
            logReducerInfo(action.type, "Getting Companies Passed");
            return {...state, companies: action.payload, companiesStatus: "LOADED"};

        case "ADD_COMPANY_PASSED":
            logReducerInfo(action.type, "Adding Company Passed");
            return {
                ...state, 
                companies: dataHelper.addElement(
                    state.companies,
                    action.payload
                )
            };

        case "EDIT_COMPANY_PASSED":
            logReducerInfo(action.type, "Edit Company Passed");
            return {
                ...state,
                companies: dataHelper.editElement(
                    state.companies,
                    action.payload.companyId,
                    action.payload.companyEdit
                )
            };

        case "DELETE_COMPANY_PASSED":
            logReducerInfo(action.type, "Delete Company Passed");
            return {
                ...state,
                companies: dataHelper.deleteElement(
                    state.companies,
                    action.payload
                )
            };

        case "ADD_JOB_PASSED":
            logReducerInfo(action.type, "Add Job Passed");
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
            logReducerInfo(action.type, "Edit Job Passed");
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
            logReducerInfo(action.type, "Delete Job Passed");
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
            logReducerInfo(action.type, action.payload);
            return {
                ...state,
                companiesStatus: "LOADING_FAILED",
                failedOperationStatus: {
                    actionType: action.type,
                    message: action.payload
                }
            };

        case "ADD_COMPANY_FAILED":
        case "EDIT_COMPANY_FAILED":
        case "DELETE_JOB_FAILED":
        case "ADD_JOB_FAILED":
        case "EDIT_JOB_FAILED":
        case "DELETE_JOB_FAILED":
            logReducerInfo(action.type, action.payload);
            return {
                ...state, 
                failedOperationStatus: {
                    actionType: action.type,
                    message: action.payload 
                }
            };

        case "ADD_COMPANY":
        case "EDIT_COMPANY":
        case "DELETE_JOB":
        case "ADD_JOB":
        case "EDIT_JOB":
        case "DELETE_JOB":
            logReducerInfo(action.type, action.payload);
            return state;

        case "CLEAR_FAILED_STATUS":
            logReducerInfo(action.type, "Clearing Failed Status");
            return {
                ...state,
                failedOperationStatus: undefined
            };

        default:
            return state;
    }
}