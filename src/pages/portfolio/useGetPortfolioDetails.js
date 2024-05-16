import axios from "axios";
import { useState, useEffect } from "react";

export const useGetPortfolioDetails = (token, userId) => {
  const [portfolioDetails, setPortfolioDetails] = useState(null);

  const getPortfolioDetails = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}portfolio/portfolio-user-id/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setPortfolioDetails(res.data);
      console.log('this is portfolio response:', res.data);
    }).catch((error) => {
      console.log('this is portfolio error:', error);
    });
  };

  useEffect(() => {
    getPortfolioDetails();
  }, [token, userId]);

  return {
    portfolioDetails,
  };
};
