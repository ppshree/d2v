/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import { useColorUserType } from '../../../app/heplers/useColorUserType';
import { AlertBar } from '../../shared/AlertBar';
import { IClass } from '../../../app/entity/model';

interface Iprops {
  addOrUpdateClass: (classObj: IClass) => void;
  handleCloseModal: () => void;
}

export const ClassForm: React.FC<Iprops> = ({ handleCloseModal, addOrUpdateClass }) => {
  const { selectedClass: currentClass, formError: errorMessage, submitLoader: loader } = useSelector(
    (state: RootState) => state.SchoolHomePageReducer,
  );

  const [standard_name, setStandardName] = useState<string>('');

  useEffect(() => {
    if (currentClass) {
      setStandardName(currentClass?.standard_name);
    } else {
      return;
    }
  }, [currentClass]);

  const handleFormSubmitAction = () => {
    const ClassFormData: IClass = {
      id: currentClass?.id,
      standard_name: standard_name,
      isEditFlag: currentClass?.isEditFlag ? currentClass.isEditFlag : false,
    };
    addOrUpdateClass(ClassFormData);
  };

  const { currentPrimaryColor, currentSecondaryColor } = useColorUserType();
  return (
    /* wrapper inside modal layout */
    <form>
      {errorMessage && <AlertBar message={errorMessage} />}
      <div className="flex flex-col h-20 justify-evenly">
        <label className="block text-gray-500 font-bold" htmlFor="standard_name">
          Class Name
        </label>
        <input
          type="text"
          id="standard_name"
          name="standard_name"
          value={standard_name}
          onChange={(e) => {
            setStandardName(e.target.value);
          }}
          placeholder="enter class name"
          className="form-input px-4 py-1 rounded-lg"
        ></input>
      </div>
      <div className="flex flex-row space-x-2 my-2 text-text_white">
        <button
          onClick={(e: React.SyntheticEvent) => {
            e.preventDefault();
            handleFormSubmitAction();
          }}
          className={`px-2 py-2 rounded-lg focus:outline-none bg-${currentPrimaryColor} w-full button`}
        >
          {currentClass?.isEditFlag ? (loader ? 'Updating...' : 'Update') : loader ? 'Adding...' : 'Add'}
        </button>
        <button
          onClick={(e: React.SyntheticEvent) => {
            e.preventDefault();
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
