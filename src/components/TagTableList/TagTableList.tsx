/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { MODAL_POSITION } from '../../app/entity/constant';
import { PencilIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/solid';
import './TagTableList.css';
import { useColorUserType } from '../../app/heplers/useColorUserType';
import { ModalLayout } from '../shared/ModalLayout';
import { ConfirmAlert } from '../ConfirmAlert/ConfirmAlert';
import { Loader } from '../Loader/Loader';

interface Iprops {
  itemList: any[];
  isLoading?: boolean;
  updateAction: (tag: any) => void;
  deleteAction: (tagId: string) => void;
}
export const TagTableList: React.FC<Iprops> = ({ itemList, isLoading, updateAction, deleteAction }) => {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [tagForDelete, setTagForDelete] = useState<string>('');
  const { currentPrimaryColor, currentSecondaryColor } = useColorUserType();

  const editTagDetails = (tag: any) => {
    const tagObj = { ...tag };
    tagObj.isEditFlag = true;
    updateAction(tagObj);
  };

  const deleteTagDetails = (tagId: string) => {
    setIsDelete(true);
    setTagForDelete(tagId);
  };

  const alertResponse = (isConfirm: boolean) => {
    if (isConfirm) {
      deleteAction(tagForDelete);
      closeModal();
    } else {
      closeModal();
    }
  };

  const closeModal = () => {
    setTagForDelete('');
    setIsDelete(false);
  };

  return (
    <div className="my-3">
      <div className="overflow-x-auto bordered">
        {isLoading && <Loader />}
        {!isLoading && (
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
              {itemList.length > 0 &&
                itemList.map((tag: any) => {
                  return (
                    <>
                      <tr key={tag.id} className="border-b-2">
                        <td className="font-semibold">{tag.learning_outcome}</td>
                        <td className="font-normal">{tag.created_by}</td>
                        <td>
                          <button
                            onClick={(e: React.SyntheticEvent) => {
                              e.preventDefault();
                              editTagDetails(tag);
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
                              deleteTagDetails(tag.id);
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
        )}
        {!isLoading && itemList.length == 0 && (
          <p className="flex justify-center items-center p-8 w-full">No Tags Found</p>
        )}
        {/* Confirm alert */}
        <ModalLayout title="alert" modalPosition={MODAL_POSITION.DEFAULT} closeModal={closeModal} isOpen={isDelete}>
          <ConfirmAlert confirmType="delete" confirmResponse={alertResponse} />
        </ModalLayout>
      </div>
    </div>
  );
};
