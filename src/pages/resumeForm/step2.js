import React from "react";
import Styles from "../dashboard/dashboard.module.scss";
import {
  Button,
  Card,
  Icon,
  Input,
  Label,
  Text,
  FileDragZone,
} from "../../components";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { useResumeForm } from "./useResumeForm";

const ActionButtons = (props) => {
  const { onHandleNext } = props;
  const handleBack = () => {
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

  const { handleSubmit } = useResumeForm();

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

const Two = (props) => {
  const { uploadFileToS3Bucket } = useResumeForm();
  const { resumeDetails, handleChange, handleFileChange, nextStep } = props;

  const handleNext = async () => {
    try {
      if (resumeDetails.bannerPhoto.length > 0) {
        await uploadFileToS3Bucket(resumeDetails.bannerPhoto, "bannerPhoto");
      }
      if (resumeDetails.profilePhoto.length > 0) {
        await uploadFileToS3Bucket(resumeDetails.profilePhoto, "profilePhoto");
      }
      nextStep();
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <Card>
      <div>
        <Label>Banner Photo/ Logo</Label>
        <FileDragZone
          onFilesSelected={(files) => handleFileChange(files, "bannerPhoto")}
          width="100%"
          height="150px"
        />
        {/*<div className={Styles.FileDropArea}>
            <p>Please Upload Your Banner Photo</p>
          <input
            name="banner"
            type="file"
            onChange={(e) => handleFileChange(e.target.files, "bannerPhoto")}
  />
        </div>*/}
      </div>
      <div className="mt-3">
        <Label>Profile Picture</Label>
        <FileDragZone
          onFilesSelected={(files) => handleFileChange(files, "profilePhoto")}
          width="100%"
          height="150px"
        />
        {/*<div className={Styles.FileDropArea}>
      <p>Please Upload Your Profile Photo</p>
      <input name="profilePhoto" type="file" onChange={(e) => handleFileChange(e.target.files, 'profilePhoto')} /> 
      </div>*/}
        <Text variant={"md"} color={"secondary"}>
          Use 400X400 size for better results
        </Text>
      </div>
      <div className="mt-3">
        <Label>Select Theme Colour</Label>
        <div className={Styles.themeSelect}>
          <input
            type="radio"
            name="theme"
            id="red"
            value="red"
            onChange={handleChange}
          />
          <label htmlFor="red" className={Styles.red}>
            Red
          </label>

          <input
            type="radio"
            name="theme"
            id="green"
            value="green"
            onChange={handleChange}
          />
          <label htmlFor="green" className={Styles.green}>
            Green
          </label>

          <input
            type="radio"
            name="theme"
            id="blue"
            value="blue"
            onChange={handleChange}
          />
          <label htmlFor="blue" className={Styles.blue}>
            Blue
          </label>
        </div>
      </div>
      <div className="mt-3">
        <Label>Custom Domain</Label>
        <Input
          type={"text"}
          placeholder={"Enter Domain"}
          onChange={handleChange}
          inputName={"customDomain"}
        />
        <Text variant={"md"} color={"secondary"}>
          Your Card Link will be:{" "}
          <Text strong={"semiBold"} color={"dark"}>
            https://
          </Text>
        </Text>
      </div>
      <div className="mt-3 border-top pt-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            onChange={handleChange}
          />
          <label class="form-check-label" for="flexSwitchCheckChecked">
            Hide Branding
          </label>
        </div>
      </div>
      <div className="mt-3">
      <p id="waitMessage"></p>
      </div>
      <ActionButtons {...props} onHandleNext={handleNext} />
    </Card>
  );
};

export default Two;
