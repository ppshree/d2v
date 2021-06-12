/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import { useColorUserType } from '../../../app/heplers/useColorUserType';
import { AlertBar } from '../../shared/AlertBar';
import { ITopic } from '../../../app/entity/model';
import './TopicForm.css';
interface Iprops {
  addOrUpdateTopic: (topicObj: ITopic) => void;
  handleCloseModal: () => void;
}

export const TopicForm: React.FC<Iprops> = ({ handleCloseModal, addOrUpdateTopic }) => {
  const { selectedTopic: currentTopic, formError: errorMessage, submitLoader: loader } = useSelector(
    (state: RootState) => state.CourseHomePageReducer,
  );

  const [topic_name, setTopicName] = useState<string>('');

  useEffect(() => {
    if (currentTopic) {
      setTopicName(currentTopic?.topic_name);
    } else {
      return;
    }
  }, [currentTopic]);

  const handleFormSubmitAction = () => {
    const TopicFormData: ITopic = {
      id: currentTopic?.id,
      topic_name: topic_name,
      subject_id: currentTopic?.subject_id,
      isEditFlag: currentTopic?.isEditFlag ? currentTopic.isEditFlag : false,
    };
    addOrUpdateTopic(TopicFormData);
  };
  const { currentPrimaryColor, currentSecondaryColor } = useColorUserType();
  return (
    /* wrapper inside modal layout */
    <form className="w-80">
      {errorMessage && <AlertBar message={errorMessage} />}
      <div className="flex flex-col h-20 justify-evenly">
        <label className="block text-gray-500 font-bold" htmlFor="topic_name">
          Topic Name
        </label>
        <input
          type="text"
          id="topic_name"
          name="topic_name"
          value={topic_name}
          onChange={(e) => {
            setTopicName(e.target.value);
          }}
          placeholder="enter topic name"
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
          {currentTopic?.isEditFlag ? (loader ? 'Updating...' : 'Update') : loader ? 'Adding...' : 'Add'}
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
