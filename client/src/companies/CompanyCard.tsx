import "../styles/CompanyCard.scss";

interface CompanyCardProps {
    imgUrl: string;
    name: string;
    description: string;
};

function CompanyCard({imgUrl, name, description}: CompanyCardProps) {
    return (
        <div className="company-card">
            <img className="company-card__img" src={imgUrl} alt={name} />
            <h2 className="company-card__name">{name}</h2>
            <p className="company-card__para">{description}</p>
        </div>
    );
}

export default CompanyCard;