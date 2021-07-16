import { render } from "@testing-library/react";
import CompanyCard from "../CompanyCard";

test("test provided information in company card", () => {
    const imgUrl = "/this/is/an/image/url.png";
    const name = "This is the company's name";
    const description = "This is the company description";

    const element = (
        <CompanyCard 
            imgUrl={imgUrl} name={name} description={description}
        />
    );

    const {getByAltText, queryByText} = render(element);

    expect(getByAltText(name).getAttribute("src")).toEqual(imgUrl);
    expect(queryByText(name)).toBeTruthy();
    expect(queryByText(description)).toBeTruthy();
});

test("company card snapshot test", () => {
    const imgUrl = "/this/is/an/image/url.png";
    const name = "This is the company's name";
    const description = "This is the company description";

    const element = (
        <CompanyCard 
            imgUrl={imgUrl} name={name} description={description}
        />
    );

    const {container} = render(element);

    expect(container).toMatchSnapshot("CompanyCard Component snapshot");
});