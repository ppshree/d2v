/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { RootState } from '../../app/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { MODAL_POSITION, ROLES, USER_TYPE } from '../../app/entity/constant';
import { PencilIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/solid';
import { CustomeBadge } from '../../components/CustomeBadge/CustomeBadge';
import './UserTableList.css';
import { updateSelectedContentManager as updateSelectedContentManagerAsSuperadmin } from '../../containers/_superadmin/SuperAdminHomeSlice';
import { useColorUserType } from '../../app/heplers/useColorUserType';
import { ModalLayout } from '../shared/ModalLayout';
import { ConfirmAlert } from '../ConfirmAlert/ConfirmAlert';

interface Iprops {
  currentUserType: number;
  userList: any[];
}
export const UserTableList: React.FC<Iprops> = ({ userList, currentUserType }) => {
  const dispatch = useDispatch();
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [userForDelete, setUserForDelete] = useState<string>('');
  const { currentPrimaryColor, currentSecondaryColor } = useColorUserType();

  const editUserDetails = (user: any) => {
    const userObj = { ...user };
    userObj.isEditFlag = true;
    if (currentUserType === USER_TYPE.SUPERADMIN) {
      dispatch(updateSelectedContentManagerAsSuperadmin(userObj));
    }
  };

  const deleteUserDetails = (userId: string) => {
    setIsDelete(true);
    setUserForDelete(userId);
  };

  const alertResponse = (isConfirm: boolean) => {
    if (isConfirm) {
      if (currentUserType === USER_TYPE.SUPERADMIN) {
        console.log('Procedd for delete', userForDelete);
      } else if (currentUserType === USER_TYPE.ADMIN) {
        console.log('Procedd for delete', userForDelete);
      } else if (currentUserType === USER_TYPE.TUTOR) {
        console.log('Procedd for delete', userForDelete);
      } else if (currentUserType === USER_TYPE.CONTENTMANAGER) {
        console.log('Procedd for delete', userForDelete);
      } else if (currentUserType === USER_TYPE.SCHOOLSUPERADMIN) {
        console.log('Procedd for delete', userForDelete);
      } else if (currentUserType === USER_TYPE.SCHOOLADMIN) {
        console.log('Procedd for delete', userForDelete);
      } else if (currentUserType === USER_TYPE.SCHOOLTUTOR) {
        console.log('Procedd for delete', userForDelete);
      } else if (currentUserType === USER_TYPE.SCHOOLCONTENTMANAGER) {
        console.log('Procedd for delete', userForDelete);
      } else {
        return;
      }
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
                <>
                  <tr key={user.id} className="border-b-2">
                    <td className="font-semibold">{user.first_name + ' ' + user.last_name}</td>
                    <td className="font-normal">{user.email}</td>
                    <td className="font-normal">{user.mobile_number}</td>
                    <td className="font-normal">{user.school_code}</td>
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
                </>
              );
            })}
        </tbody>
      </table>
      {/* Confirm alert */}
      <ModalLayout title="alert" modalPosition={MODAL_POSITION.DEFAULT} closeModal={closeModal} isOpen={isDelete}>
        <ConfirmAlert confirmResponse={alertResponse} />
      </ModalLayout>
    </div>
  );
};
