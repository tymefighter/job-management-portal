import { render } from "@testing-library/react";
import Home from "../Home";

beforeEach(() => {
    document.title = "";
})

test("Home snapshot test", () => {
    const {container} = render(<Home />);

    expect(container.firstChild).toMatchSnapshot("Home Component Snapshot");
});

test("Home title test", () => {
    expect(document.title).toEqual("");

    render(<Home />);
    expect(document.title).toEqual("Home");
});