import { render } from "@testing-library/react";
import { useTitle } from "../hooks";

beforeEach(() => {
    document.title = "";
})

test("Test useTitle hook", () => {

    const titleValue = "Simple And Nice Title";

    function SampleComponent() {
        useTitle(titleValue);

        return <div>Sample</div>;
    }

    expect(document.title).toEqual("");

    const element = <SampleComponent />;
    render(element);

    expect(document.title).toEqual(titleValue);
});