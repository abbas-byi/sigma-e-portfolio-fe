import React from "react";
import { Button, Card, Icon, Input, Label, FileDragZone } from "../../components";
import { Dropzone, FileMosaic } from "@files-ui/react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { usePortfolioForm } from "./usePortfolioForm";

const ActionButtons = (props) => {
  const { onHandleNext } = props;

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

const Three = (props) => {
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
      if (portfolioDetails?.serviceOneImage) {
        await uploadFileToS3Bucket(portfolioDetails.serviceOneImage, "serviceOneImage");
      }
      nextStep();
      if (portfolioDetails?.serviceTwoImage) {
        await uploadFileToS3Bucket(portfolioDetails.serviceTwoImage, "serviceTwoImage");
      }
      if (portfolioDetails?.serviceThreeImage) {
        await uploadFileToS3Bucket(portfolioDetails.serviceThreeImage, "serviceThreeImage");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <Card>
      <div>
        <Label>Service One</Label>
        <FileDragZone 
        onFilesSelected={(files) => handleFileChange(files, 'serviceOneImage')}
        height="150px"
        className="mt-3"
        maxFiles={1}
        />
      </div>
      <div className="mt-3">
        <Label>Service Name</Label>
        <Input
          type={"text"}
          onChange={handleChange}
          inputName={"serviceOneName"}
        />
      </div>
      <div className="mt-3">
        <Label>Service Description</Label>
        <Input
          type={"textarea"}
          rows={4}
          onChange={handleChange}
          inputName={"serviceOneDescription"}
        />
      </div>
      <div className="mt-3">
        <Label>Service Price</Label>
        <Input
          type={"text"}
          onChange={handleChange}
          inputName={"serviceOnePrice"}
        />
      </div>
      <div className="mt-4" >
      <hr />
      </div>
      <div className="mt-4">
        <Label>Service Two</Label>
        <FileDragZone 
        onFilesSelected={(files) => handleFileChange(files, 'serviceTwoImage')}
        height="150px"
        className="mt-3"
        />
      </div>
      <div className="mt-3">
        <Label>Service Name</Label>
        <Input
          type={"text"}
          onChange={handleChange}
          inputName={"serviceTwoName"}
        />
      </div>
      <div className="mt-3">
        <Label>Service Description</Label>
        <Input
          type={"textarea"}
          rows={4}
          onChange={handleChange}
          inputName={"serviceTwoDescription"}
        />
      </div>
      <div className="mt-3">
        <Label>Service Price</Label>
        <Input
          type={"text"}
          onChange={handleChange}
          inputName={"serviceTwoPrice"}
        />
      </div>
      <div className="mt-4" >
      <hr />
      </div>
      <div className="mt-4">
        <Label>Service Three</Label>
        <FileDragZone 
        onFilesSelected={(files) => handleFileChange(files, 'serviceThreeImage')}
        height="150px"
        className="mt-3"
        />
      </div>
      <div className="mt-3">
        <Label>Service Name</Label>
        <Input
          type={"text"}
          onChange={handleChange}
          inputName={"serviceThreeName"}
        />
      </div>
      <div className="mt-3">
        <Label>Service Description</Label>
        <Input
          type={"textarea"}
          rows={4}
          onChange={handleChange}
          inputName={"serviceThreeDescription"}
        />
      </div>
      <div className="mt-3">
        <Label>Service Price</Label>
        <Input
          type={"text"}
          onChange={handleChange}
          inputName={"serviceThreePrice"}
        />
      </div>
      <ActionButtons {...props} onHandleNext={handleNext} />
    </Card>
  );
};

export default Three;
