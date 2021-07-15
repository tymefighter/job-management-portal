import { BrowserRouter, Switch, Route } from "react-router-dom";
import { render } from "@testing-library/react";
import Footer from "../Footer";

beforeEach(() => {
    window.history.pushState(undefined, "", "/");
});

test("Footer Snapshot test", () => {
    const element = (
        <BrowserRouter>
            <div id="very-strange-test-id">
                <Footer />
            </div>
        </BrowserRouter>
    );

    const {container} = render(element);

    expect(container.querySelector("#very-strange-test-id"))
        .toMatchSnapshot("Footer Snapshot");
});

test("Footer Link test by clicking", () => {
    const companiesValue = "C_O_M_P_A_N_I_E_S";
    const jobsValue = "J_O_B_S";
    const infoValue = "I_N_F_O";
    const homeValue = "H_O_M_E";

    const element = (
        <BrowserRouter>
            <Switch>
                <Route path="/companies">{companiesValue}</Route>
                <Route path="/jobs">{jobsValue}</Route>
                <Route path="/information">{infoValue}</Route>
                <Route path="/">{homeValue}</Route>
            </Switch>
            <Footer />
        </BrowserRouter>
    );

    const {container, getByText} = render(element);

    expect(window.location.pathname).toEqual("/");
    expect(container.textContent).toContain(homeValue);

    const companiesLink = getByText("Company");
    companiesLink.click();
    expect(window.location.pathname).toEqual("/companies");
    expect(container.textContent).toContain(companiesValue);

    const jobsLink = getByText("Jobs");
    jobsLink.click();
    expect(window.location.pathname).toEqual("/jobs");
    expect(container.textContent).toContain(jobsValue);

    const infoLink = getByText("Information");
    infoLink.click();
    expect(window.location.pathname).toEqual("/information");
    expect(container.textContent).toContain(infoValue);

    const homeLink = getByText("Home");
    homeLink.click();
    expect(window.location.pathname).toEqual("/");
    expect(container.textContent).toContain(homeValue);
});