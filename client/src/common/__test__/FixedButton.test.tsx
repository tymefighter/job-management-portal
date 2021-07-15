import { render } from "@testing-library/react";
import FixedButton from "../FixedButton";

test("Test Fixed Button", () => {
    const randomButtonText = "112asdlfna;ksdjfASDFLK";
    const ariaLabel = "iouasydifhahselraASDF";
    const onClick = jest.fn();
    const className = "these are class names";

    const element = (
        <FixedButton
            className={className}
            onClick={onClick}
            aria-label={ariaLabel}
        >{randomButtonText}</FixedButton>
    );

    const {container, getByText} = render(element);
    const button = getByText(randomButtonText);

    // Button must contain the button text
    expect(button.textContent).toContain(randomButtonText);
    
    // Button must contain all supplied CSS classes
    className.split(" ").forEach(classToken => {
        expect(button.classList).toContainEqual(classToken);
    });

    // Button must contain aria-label attribute with specified value
    expect(button.getAttribute("aria-label")).toEqual(ariaLabel);

    // Click the button should call the supplied onClick method
    button.click();
    expect(onClick).toBeCalledTimes(1);
});