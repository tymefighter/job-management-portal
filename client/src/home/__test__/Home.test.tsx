import { render } from "@testing-library/react";
import Home from "../Home";

test("Home snapshot test", () => {
    const {container} = render(<Home />);

    expect(container.firstChild).toMatchSnapshot("Home Component Snapshot");
});