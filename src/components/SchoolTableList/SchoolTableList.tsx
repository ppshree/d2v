/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { MODAL_POSITION } from '../../app/entity/constant';
import { PencilIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/solid';
import { CustomeBadge } from '../../components/CustomeBadge/CustomeBadge';
import './SchoolTableList.css';
import { useColorUserType } from '../../app/heplers/useColorUserType';
import { ModalLayout } from '../shared/ModalLayout';
import { ConfirmAlert } from '../ConfirmAlert/ConfirmAlert';

interface Iprops {
  schoolList: any[];
  updateActionSchool: (school: any) => void;
  deleteActionSchool: (schoolId: string) => void;
}

export const SchoolTableList: React.FC<Iprops> = ({ schoolList, updateActionSchool, deleteActionSchool }) => {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [schoolForDelete, setSchoolForDelete] = useState<string>('');
  const { currentPrimaryColor, currentSecondaryColor } = useColorUserType();

  const editUserDetails = (school: any) => {
    const schoolObj = { ...school };
    schoolObj.isEditFlag = true;
    updateActionSchool(schoolObj);
  };

  const deleteUserDetails = (schoolId: string) => {
    setIsDelete(true);
    setSchoolForDelete(schoolId);
  };

  const alertResponse = (isConfirm: boolean) => {
    if (isConfirm) {
      deleteActionSchool(schoolForDelete);
      closeModal();
    } else {
      closeModal();
    }
  };

  const closeModal = () => {
    setSchoolForDelete('');
    setIsDelete(false);
  };

  return (
    <div className="overflow-x-auto bordered">
      <table className="auto w-full">
        <thead>
          <tr className={`bg-${currentPrimaryColor} text-text_white`}>
            <th className="font-normal">School Name</th>
            <th className="font-normal">School Code</th>
            <th className="font-normal">Email</th>
            <th className="font-normal">Mobile Number</th>
            <th className="font-normal">Created By</th>
            <th className="font-normal">Status</th>
            <th className="font-normal"></th>
            <th className="font-normal"></th>
          </tr>
        </thead>
        <tbody className="bg-text_white">
          {schoolList.length > 0 &&
            schoolList.map((school: any) => {
              return (
                <>
                  <tr key={school.id} className="border-b-2">
                    <td className="font-semibold">{school.school_name}</td>
                    <td className="font-normal">{school.school_code}</td>
                    <td className="font-normal">{school.email}</td>
                    <td className="font-normal">{school.contact_number}</td>
                    <td className="font-normal">{school.authorized_by}</td>
                    <td className="font-semibold">
                      <CustomeBadge statusType={school.is_active ? 'Active' : 'Not Active'} />
                    </td>
                    <td>
                      <button
                        onClick={(e: React.SyntheticEvent) => {
                          e.preventDefault();
                          editUserDetails(school);
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
                          deleteUserDetails(school.id);
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
      {schoolList.length == 0 && <p className="flex justify-center items-center p-8 w-full">No School Found</p>}
      {/* Confirm alert */}
      <ModalLayout title="alert" modalPosition={MODAL_POSITION.DEFAULT} closeModal={closeModal} isOpen={isDelete}>
        <ConfirmAlert confirmResponse={alertResponse} />
      </ModalLayout>
    </div>
  );
};
