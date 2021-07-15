import { FailedOperationStatus, LoadStatus } from "./redux/reducer";
import LoadComponent from "./common/LoadComponent";
import ErrorComponent from "./common/ErrorComponent";
import { useEffect } from "react";

export function loadRenderHelper(
    companiesStatus: LoadStatus, 
    failedOperationStatus: FailedOperationStatus | undefined
) {
    switch(companiesStatus) {
        case "NOT_LOADED":
        case "LOADING":
            return <LoadComponent />;

        case "LOADED":
            return;

        case "LOADING_FAILED":
            const message = "Loading Failed: " + failedOperationStatus?.message;
            return <ErrorComponent message={message}  />
    }
}

export function useOperationFailed(
    companiesStatus: LoadStatus, 
    failedOperationStatus: FailedOperationStatus | undefined,
    clearFailedStatus: () => void
) {
    useEffect(() => {
        if(failedOperationStatus && companiesStatus !== "LOADING_FAILED") {
            alert(
                `Action ${failedOperationStatus.actionType} failed\n`
                + `Message: ${failedOperationStatus.message}`
            );
            
            clearFailedStatus();
        }
    }, [companiesStatus, failedOperationStatus]);
}