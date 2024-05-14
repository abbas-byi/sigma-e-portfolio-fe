import axios from "axios";
import { useEffect, useState } from "react";

export const usePortfolioForm = () => {
  const [portfolioDetails, setportfolioDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    jobTitle: "",
    bannerImage: [],
    profilePhoto: [],
    theme: "",
    customDomain: "",
    aboutMe: '',
    introVideo: [],
    projectDescription: "",
    projectsName: "",
    achievements: [],
    skills: [],
    languages: [],
    courseName: "",
    courseStartYear: '',
    courseEndYear: '',
    percentage: '',
    certificate: [],
    companyName: "",
    userComapnyProfile: "",
    workingStartYear: '',
    workingEndYear: '',
    details: "",
    universityName: '',
  });
  const [errMsg, setErrMsg] = useState("");
  const token = sessionStorage.getItem("token");
  const getUserDetails = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}users/${sessionStorage.getItem(
        "userId"
      )}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setportfolioDetails({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
        });
      })
      .catch((e) => {
        setErrMsg(e.message);
      });
  }
  useEffect(() => {
    if (token) {
        getUserDetails()
    }
  }, [token]);

  const handleChange = (eventOrValue, inputOrName) => {
    const isMultiSelect = Array.isArray(eventOrValue) || typeof eventOrValue === 'string';
    const isStandardInput = eventOrValue && eventOrValue.target;
  
    if (isMultiSelect) {
      let values;
      if (Array.isArray(eventOrValue)) {
        values = eventOrValue;
      } else if (typeof eventOrValue === 'string') {
        values = eventOrValue.split(',').map(value => value.trim());
      }
      setportfolioDetails(prevDetails => ({ ...prevDetails, [inputOrName]: values }));
    } else if (isStandardInput) {
      const { name, value, type, files } = eventOrValue.target;
      if (type === 'file') {
        const filesArray = Array.from(files);
        setportfolioDetails(prevDetails => ({ ...prevDetails, [name]: filesArray }));
      } else if (type === 'number') {
        const numberValue = value === '' ? '' : Number(value);
        setportfolioDetails(prevDetails => ({ ...prevDetails, [name]: numberValue }));
      } else if (type === 'date') {
        setportfolioDetails(prevDetails => ({ ...prevDetails, [name]: value }));
      } else {
        setportfolioDetails(prevDetails => ({ ...prevDetails, [name]: value }));
      }
    }
  };
  

  const removeFile = (fieldName) => {
    setportfolioDetails({ ...portfolioDetails, [fieldName]: [] });
  };

  const handleFileChange = (files, fieldName) => {
    setportfolioDetails({ ...portfolioDetails, [fieldName]: files });
  };

  return {
    portfolioDetails,
    errMsg,
    handleChange,
    removeFile,
    handleFileChange,
  };
};
