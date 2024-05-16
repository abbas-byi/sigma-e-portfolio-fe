import axios from "axios";
import { useEffect, useState } from "react";

export const useGetResumeDetails = (token, userId) => {
  const [resumeDetails, setResumeDetails] = useState()
  const getResumeDetails = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}resume/resume-user-id/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setResumeDetails(res.data);
      console.log('this is e-resume response', res.data)
    }).catch((e) => {
      console.log('this is error', e)
    })
  }

  useEffect(() => {
    getResumeDetails()
  }, [token])
  return {
    resumeDetails,
  };
};
