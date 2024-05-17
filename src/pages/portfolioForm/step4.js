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
      if (portfolioDetails.videos.length > 0) {
        await uploadFileToS3Bucket(portfolioDetails.videos, "videos");
      }if (portfolioDetails.galleryImages.length > 0) {
        await uploadFileToS3Bucket(portfolioDetails.galleryImages, "galleryImages");
      }
      nextStep();
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };


  return (
    <Card>
      <div className="mt-3">
        <Label >Videos</Label>
        <FileDragZone 
        onFilesSelected = {(files) => handleFileChange(files, 'videos')}
        height="200px"
        maxFiles={3}
        />
      </div>
      <div className="mt-3">
        <Label>Gallery Images</Label>
        <FileDragZone 
        onFilesSelected = {(files) => handleFileChange(files, 'galleryImages')}
        height="200px"
        maxFiles={6}
        />
      </div>
      <ActionButtons {...props} onHandleNext={handleNext} />
    </Card>
  );
};

export default Four;
