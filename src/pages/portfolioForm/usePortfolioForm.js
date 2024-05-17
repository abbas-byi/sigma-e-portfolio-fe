import axios from "axios";
import { useEffect, useState } from "react";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { v4 as uuidv4 } from "uuid";

export const usePortfolioForm = () => {
  const S3_BUCKET = process.env.REACT_APP_AWS_BUCKET_NAME;
  const REGION = process.env.REACT_APP_AWS_BUCKET_REGION;

  const ACCESS_KEY = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
  const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

  const s3Client = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    },
  });
  const [portfolioDetails, setportfolioDetails] = useState({
    profilePhoto: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    customDomain: "",
    about: "",
    designation: "",
    companyName: "",
    linkedInProfileUrl: "",
    facebookInProfileUrl: "",
    instagramProfileUrl: "",
    twitterProfileUrl: "",
    theme: "",
    serviceOneImage: "",
    serviceOneName: "",
    serviceOneDescription: "",
    serviceOnePrice: "",
    serviceTwoImage: "",
    serviceTwoName: "",
    serviceTwoDescription: "",
    serviceTwoPrice: "",
    serviceThreeImage: "",
    serviceThreeName: "",
    serviceThreeDescription: "",
    serviceThreePrice: "",
    videos: [],
    galleryImages: [],
    googlePayUPIId: "",
    phonePayUPIId: "",
    paytmUPIId: "",
    amazonPayUPIId: "",
    universityName: "",
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
    const isMultiSelect =
      Array.isArray(eventOrValue) || typeof eventOrValue === "string";
    const isStandardInput = eventOrValue && eventOrValue.target;

    if (isMultiSelect) {
      let values;
      if (Array.isArray(eventOrValue)) {
        values = eventOrValue;
      } else if (typeof eventOrValue === "string") {
        values = eventOrValue.split(",").map((value) => value.trim());
      }
      setportfolioDetails((prevDetails) => ({
        ...prevDetails,
        [inputOrName]: values,
      }));
    } else if (isStandardInput) {
      const { name, value, type, files } = eventOrValue.target;
      if (type === "file") {
        const filesArray = Array.from(files);
        setportfolioDetails((prevDetails) => ({
          ...prevDetails,
          [name]: filesArray,
        }));
      } else if (type === "number") {
        const numberValue = value === "" ? "" : Number(value);
        setportfolioDetails((prevDetails) => ({
          ...prevDetails,
          [name]: numberValue,
        }));
      } else if (type === "date") {
        setportfolioDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
      } else {
        setportfolioDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
      }
    }
  };
  

  const removeFile = (fieldName) => {
    setportfolioDetails((prevDetails) => ({...prevDetails, [fieldName]: []}));
  };

  const handleFileChange = (files, fieldName) => {
    const newFiles = Array.from(files).map((file) => ({
      file: file,
      uploaded: false,
    }));
    setportfolioDetails((prevDetails) => ({
      ...prevDetails,
      [fieldName]: newFiles,
    }));
  };

  const submitPortfolioDetails = async (data) => {
    console.log('line 141' ,data);
    data = {
      ...data,
      profilePhoto: data.profilePhoto[0].url,
      serviceOneImage: data?.serviceOneImage?.[0].url || 'null',
      serviceTwoImage: data.serviceTwoImage?.[0].url || 'null',
      serviceThreeImage: data.serviceThreeImage?.[0].url || 'null',
      videos: data.videos.map((eachData) => String(eachData.url) || 'empty'),
      galleryImages: data.galleryImages.map((eachData) => String(eachData.url) || 'empty'),
      user: sessionStorage.getItem("userId"),
    };
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}portfolio`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    }).then((res) => {
      console.log('this data is saved in database', res)
    }).catch((e) => {
      console.log('this is error', e)
    })
  };

  const handleSubmit = () => {
    submitPortfolioDetails(portfolioDetails);
  }

  const uploadFile = async (file) => {
    let response = {};
    if (!file) {
      alert("Please choose a file first!");
      return;
    }

    const fileName = uuidv4() + "-" + file.name;
    try {
      const upload = new Upload({
        client: s3Client,
        params: {
          Bucket: S3_BUCKET,
          Key: fileName,
          Body: file,
        },
      });

      upload.on("httpUploadProgress", (progress) => {
        response = progress;
      });
      await upload.done();
      return response;
    } catch (err) {
    }
  };

  const uploadFileToS3Bucket = async (files, fieldName) => {
    const urlPrefix = process.env.REACT_APP_S3_UPLOADED_URL_PREFIX;
    const uploadPromises = files.map(async (fileObject) => {
      if (!fileObject.uploaded) {
        const response = await uploadFile(fileObject.file);
        if (response) {
          fileObject.uploaded = true;
          fileObject.url = urlPrefix + response.Key;
        }
        return fileObject.url;
      }
      return fileObject.url;
    });

    const updatedFiles = await Promise.all(uploadPromises);
    setportfolioDetails((prevDetails) => ({
      ...prevDetails,
      [fieldName]: updatedFiles.map((file) => file),
    })
  );
  };

  return {
    portfolioDetails,
    errMsg,
    handleChange,
    removeFile,
    handleFileChange,
    submitPortfolioDetails,
    uploadFileToS3Bucket,
    handleSubmit,
    uploadFile,
  };
};
