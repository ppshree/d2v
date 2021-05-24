import React from 'react';
import { XCircleIcon } from '@heroicons/react/solid';
import { MODAL_POSITION } from '../../app/entity/constant';
import { useColorUserType } from '../../app/heplers/useColorUserType';

interface Iprops {
  children: React.ReactElement;
  isOpen: boolean;
  closeModal: () => void;
  modalPosition: string;
  title?: string;
}

export const ModalLayout: React.FC<Iprops> = ({ children, isOpen, closeModal, modalPosition, title }) => {
  const { currentPrimaryColor } = useColorUserType();
  return (
    <>
      {isOpen && (
        <div
          className={`fixed z-10 ${modalPosition} overflow-y-auto`}
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex justify-center h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 xsm:block xsm:p-0">
            {/* Background Overlay */}
            <div className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span
              className={
                modalPosition === MODAL_POSITION.DEFAULT
                  ? `hidden sm:inline-block sm:align-middle sm:h-screen xsm:inline-block xsm:align-middle xsm:h-full`
                  : `hidden sm:inline-block sm:align-bottom sm:h-screen xsm:inline-block xsm:align-bottom xsm:h-full`
              }
              aria-hidden="true"
            >
              &#8203;
            </span>
            {/* Modal panel, show/hide according to state */}
            <div
              className={
                modalPosition === MODAL_POSITION.DEFAULT
                  ? 'inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 sm:align-middle max-w-lg w-full my-8 align-middle max-w-lg w-full'
                  : 'inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 sm:align-middle max-w-lg w-full xsm:align-bottom'
              }
            >
              <div className="bg-white">
                <div
                  className={
                    title && title !== 'alert'
                      ? `flex justify-end items-center bg-${currentPrimaryColor} rounded-md h-12 text-text_white px-5`
                      : 'flex justify-end items-center mx-1 my-1'
                  }
                >
                  {title && title !== 'alert' && <p className="mx-auto font-semibold">{title}</p>}
                  {title !== 'alert' && (
                    <XCircleIcon
                      onClick={(e: React.SyntheticEvent) => {
                        e.preventDefault();
                        closeModal();
                      }}
                      className="cursor-pointer w-6"
                    />
                  )}
                </div>
                <div className="bg-white px-2 pt-5 pb-4 sm:p-5 sm:pb-4">{children}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
