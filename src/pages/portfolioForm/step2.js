import React from "react";
import Styles from "../dashboard/dashboard.module.scss";
import {
  Button,
  Card,
  Icon,
  Input,
  Label,
  Text,
} from "../../components";
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
  const {
    portfolioDetails,
    handleChange,
    removeFile,
    nextStep,
  } = props;

  const handleNext = () => {
    nextStep();
  };

  return (
    <Card>
      <div>
        <Label>Linked In</Label>
        <Input
          type={"text"}
          placeholder={"Enter Linked In Url"}
          inputName={"linkedInProfileUrl"}
          onChange={handleChange}
        />
      </div>
      <div className="mt-3">
        <Label>Facebook</Label>
        <Input
          type={"text"}
          placeholder={"Enter Facebook Profile Url"}
          inputName={"facebookProfileUrl"}
          onChange={handleChange}
        />
      </div>
      <div className="mt-3">
        <Label>Twitter or X</Label>
        <Input
          type={"text"}
          placeholder={"Enter Twitter or X Url"}
          inputName={"twitterProfileUrl"}
          onChange={handleChange}
        />
      </div>
      <div className="mt-3">
        <Label>Instagram</Label>
        <Input
          type={"text"}
          placeholder={"Enter instagram Profile Url"}
          inputName={"instagramProfileUrl"}
          onChange={handleChange}
        />
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
