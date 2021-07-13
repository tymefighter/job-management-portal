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
            </HomeItem>
            <HomeItem
                className="home-item--alternate"
                name="Add and Retrieve Multiple Companies and Jobs "
                imageUrl="images/multiple-jobs.jpeg"
                >
                Manage all your jobs at one place with our Job Management Application.
            </HomeItem>
        </div>
    );
}

export default Home;