import { render } from "@testing-library/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import FixedLinkButton from "../FixedLinkButton";

beforeEach(() => {
    window.history.pushState(undefined, "", "/");
});

test("Test Fixed Link Button", () => {
    const initText = ";KLAJS-+DFJ7981";
    const path = "/alksjdASDF";
    const routeText = "ASLIDHFIA;OJEW21342J4;1K";
    const ariaLabel = "lkj2n4ljk12njka";
    const buttonText = "ALKSDNFlk;lk12312[]";

    const element = (
        <BrowserRouter>
            <Switch>
                <Route path={path}>{routeText}</Route>
                <Route path="/">{initText}</Route>
            </Switch>
            <FixedLinkButton to={path} aria-label={ariaLabel}>{buttonText}</FixedLinkButton>
        </BrowserRouter>
    );

    const {container, getByText} = render(element);

    expect(window.location.pathname).toEqual("/");
    expect(container.textContent).toContain(initText);

    const link = getByText(buttonText);
    expect(link.getAttribute("aria-label")).toEqual(ariaLabel);

    link.click();
    expect(window.location.pathname).toEqual(path);
    expect(container.textContent).toContain(routeText);
});
