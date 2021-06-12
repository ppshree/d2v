/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useColorUserType } from '../../app/heplers/useColorUserType';
import './TopicList.css';
import { PlusIcon } from '@heroicons/react/solid';
import { PencilIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/solid';
import { SubTopicList } from '../SubTopicList/SubTopicList';
import { RootState } from '../../app/rootReducer';
import { ITopic } from '../../app/entity/model';
import { ModalLayout } from '../shared/ModalLayout';
import { ConfirmAlert } from '../ConfirmAlert/ConfirmAlert';
import { MODAL_POSITION } from '../../app/entity/constant';
import { deleteTopicByID } from '../../app/service/shared.service';

export const TopicList: React.FC = React.memo(() => {
  const dispatch = useDispatch();

  const { topicList } = useSelector((state: RootState) => state.CourseHomePageReducer);

  const [topicForDelete, setTopictForDelete] = useState<string>('');
  const [isDelete, setIsDelete] = useState<boolean>(false);

  // custom hook
  const { currentPrimaryColor, currentSecondaryColor } = useColorUserType();

  const addNewTopicList = (topic: ITopic) => {
    console.log('step here');
  };

  const alertResponse = (isConfirm: boolean) => {
    if (isConfirm) {
      dispatch(deleteTopicByID(topicForDelete));
      closeModal();
    } else {
      closeModal();
    }
  };

  const closeModal = () => {
    setTopictForDelete('');
    setIsDelete(false);
  };

  return (
    <>
      <div className="flex flex-col justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            addNewTopicList({
              topic_name: 'Integration',
              subject_id: '123',
            });
          }}
          className="ml-auto text-lg flex justify-start items-start"
        >
          <PlusIcon className="w-7 mr-1" /> Topic{' '}
        </button>
        <ul className="list-inside flex flex-col justify-evenly flex-wrap">
          {topicList.map((topic: ITopic) => {
            return (
              <>
                <li className="text-lg flex flex-col justify-start tabs" key={topic.id}>
                  <div className="tabs">
                    <input style={{ display: 'none' }} type="checkbox" id={`check${topic.id}`} />
                    <label className="tab-label py-2" htmlFor={`check${topic.id}`}>
                      <div className={`w-4 h-4 rounded-full bg-${currentSecondaryColor} mr-4`}></div>
                      <div>
                        <p className={`custom-cursor focus:outline-none w-48 py-1 bg-transparent`}>
                          {topic.topic_name}
                        </p>
                      </div>
                      <div className="flex justify-evenly items-center ml-48 mr-auto space-x-4">
                        <button
                          onClick={(e: React.SyntheticEvent) => {
                            e.stopPropagation();
                          }}
                          className="focus:outline-none"
                        >
                          <PencilIcon className={`text-${currentPrimaryColor} w-6`} />
                        </button>
                        <button
                          onClick={(e: React.SyntheticEvent) => {
                            e.stopPropagation();
                          }}
                          className="focus:outline-none"
                        >
                          <TrashIcon className={`text-${currentSecondaryColor} w-6`} />
                        </button>
                      </div>
                    </label>
                    <div className="pl-12 tab-content">
                      <SubTopicList />
                    </div>
                  </div>
                </li>
              </>
            );
          })}
        </ul>
      </div>
      {/* Confirm alert */}
      <ModalLayout title="alert" modalPosition={MODAL_POSITION.DEFAULT} closeModal={closeModal} isOpen={isDelete}>
        <ConfirmAlert confirmResponse={alertResponse} />
      </ModalLayout>
    </>
  );
});
