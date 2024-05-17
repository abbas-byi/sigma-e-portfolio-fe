import React from "react";
import { Button, Card, Icon, Input, Label } from "../../components";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { usePortfolioForm } from "./usePortfolioForm";
import { useNavigate } from "react-router-dom";

const ActionButtons = (props) => {
  const { onhandleFinish } = props;

  const handleBack = (e) => {
    e.preventDefault();
    props.previousStep();
  };

  const handleFinish = (e) => {
    e.preventDefault();
    if (onhandleFinish) {
      onhandleFinish();
    } else {
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
          <Button type="button" variant={"primarySolid"} onClick={handleFinish}>
            Finish
          </Button>
        )}
      </div>
    </div>
  );
};

const Five = (props) => {
  const navigate = useNavigate();
  const {
    portfolioDetails,
    handleChange,
    lastStep,
    handleFileChange,
    removeFile,
  } = props;
  const { submitPortfolioDetails } = usePortfolioForm();
  const handleFinish = async () => {
    lastStep();
    try {
      submitPortfolioDetails(portfolioDetails);
      // navigate("./portfolio");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Card>
      <div>
        <Label>Google Pay</Label>
        <Input type={"text"} onChange={handleChange} inputName="googlePayUPIId" placeholder={'Enter Google Pay UPI Id'} />
      </div>
      <div className="mt-3">
        <Label>Phone Pay</Label>
        <Input
          type={"text"}
          onChange={handleChange}
          inputName="phonePayUPIId"
          placeholder={'Enter Phone Pay UPI Id'}
        />
      </div>
      <div className="mt-3">
        <Label>Paytm Pay</Label>
        <Input
          type={"text"}
          onChange={handleChange}
          inputName="paytmUPIId"
          placeholder={'Enter Paytm UPI Id'}
        />
      </div>
      <div className="mt-3">
        <Label>Amazone Pay</Label>
        <Input
          type={"text"}
          onChange={handleChange}
          inputName="amazonPayUPIId"
          placeholder={'Enter Amazone Pay UPI Id'}
        />
      </div>
      <ActionButtons {...props} onhandleFinish={handleFinish} />
    </Card>
  );
};

export default Five;
