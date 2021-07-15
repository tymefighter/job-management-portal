import { render } from "@testing-library/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "../Nav";

beforeEach(() => {
    window.history.pushState(undefined, "", "/");
});

test("Navbar Link Test", () => {
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
            <Nav />
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

test("Navbar toggle test", () => {
    const element = (
        <BrowserRouter>
            <Nav />
        </BrowserRouter>
    );

    const {container, getByText} = render(element);
    
    const toggleButton = getByText("☰");
    const homeLink = getByText("Home");
    const companyLink = getByText("Company");
    const jobsLink = getByText("Jobs");
    const infoLink = getByText("Information");
    
    expect(homeLink.style.display).toEqual("");
    expect(companyLink.style.display).toEqual("");
    expect(jobsLink.style.display).toEqual("");
    expect(infoLink.style.display).toEqual("");

    toggleButton.click();
    expect(homeLink.style.display).toEqual("none");
    expect(companyLink.style.display).toEqual("none");
    expect(jobsLink.style.display).toEqual("none");
    expect(infoLink.style.display).toEqual("none");

    toggleButton.click();
    expect(homeLink.style.display).toEqual("block");
    expect(companyLink.style.display).toEqual("block");
    expect(jobsLink.style.display).toEqual("block");
    expect(infoLink.style.display).toEqual("block");
});