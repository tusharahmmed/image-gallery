/* eslint-disable react/prop-types */

import {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import {useDispatch} from "react-redux";
import {upload} from "../rtk/features/gallery/gallerySlice";

const FileUpload = ({maxNumber}) => {
  const dispatch = useDispatch();

  // accepted file types
  const acceptedFiles = {
    "image/jpeg": [".jpeg"],
    "image/png": [".png"],
    "image/webp": [".webp"],
  };

  // handle img drop
  const onDrop = useCallback((acceptedFiles, rejectFiles) => {
    if (acceptedFiles.length > 0) {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          // create an object with the image data
          const uploadedFile = {
            id: Math.random().toString(36).substr(2, 9),
            src: reader.result,
          };
          // update state
          dispatch(upload(uploadedFile));
        };
        reader.readAsDataURL(file);
      });
    }

    // if have rejected file
    if (rejectFiles.length > 0) {
      // let errorMessage = rejectFiles[0].errors[0].message;
    }
  }, []);

  const {getRootProps, getInputProps} = useDropzone({
    accept: acceptedFiles,
    maxFiles: maxNumber,
    onDrop,
  });
  return (
    <div className="bg-[#f8f9f994] border-2 rounded-lg min-h-[8rem]">
      <div
        className="flex items-center justify-center h-full"
        {...getRootProps()}>
        <div
          className="flex items-center justify-center flex-col"
          role="button"
          tabIndex="0">
          <input
            type="file"
            autoComplete="off"
            tabIndex="-1"
            name="profile.avatar"
            style={{display: "none"}}
            {...getInputProps()}
          />
          <div className="mb-2">
            <img src="icon/upload.png" width={30} alt="" />
          </div>
          <p className="font-medium">Add Image</p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
