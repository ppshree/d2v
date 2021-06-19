/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useColorUserType } from '../../app/heplers/useColorUserType';
import './TopicList.css';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { PencilIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/solid';
import { MenuAlt3Icon } from '@heroicons/react/solid';
import { SubTopicList } from '../SubTopicList/SubTopicList';
import { RootState } from '../../app/rootReducer';
import { ITopic } from '../../app/entity/model';
import { ModalLayout } from '../shared/ModalLayout';
import { ConfirmAlert } from '../ConfirmAlert/ConfirmAlert';
import { LIMIT, MODAL_POSITION } from '../../app/entity/constant';
import { createNewTopic, deleteTopicByID, retrieveAllSubTopicByTopic } from '../../app/service/shared.service';
import { updateFormError, updateSelectedTopic } from '../../containers/_courses/CoursesSlice';
import { TopicForm } from '../FormModalContent/TopicForm/TopicForm';

interface Iprops {
  subjectId: string;
}

export const TopicList: React.FC<Iprops> = React.memo(({ subjectId }) => {
  const dispatch = useDispatch();

  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
  const { topicList, topicLoader: loader, selectedTopic } = useSelector(
    (state: RootState) => state.CourseHomePageReducer,
  );

  const [activeTopic, setActiveTopic] = useState<string | any>(null);
  const [topicForDelete, setTopictForDelete] = useState<string>('');
  const [isDelete, setIsDelete] = useState<boolean>(false);

  useEffect(() => {
    activeTopic !== null && dispatch(retrieveAllSubTopicByTopic({ limit: LIMIT.ALL, offset: 0, topic: activeTopic }));
  }, [activeTopic]);

  // custom hook
  const { currentPrimaryColor, currentSecondaryColor } = useColorUserType();

  const openModalForm = () => {
    dispatch(
      updateSelectedTopic({
        subject_id: subjectId,
        topic_name: '',
        created_by: loggedInUser.email,
      }),
    );
  };

  const addOrUpdateTopic = (topicObj: ITopic) => {
    try {
      dispatch(updateFormError(''));
      if (topicObj.topic_name && loggedInUser.email) {
        dispatch(createNewTopic(topicObj));
      } else {
        dispatch(updateFormError('Fill All the Mandatory Fields.'));
      }
    } catch (err) {
      dispatch(updateFormError(err));
    }
  };

  const updateTopicAction = (topicObj: any) => {
    const topicDetailsObj = { ...topicObj };
    topicDetailsObj.isEditFlag = true;
    dispatch(updateSelectedTopic(topicDetailsObj));
  };

  const deleteTopicDetails = (topicId: string) => {
    setIsDelete(true);
    setTopictForDelete(topicId);
  };

  const alertResponse = (isConfirm: boolean) => {
    if (isConfirm) {
      dispatch(deleteTopicByID(topicForDelete));
      closeAlertModal();
    } else {
      closeAlertModal();
    }
  };

  const closeFormModal = () => {
    dispatch(updateFormError(''));
    dispatch(
      updateSelectedTopic({
        subject_id: '',
        topic_name: '',
        created_by: '',
      }),
    );
  };

  const closeAlertModal = () => {
    setTopictForDelete('');
    setIsDelete(false);
  };

  return (
    <>
      <div className="flex flex-col justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            openModalForm();
          }}
          className="ml-auto text-lg flex justify-start items-start"
        >
          <PlusCircleIcon className="w-7 mr-1 text-gray-700" /> Topic{' '}
        </button>
        {/* Modal Part */}
        {selectedTopic !== null && selectedTopic?.subject_id !== '' && (
          <ModalLayout
            title="Topic Form"
            modalPosition={MODAL_POSITION.DEFAULT}
            isOpen={true}
            closeModal={closeFormModal}
          >
            <TopicForm addOrUpdateTopic={addOrUpdateTopic} handleCloseModal={closeFormModal} />
          </ModalLayout>
        )}
        <ul className="list-inside flex flex-col justify-evenly flex-wrap">
          {!loader &&
            topicList.map((topic: ITopic) => {
              return (
                <>
                  <li className="text-lg flex flex-col justify-start w-full" key={topic.id}>
                    <div className="tabs">
                      <input
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTopic(
                            activeTopic === null
                              ? topic.topic_name
                              : activeTopic == topic.topic_name
                              ? null
                              : topic.topic_name,
                          );
                        }}
                        checked={activeTopic === null ? false : activeTopic == topic.topic_name ? true : false}
                        style={{ display: 'none' }}
                        type="checkbox"
                        id={`check${topic.id}`}
                      />
                      <label className="tab-label" htmlFor={`check${topic.id}`}>
                        <div
                          className={`w-6 h-6 flex justify-center items-center rounded-full bg-${currentPrimaryColor} mr-4`}
                        >
                          <MenuAlt3Icon className={`text-text_white w-4`} />
                        </div>
                        <div>
                          <p className={`font-semibold custom-cursor focus:outline-none w-auto py-1 bg-transparent`}>
                            {topic.topic_name}
                          </p>
                        </div>
                        <div className="flex justify-evenly items-center mr-auto ml-4 space-x-4">
                          <button
                            onClick={(e: React.SyntheticEvent) => {
                              e.stopPropagation();
                              updateTopicAction(topic);
                            }}
                            className="focus:outline-none"
                          >
                            <PencilIcon className={`text-${currentPrimaryColor} w-6`} />
                          </button>
                          <button
                            onClick={(e: React.SyntheticEvent) => {
                              e.stopPropagation();
                              deleteTopicDetails(topic.id);
                            }}
                            className="focus:outline-none"
                          >
                            <TrashIcon className={`text-${currentSecondaryColor} w-6`} />
                          </button>
                        </div>
                      </label>
                      <div className="w-1 bg-text_grey separator-y ml-2.5"></div>
                      {activeTopic === topic.topic_name && (
                        <div className="pl-12 tab-content">
                          <SubTopicList topicId={topic.id} />
                        </div>
                      )}
                    </div>
                  </li>
                </>
              );
            })}
          {!loader && topicList.length === 0 && (
            <li className="text-base font-semibold">
              <p className={`text-text_dark`}>No Topic Found</p>
            </li>
          )}
          {loader && (
            <ul className="animate-pulse flex flex-col justify-evenly space-y-4">
              {[1, 2, 3].map((n: number) => {
                return (
                  <li className="text-lg" key={n}>
                    <div className={`h-6 bg-gray-300 rounded w-1/2`}></div>
                  </li>
                );
              })}
            </ul>
          )}
        </ul>
      </div>
      {/* Confirm alert */}
      <ModalLayout title="alert" modalPosition={MODAL_POSITION.DEFAULT} closeModal={closeAlertModal} isOpen={isDelete}>
        <ConfirmAlert confirmType="delete" confirmResponse={alertResponse} />
      </ModalLayout>
    </>
  );
});
