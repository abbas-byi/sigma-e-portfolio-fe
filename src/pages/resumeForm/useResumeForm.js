import axios from "axios";
import { useEffect, useState } from "react";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { v4 as uuidv4 } from "uuid";

export const useResumeForm = () => {
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

  const [resumeDetails, setResumeDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    jobTitle: "",
    bannerPhoto: "",
    profilePhoto: "",
    theme: "",
    customDomain: "",
    introVideo: [],
    aboutMe: "",
    projectName: "",
    projectDescription: "",
    achievements: [],
    skills: [],
    techSkills: [],
    courseName: "",
    courseStartYear: "",
    courseEndYear: "",
    percentage: "",
    certificate: [],
    companyName: "",
    userCompanyProfile: "",
    workingStartYear: "",
    workingEndYear: "",
    details: "",
    universityName: "",
    linkedInProfileUrl: "",
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
        setResumeDetails((prevDetails) => ({
          ...prevDetails,
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
        }));
      })
      .catch((e) => {
        setErrMsg(e.message);
      });
  };

  useEffect(() => {
    if (token) {
      getUserDetails();
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
      setResumeDetails((prevDetails) => ({
        ...prevDetails,
        [inputOrName]: values,
      }));
    } else if (isStandardInput) {
      const { name, value, type, files } = eventOrValue.target;
      if (type === "file") {
        const filesArray = Array.from(files);
        setResumeDetails((prevDetails) => ({
          ...prevDetails,
          [name]: filesArray,
        }));
      } else if (type === "number") {
        const numberValue = value === "" ? "" : Number(value);
        setResumeDetails((prevDetails) => ({
          ...prevDetails,
          [name]: numberValue,
        }));
      } else if (type === "date") {
        setResumeDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
      } else {
        setResumeDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
      }
    }
  };

  const removeFile = (fieldName) => {
    setResumeDetails((prevDetails) => ({ ...prevDetails, [fieldName]: [] }));
  };

  const handleFileChange = (files, fieldName) => {
    const newFiles = Array.from(files).map((file) => ({
      file: file,
      uploaded: false,
    }));
    setResumeDetails((prevDetails) => ({
      ...prevDetails,
      [fieldName]: newFiles,
    }));
  };

  const submitResumeDetails = async (data) => {
    data = {
      ...data,
      profilePhoto: data.profilePhoto[0].url,
      bannerPhoto: data.bannerPhoto[0].url,
      introVideo: data.introVideo[0].url,
      achievements: data.achievements.map((eachData) => String(eachData.url) || 'empty'),
      certificate: data.certificate.map((eachData) => String(eachData.url) || 'empty'),
      user: sessionStorage.getItem("userId"),
    };
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}resume`,
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
    submitResumeDetails(resumeDetails);
  };

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
    setResumeDetails((prevDetails) => ({
      ...prevDetails,
      [fieldName]: updatedFiles.map((file) => file),
    })
  );
  };

  return {
    uploadFile,
    resumeDetails,
    errMsg,
    handleChange,
    removeFile,
    handleFileChange,
    handleSubmit,
    submitResumeDetails,
    uploadFileToS3Bucket,
  };
};
