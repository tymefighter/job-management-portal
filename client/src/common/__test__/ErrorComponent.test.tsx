import { render } from "@testing-library/react";
import ErrorComponent from "../ErrorComponent";

test("Test the message displayed in the Error Component", () => {
    const randomMessageText = "ASLDFNK;ALSNVAS;LDJFNK1238974819";

    const element = (
        <ErrorComponent
            message={randomMessageText}
        />
    );

    const {container} = render(element);

    expect(container.textContent).toMatch(/error/i);
    expect(container.textContent).toMatch(randomMessageText);
});