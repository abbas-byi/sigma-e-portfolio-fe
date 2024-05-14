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
import { useResumeForm } from "./useResumeForm";
import { ProtectedRoute } from "../../components/security/protectedRoute";

// Steps Components
import One from "./step1";
import Two from "./step2";
import Three from "./step3";
import Four from "./step4";
import Five from "./step5";

const ResumeForm = () => {
  const [user, setUser] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const { resumeDetails, handleChange, handleFileChange, removeFile } = useResumeForm();

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

  const { handleSubmit } = useResumeForm();

  return (
    <ProtectedRoute>
      <div className={Styles.dashboard}>
        <Sidebar />
        <div className={Styles.main}>
          <Header pageHeading={"E-Resume"} />
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
                  <Step label="Home Page" className={`${Styles.stepView}`} />
                  <Step label="E-Resume" className={`${Styles.stepView}`} />
                  <Step label="Education" className={`${Styles.stepView}`} />
                  <Step label="Experience " className={`${Styles.stepView}`} />
                </Stepper>
                <Button variant={"main"} className={Styles.skipSave}>
                  Skip & Save
                </Button>
              </div>
              <form onSubmit={() => handleSubmit(resumeDetails)}>
                <StepWizard
                  onStepChange={handleStepChange}
                  className="mt-3"
                >
                  <One
                    userCallback={assignUser}
                    resumeDetails={resumeDetails}
                    handleChange={handleChange}
                  />
                  <Two
                    userCallback={assignUser}
                    resumeDetails={resumeDetails}
                    handleChange={handleChange}
                    handleFileChange={handleFileChange}
                    removeFile={removeFile}
                  />
                  <Three
                    userCallback={assignUser}
                    resumeDetails={resumeDetails}
                    handleChange={handleChange}
                    handleFileChange={handleFileChange}
                    removeFile={removeFile}
                  />
                  <Four
                    userCallback={assignUser}
                    resumeDetails={resumeDetails}
                    handleChange={handleChange}
                    handleFileChange={handleFileChange}
                    removeFile={removeFile}
                  />
                  <Five
                    user={user}
                    completeCallback={handleComplete}
                    resumeDetails={resumeDetails}
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

export default ResumeForm;
