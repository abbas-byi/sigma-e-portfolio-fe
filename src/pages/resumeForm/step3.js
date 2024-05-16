import React from "react";
import {
  Button,
  Card,
  Icon,
  Input,
  Label,
  FileDragZone,
} from "../../components";
import { Dropzone, FileMosaic } from "@files-ui/react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { useResumeForm } from "./useResumeForm";

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

const Three = (props) => {
  const { uploadFileToS3Bucket } = useResumeForm();
  const {
    resumeDetails,
    handleChange,
    handleFileChange,
    removeFile,
    nextStep,
  } = props;
  const handleNext = async () => {
    try {
      if (resumeDetails.introVideo.length > 0) {
        await uploadFileToS3Bucket(resumeDetails.introVideo, "introVideo");
      }
      if (resumeDetails.achievements.length > 0) {
        await uploadFileToS3Bucket(resumeDetails.achievements, "achievements");
      }
      nextStep();
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const techLanguagesOptios = [
    { label: "JavaScript", value: "JavaScript" },
    { label: "React JS", value: "React JS" },
    { label: "Node JS", value: "Node JS" },
    { label: "Next JS", value: "Next JS" },
    { label: "HTML5", value: "HTML5" },
    { label: "CSS 3", value: "CSS 3" },
    { label: "Tailwind CSS", value: "Tailwind CSS" },
  ];

  const options = [
    { label: "English", value: "English" },
    { label: "Hindi", value: "Hindi" },
    { label: "Arabic", value: "Arabic" },
    { label: "Gujrati", value: "Gujrati" },
  ];

  return (
    <Card>
      <div>
        <Label>Intro Video</Label>
        {/*<Dropzone
          onChange={(files) => handleFileChange(files, "introVideo")}
          value={resumeDetails.introVideo}
          name="introVideo"
        >
          {resumeDetails?.introVideo?.map((file) => (
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
          onFilesSelected={(files) => handleFileChange(files, "introVideo")}
          width="100%"
          height="150px"
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
        <Label>Projects Name</Label>
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
          value={resumeDetails.achievements}
          name="achievements"
        >
          {resumeDetails?.achievements?.map((file) => (
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
          onFilesSelected={(files) => handleFileChange(files, "achievements")}
          width="100%"
          height="150px"
        />
      </div>
      <div className="mt-3">
        <Label>Skills</Label>
        <MultiSelect
          onChange={(value) => handleChange(value, "skills")}
          options={options}
          className="w-100 changeBorder"
          name="skills"
          value={resumeDetails.skills.join(",")}
        />
      </div>
      <div className="mt-3">
        <Label>Tech Languages</Label>
        <MultiSelect
          onChange={(value) => handleChange(value, "techSkills")}
          options={techLanguagesOptios}
          className="w-100 changeBorder"
          name="languages"
          value={resumeDetails.languages}
        />
      </div>
      <ActionButtons {...props} onHandleNext={handleNext} />
    </Card>
  );
};

export default Three;
