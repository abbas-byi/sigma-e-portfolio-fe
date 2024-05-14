import React from "react";
import Styles from "./resume.module.scss";
import { Button, Card, Header, Icon, Sidebar, Text, Image } from "../../components";
import { useResume } from "./useResume";
import { ProtectedRoute } from "../../components/security/protectedRoute";
import { useNavigate } from "react-router-dom";

const Resume = () => {
  const navigate = useNavigate();
  const ToResume = () => navigate("/resume/new-resume");
  const viewResume = () => navigate("/resume/view-resume")
  const { userDetails } = useResume();

  return (
    <ProtectedRoute>
      <div className={Styles.dashboard}>
        <Sidebar />
        <div className={Styles.main}>
          <Header pageHeading={"Resume"} />
          <div className={Styles.cardGrid}>
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
                <Button onClick={viewResume}>
                  <Icon className={"icon-view"} /> View
                </Button>
                <Button>
                  <Icon className={"icon-share"} /> Share
                </Button>
              </div>
            </Card>
            <Card className={Styles.card} onClick={ToResume}>
              <Icon className={"icon-plus"} />
              <Text>Create New Resume</Text>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Resume;
