import React from "react";
import Styles from "./portfolio.module.scss";
import { Button, Card, Header, Icon, Sidebar, Text, Image } from "../../components";
import { usePortfolio } from "./usePortfolio";
import { ProtectedRoute } from "../../components/security/protectedRoute";
import { useNavigate } from "react-router-dom";
import { useGetPortfolioDetails } from "./useGetPortfolioDetails";

const Portfolio = () => {
  const navigate = useNavigate();
  const ToPortfolio = () => navigate("/portfolio/new-portfolio");
  const viewPortfolio = () => navigate("/portfolio/view-portfolio");
  const { userDetails } = usePortfolio();
  const userId = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('token');
  const { portfolioDetails } = useGetPortfolioDetails(token, userId);

  return (
    <ProtectedRoute>
      <div className={Styles.dashboard}>
        <Sidebar />
        <div className={Styles.main}>
          <Header pageHeading={"Portfolio"} />
          <div className={Styles.cardGrid}>
            {portfolioDetails ? (
              <Card className={Styles.detailCard}>
                <div className={Styles.row}>
                  <div className={Styles.leftCol}>
                    <Text strong={"medium"}>User Details</Text>
                    <Text color={"secondary"}>{userDetails.username}</Text>
                    <Text color={"secondary"}>{userDetails.number}</Text>
                    <Text color={"secondary"}>{userDetails.email}</Text>
                  </div>
                  <div className={Styles.rightCol}>
                    <Image src="./images/avatar.png" />
                  </div>
                </div>
                <div className={`${Styles.btns} d-flex align-items-center`}>
                  <Button>
                    <Icon className={"icon-edit"} /> Edit
                  </Button>
                  <Button onClick={viewPortfolio}>
                    <Icon className={"icon-view"} /> View
                  </Button>
                  <Button>
                    <Icon className={"icon-share"} /> Share
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className={Styles.card} onClick={ToPortfolio}>
                <Icon className={"icon-plus"} />
                <Text>Create New Portfolio</Text>
              </Card>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Portfolio;
