import axios from "axios";

export const useGetResumeDetails = (token, userId) => {
  const getResumeDetails = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}resume/resume-user-id/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log('this is response', res)
    }).catch((e) => {
      console.log('this is error', e)
    })
  }
  return {
    getResumeDetails,
  };
};
