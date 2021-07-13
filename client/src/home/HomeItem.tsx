import "../styles/HomeItem.scss";

interface HomeItemProps {
    name: string;
    imageUrl: string;
    children: string;
    className?: string
};

function HomeItem({name, children, imageUrl, className}: HomeItemProps) {
    const divClassName = "home-item" + (className ? ` ${className}` : "");
    return (
        <div className={divClassName}>
            <img className="home-item__image" src={imageUrl} alt={name} />
            <h2 className="home-item__name">{name}</h2>
            <p className="home-item__desc">{children}</p>
        </div>
    );
}

export default HomeItem;