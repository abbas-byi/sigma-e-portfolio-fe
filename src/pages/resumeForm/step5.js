import React from "react";
import { Button, Card, Icon, Input, Label } from "../../components";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { useResumeForm } from "./useResumeForm";

const ActionButtons = (props) => {

  const {onhandleFinish} = props; 

  const handleBack = (e) => {
    e.preventDefault();
    props.previousStep();
  };

  const handleFinish = (e) => {
    e.preventDefault();
    if(onhandleFinish){
      onhandleFinish();
    }else{
      props.lastStep();
    }
    // props.lastStep();
    // handleSubmit(); 
  };
  

  return (
    <div className="d-flex align-items-center justify-content-between mt-5">
      {props.currentStep > 1 && (
        <Button variant={"secondary"} onClick={handleBack}>
          <Icon className={"icon-left"} /> Prev
        </Button>
      )}
      <div className="d-flex align-items-center justify-content-between ms-auto">
        {props.currentStep === props.totalSteps && (
          <Button type="submit" variant={"primarySolid"} onClick={handleFinish}>
            Finish
          </Button>
        )}
      </div>
    </div>
  );
};

const Five = (props) => {
  const {
     resumeDetails,
      handleChange,
      lastStep,
      handleFileChange,
      removeFile,
   } = props;
   const { submitResumeDetails } = useResumeForm(); 
  const handleFinish = () => {
    lastStep();
    submitResumeDetails(resumeDetails)
   } 
  return (
    <Card>
      <div>
        <Label>Company’s Name</Label>
        <Input type={"text"} onChange={handleChange} inputName="companyName" />
      </div>
      <div className="mt-3">
        <Label>Profile</Label>
        <Input type={"text"} onChange={handleChange} inputName="userCompanyProfile" />
      </div>
      <div className="row">
        <div className="mt-3 col-lg-6">
          <Label>Start Year</Label>
          <Input type={"date"} onChange={handleChange} inputName="workingStartYear" />
        </div>
        <div className="mt-3 col-lg-6">
          <Label>End Year</Label>
          <Input type={"date"} onChange={handleChange} inputName="workingEndYear" />
        </div>
      </div>
      <div className="mt-3">
        <Label>Detail</Label>
        <Input type={"textarea"} onChange={handleChange} inputName="details" />
      </div>
      <ActionButtons {...props} onhandleFinish={handleFinish}/>
    </Card>
  );
};

export default Five;
