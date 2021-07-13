import HomeItem from "./HomeItem";

import "../styles/Home.scss";
import "../styles/HomeItem.scss";

function Home() {
    return (
        <div className="home">
            <HomeItem
                name="Job Management"
                imageUrl="images/job-management.jpg"
            >
                Manage all your jobs at one place with our Job Management Application.
                This application allows you to add, delete and edit companies and jobs
                as you like, while providing you with an amazing user experience.
            </HomeItem>
            <HomeItem
                className="home-item--alternate"
                name="Manage Many Jobs "
                imageUrl="images/multiple-jobs.jpeg"
            >
                This application allows you to keep information about many jobs secure
                at one place. This helps you to view all relevant information at your 
                convenience. This helps you improve upon your job archive and hence 
                your ability to pursue them.
            </HomeItem>
            <HomeItem
                name="Manage Many Companies"
                imageUrl="images/multiple-companies.jpeg"
            >
                Manage all the companies and their job posting at this one place.
                This helps you optimize your information retrieval and storage,
                and hence helps you focus on important things such as competitor
                companies.
            </HomeItem>
        </div>
    );
}

export default Home;