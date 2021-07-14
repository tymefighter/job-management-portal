import { connect } from "react-redux";
import { LoadStatus, StateType } from "../redux/reducer";
import * as types from "../types";
import { useParams, useRouteMatch } from "react-router-dom";
import FixedLinkButton from "../common/FixedLinkButton";
import BreadCrumb from "../common/BreadCrumb";

import  "../styles/CompanyComments.scss";

function mapStateToProps(state: StateType) {
    return {
        status: state.companiesStatus,
        companies: state.companies
    };
}

interface CompanyProps {
    status: LoadStatus;
    companies: types.Company[];
}

interface RouteParams {
    companyId: string;
    url: string;
};

function CompanyComments({status, companies}: CompanyProps) {

    const { url } = useRouteMatch();
    const { companyId } = useParams<RouteParams>();

    if(status !== "LOADED") return <div>{status}</div>;

    const company = companies.find(company => company.id === companyId);
    if(company === undefined) return <div>Invalid Company</div>

    return (
        <>
            <BreadCrumb 
                nameUrlList={[
                    {name: "company", url: "/companies"},
                    {name: company.name, url: `/companies/${company.id}`},
                    {name: "comments", url: `/companies/${company.id}/comments`}
                ]}
            />
            <div className="company-comments">
                <h1 className="company-comments__name">{company.name}</h1>
                <h2 className="company-comments__page-name">Comments</h2>
                {company.comments.map(comment => {
                    return (
                        <div key={comment.id} className="company-comments__comment">
                            <p className="company-comments__comment-item">{comment.comment}</p>
                            <p className="company-comments__date-item"> --{comment.date}</p>
                        </div>
                    );
                })}
                <FixedLinkButton to={`${url}/add-comment`}>+</FixedLinkButton>
            </div>
        </>
    );
}

export default connect(mapStateToProps)(CompanyComments);