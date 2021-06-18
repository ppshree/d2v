/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import { useColorUserType } from '../../../app/heplers/useColorUserType';
import { AlertBar } from '../../shared/AlertBar';
import { ISubject } from '../../../app/entity/model';
import { CloudUploadIcon } from '@heroicons/react/solid';
import { PencilAltIcon } from '@heroicons/react/solid';
import { MinusCircleIcon } from '@heroicons/react/solid';
import './SubjectForm.css';
interface Iprops {
  addOrUpdateSubject: (subjectObj: ISubject) => void;
  handleCloseModal: () => void;
}

export const SubjectForm: React.FC<Iprops> = ({ handleCloseModal, addOrUpdateSubject }) => {
  const { selectedSubject: currentSubject, formError: errorMessage, submitLoader: loader } = useSelector(
    (state: RootState) => state.CourseHomePageReducer,
  );

  const [subject_name, setSubjectName] = useState<string>('');
  const [subject_image, setSubjectImage] = useState<string>('');
  const [showUploadFile, setShowUploadFile] = useState<boolean>(false);

  useEffect(() => {
    if (currentSubject) {
      setSubjectName(currentSubject?.subject_name);
      setSubjectImage(currentSubject?.subject_image);
      setShowUploadFile(currentSubject.isEditFlag ? false : true);
    } else {
      return;
    }
  }, [currentSubject]);

  const uploadImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubjectImage(URL.createObjectURL(e.target.files && e.target.files[0]));
  };

  const handleFormSubmitAction = () => {
    const SubjectFormData: ISubject = {
      id: currentSubject?.id,
      subject_name: subject_name,
      subject_image: subject_image,
      standard_id: currentSubject?.standard_id,
      isEditFlag: currentSubject?.isEditFlag ? currentSubject.isEditFlag : false,
    };
    addOrUpdateSubject(SubjectFormData);
  };
  const { currentPrimaryColor, currentSecondaryColor } = useColorUserType();
  return (
    /* wrapper inside modal layout */
    <form className="w-80">
      {errorMessage && <AlertBar message={errorMessage} />}
      <div className="flex flex-col h-20 justify-evenly">
        <label className="block text-gray-500 font-bold" htmlFor="subject_name">
          Subject Name
        </label>
        <input
          type="text"
          id="subject_name"
          name="subject_name"
          value={subject_name}
          onChange={(e) => {
            setSubjectName(e.target.value);
          }}
          placeholder="enter subject name"
          className="form-input  px-4 py-1 my-3 rounded-lg"
        ></input>
      </div>
      <div className="flex flex-col h-auto justify-evenly">
        <label className="block text-gray-500 font-bold" htmlFor="subject_image">
          Subject Image
        </label>
        <div className="flex flex-col h-full space-y-4 justify-evenly rounded-lg my-2">
          <input
            type="text"
            id="subject_image"
            name="subject_image"
            value={subject_image}
            onChange={(e) => {
              setSubjectImage(e.target.value);
            }}
            placeholder="upload subject cover image"
            className="focus:outline-none py-1"
          ></input>
          {currentSubject?.isEditFlag && (
            <>
              {!showUploadFile && (
                <PencilAltIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowUploadFile(true);
                  }}
                  className={`text-${currentPrimaryColor} m-auto cursor-pointer w-6`}
                />
              )}
              {showUploadFile && (
                <MinusCircleIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowUploadFile(false);
                  }}
                  className={`text-${currentSecondaryColor} m-auto cursor-pointer w-6`}
                />
              )}
            </>
          )}
          {showUploadFile && (
            <input
              type="file"
              id="subject_image"
              name="subject_image"
              onChange={uploadImageHandler}
              placeholder="upload subject cover image"
              className="py-1 rounded-lg"
            ></input>
          )}
          {subject_image !== '' && <img src={subject_image} className="preview-image" alt="preview subject image" />}
          {subject_image !== '' && showUploadFile && (
            <button
              onClick={(e: React.SyntheticEvent) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className={`flex justify-center items-center text-text_dark my-3 px-2 py-2 rounded-lg focus:outline-none w-full`}
            >
              <CloudUploadIcon className={`text-${currentPrimaryColor} w-5`} />
              Upload
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-row space-x-2 my-2 text-text_white">
        <button
          onClick={(e: React.SyntheticEvent) => {
            e.preventDefault();
            handleFormSubmitAction();
          }}
          className={`px-2 py-2 rounded-lg focus:outline-none bg-${currentPrimaryColor} w-full button`}
        >
          {currentSubject?.isEditFlag ? (loader ? 'Updating...' : 'Update') : loader ? 'Adding...' : 'Add'}
        </button>
        <button
          onClick={(e: React.SyntheticEvent) => {
            e.preventDefault();
            e.stopPropagation();
            handleCloseModal();
          }}
          className={`px-2 py-2 rounded-lg focus:outline-none bg-${currentSecondaryColor} w-full button`}
        >
          Cancel
        </button>
      </div>
    </form>
    /* wrapper inside modal layout */
  );
};
