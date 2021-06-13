/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { MODAL_POSITION, ROLES } from '../../app/entity/constant';
import { PencilIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/solid';
import { CustomeBadge } from '../../components/CustomeBadge/CustomeBadge';
import './UserTableList.css';
import { useColorUserType } from '../../app/heplers/useColorUserType';
import { ModalLayout } from '../shared/ModalLayout';
import { ConfirmAlert } from '../ConfirmAlert/ConfirmAlert';

interface Iprops {
  userList: any[];
  refer?: string;
  updateActionUser: (user: any) => void;
  deleteActionUser: (userId: string) => void;
}
export const UserTableList: React.FC<Iprops> = ({ refer, userList, updateActionUser, deleteActionUser }) => {
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
            <th className="font-normal">Full Name</th>
            <th className="font-normal">Email</th>
            <th className="font-normal">Mobile Number</th>
            <th className="font-normal">School Code</th>
            {refer && refer === 'Student' && <th className="font-normal">Student ID</th>}
            <th className="font-normal">User Type</th>
            <th className="font-normal">Created By</th>
            <th className="font-normal">Status</th>
            <th className="font-normal"></th>
            <th className="font-normal"></th>
          </tr>
        </thead>
        <tbody className="bg-text_white">
          {userList.length > 0 &&
            userList.map((user: any) => {
              return (
                <tr key={user.id} className="border-b-2">
                  <td className="font-semibold">{user.name}</td>
                  <td className="font-normal">{user.email}</td>
                  <td className="font-normal">{user.mobile_number}</td>
                  <td className="font-normal">{user.school_code}</td>
                  {refer && refer === 'Student' && <td className="font-normal">{user.student_id}</td>}
                  <td className="font-semibold">{ROLES[parseInt(user.role_id)]}</td>
                  <td className="font-normal">{user.created_by}</td>
                  <td className="font-semibold">
                    <CustomeBadge statusType={user.status} />
                  </td>
                  <td>
                    <button
                      onClick={(e: React.SyntheticEvent) => {
                        e.preventDefault();
                        editUserDetails(user);
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
                        deleteUserDetails(user.id);
                      }}
                      className="focus:outline-none"
                    >
                      <TrashIcon className={`text-${currentSecondaryColor} w-5`} />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {userList.length == 0 && <p className="flex justify-center items-center p-8 w-full">No User Found</p>}
      {/* Confirm alert */}
      <ModalLayout title="alert" modalPosition={MODAL_POSITION.DEFAULT} closeModal={closeModal} isOpen={isDelete}>
        <ConfirmAlert confirmResponse={alertResponse} />
      </ModalLayout>
    </div>
  );
};
