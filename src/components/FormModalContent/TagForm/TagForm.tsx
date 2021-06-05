/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import { useColorUserType } from '../../../app/heplers/useColorUserType';
import { AlertBar } from '../../shared/AlertBar';
import { ITags } from '../../../app/entity/model';

interface Iprops {
  addOrUpdateUser: (userObj: ITags) => void;
  handleCloseModal: () => void;
}

export const TagForm: React.FC<Iprops> = ({ handleCloseModal, addOrUpdateUser }) => {
  const { selectedTags: currentTag, formError: errorMessage, submitLoader: loader } = useSelector(
    (state: RootState) => state.SuperAdminHomePageReducer,
  );

  const [tags, setTags] = useState<string>('');

  useEffect(() => {
    if (currentTag) {
      setTags(currentTag?.learning_outcome);
    } else {
      return;
    }
  }, [currentTag]);

  const handleFormSubmitAction = () => {
    const TagFormData: ITags = {
      id: currentTag?.id,
      learning_outcome: tags,
      isEditFlag: currentTag?.isEditFlag ? currentTag.isEditFlag : false,
    };
    addOrUpdateUser(TagFormData);
  };

  const { currentPrimaryColor, currentSecondaryColor } = useColorUserType();
  return (
    /* wrapper inside modal layout */
    <form>
      {errorMessage && <AlertBar message={errorMessage} />}
      <div className="flex flex-col h-20 justify-evenly">
        <label className="block text-gray-500 font-bold" htmlFor="first_name">
          Tag Name
        </label>
        <input
          type="text"
          id="tag_name"
          name="tag_name"
          value={tags}
          onChange={(e) => {
            setTags(e.target.value);
          }}
          placeholder="enter tag name"
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
          {currentTag?.isEditFlag ? (loader ? 'Updating...' : 'Update') : loader ? 'Adding...' : 'Add'}
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
