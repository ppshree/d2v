/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MODAL_POSITION } from '../../app/entity/constant';
import { PencilIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/solid';
import './ClassList.css';
import { useColorUserType } from '../../app/heplers/useColorUserType';
import { ModalLayout } from '../shared/ModalLayout';
import { ConfirmAlert } from '../ConfirmAlert/ConfirmAlert';
import ClassImage from '../../asset/class/class-3.svg';
import { updateActivePanel } from '../../containers/LoginPage/LoginPageSlice';

interface Iprops {
  classList: any[];
  refer?: string;
  updateActionClass: (standard: any) => void;
  deleteActionClass: (classId: string) => void;
}
export const ClassList: React.FC<Iprops> = ({ refer, classList, updateActionClass, deleteActionClass }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [classForDelete, setClassForDelete] = useState<string>('');
  const { currentPrimaryColor, currentSecondaryColor } = useColorUserType();
  const editClassDetails = (standard: any) => {
    const classObj = { ...standard };
    classObj.isEditFlag = true;
    updateActionClass(classObj);
  };

  const deleteClassDetails = (classId: string) => {
    setIsDelete(true);
    setClassForDelete(classId);
  };

  const alertResponse = (isConfirm: boolean) => {
    if (isConfirm) {
      deleteActionClass(classForDelete);
      closeModal();
    } else {
      closeModal();
    }
  };

  const closeModal = () => {
    setClassForDelete('');
    setIsDelete(false);
  };

  const redirectSubjectPage = (className: string, classID: string) => {
    dispatch(updateActivePanel('Subjects'));
    history.push(`/course/${className}/${classID}/subjects`);
  };
  return (
    <>
      <div className="flex justify-center items-center flex-wrap h-full w-full px-8 py-8">
        {classList.length > 0 &&
          classList.map((standard: any) => {
            return (
              <div
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  redirectSubjectPage(standard.standard_name, standard.id);
                }}
                key={standard.id}
                className="cursor-pointer flex flex-col justify-start items-center sm:w-44 xsm:w-56 sm:h-44 xsm:h-48 sm:mr-10 xsm:mr-0 sm:mt-12 xsm:mt-14 bg-text_white card-shadow"
              >
                <div className={`sm:w-44 xsm:w-56 h-2 bg-${currentPrimaryColor} rounded-lg relative`}>
                  <img className="class-logo" src={ClassImage} alt="class-img" />
                </div>
                <div className={`w-full h-full flex-3 flex flex-col justify-evenly items-center p-5`}>
                  <p className={`font-semibold text-xl text-${currentPrimaryColor}`}>Class {standard.standard_name}</p>
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        editClassDetails(standard);
                      }}
                      className="focus:outline-none"
                    >
                      <PencilIcon className={`text-${currentPrimaryColor} w-5`} />
                    </button>
                    <button
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        deleteClassDetails(standard.id);
                      }}
                      className="focus:outline-none"
                    >
                      <TrashIcon className={`text-${currentSecondaryColor} w-5`} />
                    </button>
                  </div>
                </div>
                <div className="flex-1 flex flex-col space-y-1 items-center py-3">
                  <div className="flex justify-evenly items-center w-full">
                    <div className="w-8 h-0.5 bg-text_grey"></div>
                    <p className="font-normal text-text_grey px-2 text-sm">Create By</p>
                    <div className="w-8 h-0.5 bg-text_grey"></div>
                  </div>
                  <p className="font-normal text-text_grey px-0.5 text-sm">{standard.created_by}</p>
                </div>
              </div>
            );
          })}
      </div>
      {classList.length == 0 && <p className="flex justify-center items-center p-8 w-full">No Course Found</p>}
      {/* Confirm alert */}
      <ModalLayout title="alert" modalPosition={MODAL_POSITION.DEFAULT} closeModal={closeModal} isOpen={isDelete}>
        <ConfirmAlert confirmResponse={alertResponse} />
      </ModalLayout>
    </>
  );
};
