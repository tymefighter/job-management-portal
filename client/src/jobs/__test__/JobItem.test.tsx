import { render } from "@testing-library/react";
import JobItem from "../JobItem";

test("JobItem content test", () => {
    const companyName = "This is a company name";
    const jobName = "This is a job name";
    const salary = 19384109823748;

    const {container} = render(
        <JobItem
            companyName={companyName} jobName={jobName}
            salary={salary}
        />
    );

    expect(container.textContent).toContain(companyName);
    expect(container.textContent).toContain(jobName);
    expect(container.textContent).toContain(salary);
});

test("JobItem snapshot test", () => {
    const companyName = "This is a company name";
    const jobName = "This is a job name";
    const salary = 19384109823748;

    const {container} = render(
        <JobItem
            companyName={companyName} jobName={jobName}
            salary={salary}
        />
    );

    expect(container).toMatchSnapshot("JobItem Component Snapshot");
});