/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useColorUserType } from '../../app/heplers/useColorUserType';
import './SubTopicList.css';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { PencilIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/solid';
import { MenuAlt3Icon } from '@heroicons/react/solid';
import { ContentList } from '../ContentList/ContentList';
import { RootState } from '../../app/rootReducer';
import { ISubTopic } from '../../app/entity/model';
import { ModalLayout } from '../shared/ModalLayout';
import { ConfirmAlert } from '../ConfirmAlert/ConfirmAlert';
import { MODAL_POSITION } from '../../app/entity/constant';
import { createNewSubTopic, deleteSubTopicByID } from '../../app/service/shared.service';
import { updateFormError, updateSelectedSubTopic } from '../../containers/_courses/CoursesSlice';
import { SubTopicForm } from '../FormModalContent/SubTopicForm/SubTopicForm';

interface Iprops {
  topicId: string;
}

export const SubTopicList: React.FC<Iprops> = React.memo(({ topicId }) => {
  const dispatch = useDispatch();

  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
  const { subTopicList, subTopicLoader: loader, selectedSubTopic } = useSelector(
    (state: RootState) => state.CourseHomePageReducer,
  );

  const [subTopicForDelete, setSubTopictForDelete] = useState<string>('');
  const [isDelete, setIsDelete] = useState<boolean>(false);

  // custom hook
  const { currentPrimaryColor, currentSecondaryColor } = useColorUserType();

  const openModalForm = () => {
    dispatch(
      updateSelectedSubTopic({
        topic_id: topicId,
        sub_topic_name: '',
        created_by: loggedInUser.email,
      }),
    );
  };

  const addOrUpdateSubTopic = (subTopicObj: ISubTopic) => {
    try {
      dispatch(updateFormError(''));
      if (subTopicObj.sub_topic_name && loggedInUser.email) {
        dispatch(createNewSubTopic(subTopicObj));
      } else {
        dispatch(updateFormError('Fill All the Mandatory Fields.'));
      }
    } catch (err) {
      dispatch(updateFormError(err));
    }
  };

  const updateSubTopicAction = (subTopicObj: any) => {
    const subTopicDetailsObj = { ...subTopicObj };
    subTopicDetailsObj.isEditFlag = true;
    dispatch(updateSelectedSubTopic(subTopicDetailsObj));
  };

  const deleteSubTopicDetails = (subTopicId: string) => {
    setIsDelete(true);
    setSubTopictForDelete(subTopicId);
  };

  const alertResponse = (isConfirm: boolean) => {
    if (isConfirm) {
      dispatch(deleteSubTopicByID(subTopicForDelete));
      closeAlertModal();
    } else {
      closeAlertModal();
    }
  };

  const closeFormModal = () => {
    dispatch(updateFormError(''));
    dispatch(
      updateSelectedSubTopic({
        topic_id: '',
        sub_topic_name: '',
        created_by: '',
      }),
    );
  };

  const closeAlertModal = () => {
    setSubTopictForDelete('');
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
          <PlusCircleIcon className="w-7 mr-1 text-gray-700" /> Sub Topic{' '}
        </button>
        {/* Modal Part */}
        {selectedSubTopic !== null && selectedSubTopic?.topic_id !== '' && (
          <ModalLayout
            title="Sub Topic Form"
            modalPosition={MODAL_POSITION.DEFAULT}
            isOpen={true}
            closeModal={closeFormModal}
          >
            <SubTopicForm addOrUpdateSubTopic={addOrUpdateSubTopic} handleCloseModal={closeFormModal} />
          </ModalLayout>
        )}
        <ul className="list-inside flex flex-col justify-evenly flex-wrap">
          {!loader &&
            subTopicList.map((subTopic: ISubTopic) => {
              return (
                <>
                  <li className="text-lg flex flex-col justify-start tabs w-full" key={subTopic.id}>
                    <div className="tabs">
                      <input style={{ display: 'none' }} type="checkbox" id={`check${subTopic.id}`} />
                      <label className="tab-label" htmlFor={`check${subTopic.id}`}>
                        <div
                          className={`w-6 h-6 flex justify-center items-center rounded-full bg-${currentPrimaryColor} mr-4`}
                        >
                          <MenuAlt3Icon className={`text-text_white w-4`} />
                        </div>
                        <div>
                          <p className={`font-medium custom-cursor focus:outline-none w-auto py-1 bg-transparent`}>
                            {subTopic.sub_topic_name}
                          </p>
                        </div>
                        <div className="flex justify-evenly items-center ml-4 mr-auto space-x-4">
                          <button
                            onClick={(e: React.SyntheticEvent) => {
                              e.stopPropagation();
                              updateSubTopicAction(subTopic);
                            }}
                            className="focus:outline-none"
                          >
                            <PencilIcon className={`text-${currentPrimaryColor} w-6`} />
                          </button>
                          <button
                            onClick={(e: React.SyntheticEvent) => {
                              e.stopPropagation();
                              deleteSubTopicDetails(subTopic.id);
                            }}
                            className="focus:outline-none"
                          >
                            <TrashIcon className={`text-${currentSecondaryColor} w-6`} />
                          </button>
                        </div>
                      </label>
                      <div className="w-1 bg-text_grey separator-y ml-2.5"></div>
                      <div className="pl-12 tab-content">
                        <ContentList />
                      </div>
                    </div>
                  </li>
                </>
              );
            })}
          {!loader && subTopicList.length === 0 && (
            <li className="text-base font-semibold">
              <p className={`text-${currentPrimaryColor}`}>No Subtopic Found</p>
            </li>
          )}
          {loader && (
            <ul className="animate-pulse flex flex-col justify-evenly space-y-4">
              {[1, 2, 3].map((n: number) => {
                return (
                  <li className="text-lg" key={n}>
                    <div className={`h-4 bg-gray-300 rounded w-1/2`}></div>
                  </li>
                );
              })}
            </ul>
          )}
        </ul>
      </div>
      {/* Confirm alert */}
      <ModalLayout title="alert" modalPosition={MODAL_POSITION.DEFAULT} closeModal={closeAlertModal} isOpen={isDelete}>
        <ConfirmAlert confirmResponse={alertResponse} />
      </ModalLayout>
    </>
  );
});
