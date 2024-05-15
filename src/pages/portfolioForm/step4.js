import React from "react";
import { Button, Card, Icon, Input, Label, FileDragZone } from "../../components";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { usePortfolioForm } from "./usePortfolioForm";

const ActionButtons = (props) => {
  const { onHandleNext } = props; // Custom handler for the Next button

  const handleBack = (e) => {
    e.preventDefault();
    props.previousStep();
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (onHandleNext) {
      onHandleNext(); 
    } else {
      props.nextStep(); 
    }
  };

  const { handleSubmit } = usePortfolioForm();

  const handleFinish = () => {
    props.lastStep();
    handleSubmit();
  };

  return (
    <div className="d-flex align-items-center justify-content-between mt-5">
      {props.currentStep > 1 && (
        <Button variant={"secondary"} onClick={handleBack}>
          <Icon className={"icon-left"} /> Prev
        </Button>
      )}
      <div className="d-flex align-items-center justify-content-between ms-auto">
        {props.currentStep < props.totalSteps && (
          <Button type="submit" variant={"primary"} onClick={handleNext}>
            Next <Icon className={"icon-right"} />
          </Button>
        )}
        {props.currentStep === props.totalSteps && (
          <Button type="submit" variant={"primarySolid"} onClick={handleFinish}>
            Finish{" "}
          </Button>
        )}
      </div>
    </div>
  );
};

const Four = (props) => {
  const { uploadFileToS3Bucket } = usePortfolioForm();
  const {
    portfolioDetails,
    handleChange,
    handleFileChange,
    removeFile,
    nextStep,
  } = props;

  const handleNext = async () => {
    try {
      if (portfolioDetails.certificate.length > 0) {
        await uploadFileToS3Bucket(portfolioDetails.certificate, "certificate");
      }
      nextStep();
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };


  return (
    <Card>
      <div>
        <Label>Course Name</Label>
        <Input type={"text"} onChange={handleChange} inputName="courseName" />
      </div>
      <div className="mt-3">
        <Label>University/School Name</Label>
        <Input type={"text"} onChange={handleChange} inputName="universityName" />
      </div>
      <div className="row">
        <div className="mt-3 col-sm-6">
          <Label>Start Year</Label>
          <Input type={"date"} rows={3} onChange={handleChange} inputName="courseStartYear" />
        </div>
        <div className="mt-3 col-sm-6">
          <Label>End Year</Label>
          <Input type={"date"} rows={3} onChange={handleChange} inputName="courseEndYear" />
        </div>
      </div>
      <div className="mt-3">
        <Label>Percentage</Label>
        <Input type={"number"} onChange={handleChange} inputName="percentage" />
      </div>
      <div className="mt-3">
        <Label>Certificate</Label>
        {/*<Dropzone
          onChange={(files) => handleFileChange(files, "certificate")}
          value={portfolioDetails.certificate}
          name="certificate"
        >
          {portfolioDetails?.certificate?.map((file) => (
            <FileMosaic
              key={file.id}
              {...file}
              onDelete={removeFile}
              info
              preview
            />
          ))}
        </Dropzone>*/}
        <FileDragZone 
        onFilesSelected = {(files) => handleFileChange(files, 'certificate')}
        />
      </div>
      <ActionButtons {...props} onHandleNext={handleNext} />
    </Card>
  );
};

export default Four;
