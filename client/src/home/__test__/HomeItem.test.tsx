import { render } from "@testing-library/react";
import HomeItem from "../HomeItem";

test("HomeItem props and class-list check test", () => {
    const name = "This is a name";
    const imageUrl = "/this/is/an/image/url.jpeg";
    const para = "This is a paragraph of text. It is being used as a test";
    const className = "these are a few classes which are present";

    const element = <HomeItem name={name} imageUrl={imageUrl}
        className={className}>{para}</HomeItem>;

    const {getByAltText, queryByText} = render(element);

    const image = getByAltText(name);
    expect(image.getAttribute("src")).toEqual(imageUrl);

    expect(queryByText(name)).toBeTruthy();
    expect(queryByText(para)).toBeTruthy();
});

test("HomeItem snapshot test", () => {
    const name = "This is a name";
    const imageUrl = "/this/is/an/image/url.jpeg";
    const para = "This is a paragraph of text. It is being used as a test";
    const className = "these are a few classes which are present";

    const element = <HomeItem name={name} imageUrl={imageUrl}
        className={className}>{para}</HomeItem>;

    const {container} = render(element);    

    expect(container.firstChild).toMatchSnapshot("HomeItem Snapshot");
});