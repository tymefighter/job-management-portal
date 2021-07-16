import { render } from "@testing-library/react";
import Information from "../Information";

beforeEach(() => {
    document.title = "";
})

test("Information snapshot test", () => {
    const {container} = render(<Information />);

    expect(container.firstChild).toMatchSnapshot("Information Component Snapshot");
});

test("Information title test", () => {
    expect(document.title).toEqual("");

    render(<Information />);
    expect(document.title).toEqual("Information");
});