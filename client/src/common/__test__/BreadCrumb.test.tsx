import { render } from "@testing-library/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BreadCrumb from "../BreadCrumb";

beforeEach(() => {
    window.history.pushState(undefined, "", "/");
});

test("Test Bread Crumb Text and Links using a Router", () => {
    const element = (
        <BrowserRouter>
            <Switch>
                <Route path="/a">A</Route>
                <Route path="/b">B</Route>
                <Route path="/c">C</Route>
                <Route path="/">Home</Route>
            </Switch>

            <BreadCrumb 
                nameUrlList={[
                    {name: "click-a", url: "/a"},
                    {name: "click-b", url: "/b"},
                    {name: "click-c", url: "/c"}
                ]}
            />
        </BrowserRouter>
    );

    const {container, getByText} = render(element);

    expect(window.location.pathname).toBe("/");
    expect(container.textContent).toMatch("Home");

    getByText("click-a").click();
    expect(window.location.pathname).toBe("/a");
    expect(container.textContent).toMatch("A");

    getByText("click-b").click();
    expect(window.location.pathname).toBe("/b");
    expect(container.textContent).toMatch("B");

    getByText("click-c").click();
    expect(window.location.pathname).toBe("/c");
    expect(container.textContent).toMatch("C");
});