/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import { useColorUserType } from '../../../app/heplers/useColorUserType';
import { AlertBar } from '../../shared/AlertBar';
import { ISubTopic } from '../../../app/entity/model';
import './SubTopicForm.css';
interface Iprops {
  addOrUpdateSubTopic: (subTopicObj: ISubTopic) => void;
  handleCloseModal: () => void;
}

export const SubTopicForm: React.FC<Iprops> = ({ handleCloseModal, addOrUpdateSubTopic }) => {
  const { selectedSubTopic: currentSubTopic, formError: errorMessage, submitLoader: loader } = useSelector(
    (state: RootState) => state.CourseHomePageReducer,
  );

  const [sub_topic_name, setSubTopicName] = useState<string>('');

  useEffect(() => {
    if (currentSubTopic) {
      setSubTopicName(currentSubTopic?.sub_topic_name);
    } else {
      return;
    }
  }, [currentSubTopic]);

  const handleFormSubmitAction = () => {
    const SubTopicFormData: ISubTopic = {
      id: currentSubTopic?.id,
      sub_topic_name: sub_topic_name,
      topic_id: currentSubTopic?.topic_id,
      isEditFlag: currentSubTopic?.isEditFlag ? currentSubTopic.isEditFlag : false,
    };
    addOrUpdateSubTopic(SubTopicFormData);
  };
  const { currentPrimaryColor, currentSecondaryColor } = useColorUserType();
  return (
    /* wrapper inside modal layout */
    <form className="w-80">
      {errorMessage && <AlertBar message={errorMessage} />}
      <div className="flex flex-col h-20 justify-evenly">
        <label className="block text-gray-500 font-bold" htmlFor="sub_topic_name">
          Sub Topic Name
        </label>
        <input
          type="text"
          id="sub_topic_name"
          name="sub_topic_name"
          value={sub_topic_name}
          onChange={(e) => {
            setSubTopicName(e.target.value);
          }}
          placeholder="enter subtopic name"
          className="form-input  px-4 py-1 my-3 rounded-lg"
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
          {currentSubTopic?.isEditFlag ? (loader ? 'Updating...' : 'Update') : loader ? 'Adding...' : 'Add'}
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
