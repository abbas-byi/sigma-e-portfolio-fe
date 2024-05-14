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
    console.log("Files prepared for upload:", newFiles);
    setResumeDetails((prevDetails) => ({
      ...prevDetails,
      [fieldName]: newFiles,
    }));
  };

  const submitResumeDetails = async (data) => {
    console.log("this is data", data);
    data = {
      ...data,
      user: sessionStorage.getItem("userId"),
    };
    let achievements = data.achievements;
    console.log(achievements, "achievements==============129");
    for (let item of achievements) {
      let response = await uploadFile(item);
      console.log("response at line 135 =====>", response);
    }
    // axios({
    //   method: "POST",
    //   url: `${process.env.REACT_APP_API_URL}resume`,
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    //   data: data,
    // }).then((res) => {
    //   console.log('this data is saved in database', res)
    // }).catch((e) => {
    //   console.log('this is error', e)
    // })
  };

  const handleSubmit = () => {
    console.log("Final submission data:", resumeDetails);
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
      alert("Upload completed successfully!");
      return response;
    } catch (err) {
      console.log("error", err);
      alert("Error uploading file: ", err.message);
    }
  };

  const uploadFileToS3Bucket = async (files, fieldName) => {
    const urlPrefix = process.env.REACT_APP_S3_UPLOADED_URL_PREFIX;
    const uploadPromises = files.map(async (fileObject) => {
      if (!fileObject.uploaded) {
        const response = await uploadFile(fileObject.file);
        if (response) {
          fileObject.uploaded = true;
          console.log(
            "this is response after file upload",
            urlPrefix + response.Key
          );
          fileObject.url = urlPrefix + response.Key;
        }
        return fileObject;
      }
      return fileObject;
    });

    const updatedFiles = await Promise.all(uploadPromises);

    console.log("line 254", updatedFiles);
    setResumeDetails((prevDetails) => ({
      ...prevDetails,
      [fieldName]: updatedFiles.map((file) => file.url),
    }));

    setTimeout(() => {
      console.log("resumeDetails", resumeDetails);
    }, 5000);
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
