import React, { useCallback, useRef } from 'react';
import './fileDragZone.scss';

const FileDragZone = ({ name, onChange }) => {
  const fileInputRef = useRef(null);

  const onFileChangeInternal = useCallback((e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      onChange({ target: { name, files } });
    }
  }, [name, onChange]);

  const onZoneClick = () => {
    // Trigger the hidden file input when the drop zone is clicked
    fileInputRef.current.click();
  };

  return (
    <div className="drop-zone"
         onClick={onZoneClick}
         onDragOver={(e) => e.preventDefault()}
         onDrop={onFileChangeInternal}
         onDragLeave={() => document.querySelector(".drop-zone").classList.remove("drop-zone--over")}
         onDragEnd={() => document.querySelector(".drop-zone").classList.remove("drop-zone--over")}>
      <span className="drop-zone__prompt">Drop file here or click to upload</span>
      <input type="file" 
             name={name} 
             className="drop-zone__input" 
             onChange={onChange} 
             ref={fileInputRef} />
    </div>
  );
};

export default FileDragZone;
