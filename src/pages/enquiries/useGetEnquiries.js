import axios from "axios";
import { useEffect, useState } from "react";

export const useGetEnquiries = () => {
  const [enquiriesData, setEnquiriesData] = useState();

  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  const getEnquiriesData = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}enquiry/enquiry-user-id/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setEnquiriesData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getEnquiriesData();
  }, [token])

  return {
    enquiriesData,
  }
};
