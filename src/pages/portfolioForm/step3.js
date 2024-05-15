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
      if (portfolioDetails.introVideo.length > 0) {
        await uploadFileToS3Bucket(portfolioDetails.introVideo, "introVideo");
      }
      if (portfolioDetails.achievements.length > 0) {
        await uploadFileToS3Bucket(portfolioDetails.achievements, "achievements");
      }
      nextStep();
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const techLanguagesOptios = [
    { label: "JavaScript", value: "javascript" },
    { label: "React JS", value: "react_js" },
    { label: "Node JS", value: "node_js" },
    { label: "Next JS", value: "next_js" },
    { label: "HTML5", value: "html_5" },
    { label: "CSS 3", value: "css_3" },
    { label: "Tailwind CSS", value: "tailwind_css" },
  ];

  const options = [
    { label: "English", value: "english" },
    { label: "Hindi", value: "hindi" },
    { label: "Arabic", value: "arabic" },
    { label: "Gujrati", value: "gujrati" },
  ];

  return (
    <Card>
      <div>
        <Label>Intro Video</Label>
        {/*<Dropzone
          onChange={(files) => handleFileChange(files, "introVideo")}
          value={portfolioDetails.introVideo}
          name="introVideo"
        >
          {portfolioDetails?.introVideo?.map((file) => (
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
        onFilesSelected={(files) => handleFileChange(files, 'introVideo')}
        />
      </div>
      <div className="mt-3">
        <Label>Summary/ About me</Label>
        <Input
          type={"textarea"}
          rows={4}
          onChange={handleChange}
          inputName={"aboutMe"}
        />
      </div>
      <div className="mt-3">
        <Label>Project Name</Label>
        <Input
          type={"text"}
          onChange={handleChange}
          inputName={"projectName"}
        />
      </div>
      <div className="mt-3">
        <Label>Project Description</Label>
        <Input
          type={"textarea"}
          rows={4}
          onChange={handleChange}
          inputName={"projectDescription"}
        />
      </div>
      <div className="mt-3">
        <Label>Certificates/ Achievements</Label>
        {/*<Dropzone
          onChange={(files) => handleFileChange(files, "achievements")}
          value={portfolioDetails.achievements}
          name="achievements"
        >
          {portfolioDetails?.achievements?.map((file) => (
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
        onFilesSelected={(files) => handleFileChange(files, 'achievements')}/>
      </div>
      <div className="mt-3">
        <Label>Skills</Label>
        <MultiSelect
          onChange={(value) => handleChange(value, 'skills')}
          options={options}
          className="w-100 changeBorder"
          name="skills"
          value={portfolioDetails.skills}
        />
      </div>
      <div className="mt-3">
        <Label>Tech Languages</Label>
        <MultiSelect
          onChange={(value) => handleChange(value, 'techSkills')}
          options={techLanguagesOptios}
          className="w-100 changeBorder"
          name="languages"
          value={portfolioDetails.languages}
        />
      </div>
      <ActionButtons {...props} onHandleNext={handleNext} />
    </Card>
  );
};

export default Three;
