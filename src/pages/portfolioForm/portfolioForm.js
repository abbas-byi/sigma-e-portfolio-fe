import React, { useState } from "react";
import Styles from "../dashboard/dashboard.module.scss";
import {
  Button,
  Header,
  Sidebar,
} from "../../components";
import { Stepper, Step } from "react-form-stepper";
import StepWizard from "react-step-wizard";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { usePortfolioForm } from "./usePortfolioForm";
import { ProtectedRoute } from "../../components/security/protectedRoute";

// Steps Components
import One from "./step1";
import Two from "./step2";
import Three from "./step3";
import Four from "./step4";
import Five from "./step5";

const PortfolioForm = () => {
  const [user, setUser] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const { portfolioDetails, handleChange, handleFileChange, removeFile } = usePortfolioForm();

  const assignUser = (val) => {
    console.log("parent receive user callback");
    console.log(val);
    setUser((user) => ({
      ...user,
      ...val,
    }));
  };

  const handleStepChange = (e) => {
    // console.log("step change");
    // console.log(e);
    setActiveStep(e.activeStep - 1);
  };

  const handleComplete = () => {
    alert("You r done. TQ");
  };

  const { handleSubmit } = usePortfolioForm();

  return (
    <ProtectedRoute>
      <div className={Styles.dashboard}>
        <Sidebar />
        <div className={Styles.main}>
          <Header pageHeading={"E-Portfolio"} />
          <div className={Styles.pageContent}>
            <div className={Styles.stepWizard}>
              <div className="d-flex align-items-center justify-content-between">
                <Stepper
                  activeStep={activeStep}
                  className="w-100 justify-content-start px-1"
                >
                  <Step
                    label="Basic Details"
                    className={`${Styles.stepView}`}
                  />
                  <Step label="Social Profiles" className={`${Styles.stepView}`} />
                  <Step label="Services" className={`${Styles.stepView}`} />
                  <Step label="Media" className={`${Styles.stepView}`} />
                  <Step label="Payments" className={`${Styles.stepView}`} />
                </Stepper>
                <Button variant={"main"} className={Styles.skipSave}>
                  Skip & Save
                </Button>
              </div>
              <form onSubmit={() => handleSubmit(portfolioDetails)}>
                <StepWizard
                  onStepChange={handleStepChange}
                  className="mt-3"
                >
                  <One
                    userCallback={assignUser}
                    portfolioDetails={portfolioDetails}
                    handleChange={handleChange}
                    handleFileChange={handleFileChange}
                  />
                  <Two
                    userCallback={assignUser}
                    portfolioDetails={portfolioDetails}
                    handleChange={handleChange}
                    handleFileChange={handleFileChange}
                    removeFile={removeFile}
                  />
                  <Three
                    userCallback={assignUser}
                    portfolioDetails={portfolioDetails}
                    handleChange={handleChange}
                    handleFileChange={handleFileChange}
                    removeFile={removeFile}
                  />
                  <Four
                    userCallback={assignUser}
                    portfolioDetails={portfolioDetails}
                    handleChange={handleChange}
                    handleFileChange={handleFileChange}
                    removeFile={removeFile}
                  />
                  <Five
                    user={user}
                    completeCallback={handleComplete}
                    portfolioDetails={portfolioDetails}
                    handleChange={handleChange}
                  />
                </StepWizard>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PortfolioForm;
