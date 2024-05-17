import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineCloudUpload } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import "./fileDragZone.scss";

const FileDragZone = ({
  onFilesSelected = () => {},
  width = '100%',
  height = '200px',
  maxFiles = 50 // Add maxFiles prop with default value
}) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles).slice(0, maxFiles - files.length);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles).slice(0, maxFiles - files.length);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    onFilesSelected(files);
  }, [files]);

  return (
    <section className="drag-drop">
      <div
        className={`document-uploader ${
          files.length > 0 ? "upload-box active" : "upload-box"
        }`}
        style={{ width: width, height: height }}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <div>
          <div className="upload-info">
            <AiOutlineCloudUpload />
            <div>
              <p>Drag and drop your files here</p>
              {/* <p>
                Limit 15MB per file. Supported files: .PDF, .DOCX, .PPTX, .TXT,
                .XLSX
              </p> */}
            </div>
          </div>
          <input
            type="file"
            hidden
            id="browse"
            onChange={handleFileChange}
            accept=".png,.jpeg,.jpg,.pdf,.mp4,"
            multiple
            disabled={files.length >= maxFiles} // Disable if maxFiles reached
          />
          <label htmlFor="browse" className={`browse-btn ${files.length >= maxFiles ? 'disabled' : ''}`}>
            Browse files
          </label>
        </div>

        {files.length > 0 && (
          <div className="file-list">
            <div className="file-list__container">
              {files.map((file, index) => (
                <div className="file-item" key={index}>
                  <div className="file-info">
                    <p>{file.name}</p>
                  </div>
                  <div className="file-actions">
                    <MdClear onClick={() => handleRemoveFile(index)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {files.length > 0 && (
          <div className="success-file">
            <AiOutlineCheckCircle
              style={{ color: "#6DC24B", marginRight: 1 }}
            />
            <p>{files.length} file(s) selected</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FileDragZone;
