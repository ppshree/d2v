/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { MODAL_POSITION, ROLES } from '../../app/entity/constant';
import { PencilIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/solid';
import './TagTableList.css';
import { useColorUserType } from '../../app/heplers/useColorUserType';
import { ModalLayout } from '../shared/ModalLayout';
import { ConfirmAlert } from '../ConfirmAlert/ConfirmAlert';

interface Iprops {
  tagList: any[];
  updateActionUser: (user: any) => void;
  deleteActionUser: (userId: string) => void;
}
export const TagTableList: React.FC<Iprops> = ({ tagList, updateActionUser, deleteActionUser }) => {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [userForDelete, setUserForDelete] = useState<string>('');
  const { currentPrimaryColor, currentSecondaryColor } = useColorUserType();

  const editUserDetails = (user: any) => {
    const userObj = { ...user };
    userObj.isEditFlag = true;
    updateActionUser(userObj);
  };

  const deleteUserDetails = (userId: string) => {
    setIsDelete(true);
    setUserForDelete(userId);
  };

  const alertResponse = (isConfirm: boolean) => {
    if (isConfirm) {
      deleteActionUser(userForDelete);
      closeModal();
    } else {
      closeModal();
    }
  };

  const closeModal = () => {
    setUserForDelete('');
    setIsDelete(false);
  };

  return (
    <div className="overflow-x-auto bordered">
      <table className="auto w-full">
        <thead>
          <tr className={`bg-${currentPrimaryColor} text-text_white`}>
            <th className="font-normal">Tag Name</th>
            <th className="font-normal">Created By</th>
            <th className="font-normal"></th>
            <th className="font-normal"></th>
          </tr>
        </thead>
        <tbody className="bg-text_white">
          {tagList.length > 0 &&
            tagList.map((tag: any) => {
              return (
                <>
                  <tr key={tag.id} className="border-b-2">
                    <td className="font-semibold">{tag.learning_outcome}</td>
                    <td className="font-normal">{tag.created_by}</td>
                    <td>
                      <button
                        onClick={(e: React.SyntheticEvent) => {
                          e.preventDefault();
                          editUserDetails(tag);
                        }}
                        className="focus:outline-none"
                      >
                        <PencilIcon className={`text-${currentPrimaryColor} w-5`} />
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={(e: React.SyntheticEvent) => {
                          e.preventDefault();
                          deleteUserDetails(tag.id);
                        }}
                        className="focus:outline-none"
                      >
                        <TrashIcon className={`text-${currentSecondaryColor} w-5`} />
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
      {tagList.length == 0 && <p className="flex justify-center items-center p-8 w-full">No User Found</p>}
      {/* Confirm alert */}
      <ModalLayout title="alert" modalPosition={MODAL_POSITION.DEFAULT} closeModal={closeModal} isOpen={isDelete}>
        <ConfirmAlert confirmResponse={alertResponse} />
      </ModalLayout>
    </div>
  );
};
