import { Input, Label, Text } from "../../../components";

export const StepOne = ({ resumeDetails, handleChange }) => {
  return (
    <div>
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
    </div>
  );
};
