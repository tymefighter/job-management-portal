import { render } from "@testing-library/react";
import LoadComponent from "../LoadComponent";

test("Test the message in the load component", () => {
    const element = (
        <LoadComponent />
    );

    const {container} = render(element);

    expect(container.textContent).toMatch(/loading/i);
});