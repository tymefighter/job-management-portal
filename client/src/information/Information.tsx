import "../styles/Information.scss";

function Information() {
    return (
        <div className="information">
            <h1 className="information__heading">Information</h1>
            <div className="information__item">
                <h2 className="information__item-heading">Job Management Portal</h2>
                <p className="information__item-desc">
                    The Job Management Portal is an application which allows it's users
                    to store information about companies, the comments that people
                    have about them and the jobs that are being offered by the company.
                    It also allows the users to modify the data that is present by
                    editing current information such as Company logo, name, jobs, 
                    a comment about it, etc, and adding more information such as
                    companies, jobs and comments.
                </p>
            </div>
            <div className="information__item">
                <h2 className="information__item-heading">Our Vision</h2>
                <p className="information__item-desc">
                    Our vision is to provide the users with an application which helps
                    them manage easily information about companies and job opportunities, 
                    this would ultimately help them in focussing on what is more important,
                    such as interview preparation, competition information and more.
                </p>
            </div>
            <div className="information__item">
                <h2 className="information__item-heading">Our Motivation</h2>
                <p className="information__item-desc">
                    Our motivation into building this application was that we want every
                    human to never miss an important opportunity to attain success. We
                    want people to focus on what is important, and not what can be automated.
                    We want humans to be human, and the rest to be handled by automation.
                </p>
            </div>
            <div className="information__item">
                <h2 className="information__item-heading">Our Values</h2>
                <ul className="information__item-list">
                    <li>Bring Forth Opportunities</li>
                    <li>Improvise Productivity</li>
                    <li>Strength in Information</li>
                    <li>Technology is the Key Solution</li>
                    <li>Human Upliftment</li>
                </ul>
            </div>
        </div>
    );
}

export default Information;