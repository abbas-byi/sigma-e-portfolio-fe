import axios from "axios";
import { useState } from "react";

export const useSubmitEnquiry = () => {
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  const [enquiryDetails, setEnquiryDetails] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });
  const onSubmit = async (data) => {
    try {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}enquiry`,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
            userId,
            ...data,
        },
      })
        .then(() => {
          console.log("enquiry submitted successfully");
        })
        .catch((e) => {
          console.log("error in enquiry submission", e);
        });
    } catch (e) {}
  };
  return {
    setEnquiryDetails,
    enquiryDetails,
    onSubmit,
  };
};
