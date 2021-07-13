import "../styles/JobItem.scss";

interface JobItemProps {
    companyName: string;
    jobName: string;
    salary: number;
};

function JobItem({companyName, jobName, salary}: JobItemProps) {
    return (
        <div className="job-item">
            <span className="job-item__span">{jobName}</span>
            <span className="job-item__span">{companyName}</span>
            <span className="job-item__span">₹{salary}</span>
        </div>
    );
}

export default JobItem;