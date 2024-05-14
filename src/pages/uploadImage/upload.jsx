import React, { useState } from 'react';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { v4 as uuidv4 } from 'uuid';

const S3_BUCKET =process.env.REACT_APP_AWS_BUCKET_NAME;
const REGION = process.env.REACT_APP_AWS_BUCKET_REGION;

const ACCESS_KEY = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
  }
});

const UploadImageToS3WithReactS3 = () => {
  const [file, setFile] = useState(null);

  const handleFileInput = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      alert('Please choose a file first!');
      return;
    }

    const fileName = uuidv4() + '-' + file.name;
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
        console.log(progress); // you can implement some progress reporting
      });

      await upload.done();
      alert('Upload completed successfully!');
    } catch (err) {
      alert('Error uploading file: ', err.message);
    }
  };

  return (
    <div>
      <h1>Upload to AWS S3 Bucket</h1>
      <input type="file" onChange={handleFileInput} />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
}

export default UploadImageToS3WithReactS3;
