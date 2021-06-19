/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LIMIT, MODAL_POSITION } from '../../app/entity/constant';
import { PencilIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/solid';
import './SubjectList.css';
import { useColorUserType } from '../../app/heplers/useColorUserType';
import { ModalLayout } from '../shared/ModalLayout';
import { ConfirmAlert } from '../ConfirmAlert/ConfirmAlert';
import { ISubject } from '../../app/entity/model';
import { TopicList } from '../TopicList/TopicList';
import { retrieveAllTopicBySubject } from '../../app/service/shared.service';
import { Loader } from '../Loader/Loader';

interface Iprops {
  itemList: any[];
  isLoading?: boolean;
  updateAction: (subject: any) => void;
  deleteAction: (subjectId: string) => void;
}
export const SubjectList: React.FC<Iprops> = ({ itemList, isLoading, updateAction, deleteAction }) => {
  const dispatch = useDispatch();

  const [activeSubject, setActiveSubject] = useState<string | any>(null);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [subjectForDelete, setSubjectForDelete] = useState<string>('');
  const { currentPrimaryColor, currentSecondaryColor } = useColorUserType();

  useEffect(() => {
    activeSubject !== null &&
      dispatch(retrieveAllTopicBySubject({ limit: LIMIT.ALL, offset: 0, subject: activeSubject }));
  }, [activeSubject]);

  const editSubjectDetails = (subject: any) => {
    const subjectObj = { ...subject };
    subjectObj.isEditFlag = true;
    updateAction(subjectObj);
  };

  const deleteSubjectDetails = (subjectId: string) => {
    setIsDelete(true);
    setSubjectForDelete(subjectId);
  };

  const alertResponse = (isConfirm: boolean) => {
    if (isConfirm) {
      deleteAction(subjectForDelete);
      closeModal();
    } else {
      closeModal();
    }
  };

  const closeModal = () => {
    setSubjectForDelete('');
    setIsDelete(false);
  };

  return (
    <>
      <div className="w-full px-4 py-8 flex flex-col space-y-12">
        {isLoading && <Loader />}
        {!isLoading &&
          itemList.map((subject: ISubject, index: number) => {
            return (
              <div key={subject.id} className="rounded-sm flex flex-col">
                <div className="border flex flex-col justify-between space-y-6 border-b-0 bg-gray-100 px-10 py-6 card-shadow">
                  <div className="flex justify-between items-center">
                    <p
                      className={`bg-${currentPrimaryColor} mr-4 flex justify-center items-center w-8 h-8 rounded-full text-text_white`}
                    >
                      {index + 1}
                    </p>
                    <p className={`text-${currentPrimaryColor} mr-auto font-bold text-2xl`}>{subject.subject_name}</p>
                    <div className="flex justify-evenly items-center ml-auto space-x-4">
                      <button
                        onClick={(e: React.SyntheticEvent) => {
                          e.preventDefault();
                          editSubjectDetails(subject);
                        }}
                        className="focus:outline-none"
                      >
                        <PencilIcon className={`text-${currentPrimaryColor} w-7`} />
                      </button>
                      <button
                        onClick={(e: React.SyntheticEvent) => {
                          e.preventDefault();
                          deleteSubjectDetails(subject.id && subject.id);
                        }}
                        className="focus:outline-none"
                      >
                        <TrashIcon className={`text-${currentSecondaryColor} w-7`} />
                      </button>
                    </div>
                  </div>
                  <div className="tabs">
                    <input
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSubject(
                          activeSubject === null
                            ? subject.subject_name
                            : activeSubject == subject.subject_name
                            ? null
                            : subject.subject_name,
                        );
                      }}
                      style={{ display: 'none' }}
                      checked={activeSubject === null ? false : activeSubject == subject.subject_name ? true : false}
                      type="checkbox"
                      id={`checkSubject${subject.id}`}
                    />
                    <label className="tab-label tab-label-subject py-2" htmlFor={`checkSubject${subject.id}`}>
                      <div>
                        <p
                          className={`flex justify-start items-center space-x-4 font-semibold text-${currentPrimaryColor}`}
                        >
                          {activeSubject === subject.subject_name ? 'Show Less' : 'View Topic Details'}
                          {/* {topicList.length} Topics) */}
                        </p>
                      </div>
                    </label>
                    {activeSubject === subject.subject_name && (
                      <div className="tab-content">
                        <TopicList subjectId={subject.id} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {!isLoading && itemList.length === 0 && (
        <p className="flex justify-center items-center p-8 w-full">No Subjects Found</p>
      )}
      {/* Confirm alert */}
      <ModalLayout title="alert" modalPosition={MODAL_POSITION.DEFAULT} closeModal={closeModal} isOpen={isDelete}>
        <ConfirmAlert confirmType="delete" confirmResponse={alertResponse} />
      </ModalLayout>
    </>
  );
};
