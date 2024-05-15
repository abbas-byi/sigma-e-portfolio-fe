import React from "react";
import Styles from "../dashboard/dashboard.module.scss";
import { Button, Card, Icon, Input, Label, Text,FileDragZone } from "../../components";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { usePortfolioForm } from "./usePortfolioForm";

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

const Two = (props) => {
  const { uploadFileToS3Bucket } = usePortfolioForm();
  const {
    portfolioDetails,
    handleChange,
    removeFile,
    handleFileChange,
    nextStep,
  } = props;

  const handleNext = async () => {
    try {
      if (portfolioDetails.bannerPhoto.length > 0) {
        await uploadFileToS3Bucket(portfolioDetails.bannerPhoto, "bannerPhoto");
      }
      if (portfolioDetails.profilePhoto.length > 0) {
        await uploadFileToS3Bucket(portfolioDetails.profilePhoto, "profilePhoto");
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
        onFilesSelected={(files) => handleFileChange(files, 'bannerPhoto')}
        width='100%'
        height='150px'
        id ='bannerPhoto'
        />
        {/*<Dropzone
          onChange={(files) => handleFileChange(files, "bannerImage")}
          value={portfolioDetails.bannerImage}
          name="bannerImage"
        >
          {portfolioDetails?.bannerImage?.map((file) => (
            <FileMosaic
              key={file.id}
              {...file}
              onDelete={removeFile}
              info
              preview
            />
          ))}
        </Dropzone>*/}
      </div>
      <div className="mt-3">
        <Label>Profile Picture</Label>
        <FileDragZone 
        onFilesSelected={(files) => handleFileChange(files, 'profilePhoto')}
        width='100%'
        height='150px'
        id ='profilePhoto'
        />
        {/*<Dropzone
          onChange={(files) => handleFileChange(files, "profilePhoto")}
          value={portfolioDetails.profilePhoto}
          name="profilePhoto"
        >
          {portfolioDetails?.profilePhoto?.map((file) => (
            <FileMosaic
              key={file.id}
              {...file}
              onDelete={removeFile}
              info
              preview
            />
          ))}
        </Dropzone>*/}
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
      <ActionButtons {...props} onHandleNext={handleNext} />
    </Card>
  );
};

export default Two;
