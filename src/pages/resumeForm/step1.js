import React from "react";
import { Button, Card, Icon, Input, Label, Text } from "../../components";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { useResumeForm } from "./useResumeForm";

const ActionButtons = (props) => {
  const { onHandleNext } = props; // Custom handler for the Next button

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

const One = (props) => {
  const { resumeDetails, handleChange, nextStep } = props;
  const handleNext = () => {
    // console.log("Current Resume Details:", resumeDetails);
    nextStep(); // Move to the next step after logging
  };
  return (
    <Card>
      <div>
        <Label>Name*</Label>
        <Input
          type={"text"}
          placeholder={"Enter Name"}
          value={resumeDetails.name}
          disabled
        />
      </div>
      <div className="mt-3">
        <Label>Email*</Label>
        <Input
          type={"email"}
          placeholder={"example@gmail.com"}
          value={resumeDetails.email}
          disabled
        />
      </div>
      <div className="mt-3">
        <Label>Phone No.*</Label>
        <Input
          type={"text"}
          placeholder={"+91 9876543210"}
          value={resumeDetails.phone}
          disabled
        />
        <Text variant={"md"} color={"secondary"}>
          Add Mobile with Country Code.
        </Text>
      </div>
      <div className="mt-3">
        <Label>Address</Label>
        <Input
          type={"textarea"}
          rows={2}
          placeholder={"Abc, xyz Street"}
          inputName={"address"}
          onChange={handleChange}
        />
      </div>
      <div className="mt-3">
        <Label>Job Title</Label>
        <Input
          type={"text"}
          placeholder={"Enter Title"}
          inputName={"jobTitle"}
          onChange={handleChange}
        />
      </div>
      <div className="mt-3">
        <Label>LinkedIn Profile</Label>
        <Input
          type={"text"}
          placeholder={"LinkedIn Profile URL"}
          inputName={"linkedInProfileUrl"}
          onChange={handleChange}
        />
      </div>
      <ActionButtons {...props} onHandleNext={handleNext} />
    </Card>
  );
};

export default One;
