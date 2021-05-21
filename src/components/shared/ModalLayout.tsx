import React from 'react';
import { XCircleIcon } from '@heroicons/react/solid';

interface Iprops {
  children: React.ReactElement;
  isOpen: boolean;
  closeModal: () => void;
  modalPosition: string;
}

export const ModalLayout: React.FC<Iprops> = ({ children, isOpen, closeModal, modalPosition }) => {
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
              className="hidden sm:inline-block sm:align-bottom sm:h-screen xsm:inline-block xsm:align-bottom xsm:h-auto"
              aria-hidden="true"
            >
              &#8203;
            </span>
            {/* Modal panel, show/hide according to state */}
            <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full xsm:my-8 xsm:align-bottom xsm:max-w-lg xsm:w-full">
              <div className="bg-white">
                <div className="flex justify-end items-center mx-1 my-1">
                  <XCircleIcon
                    onClick={(e: React.SyntheticEvent) => {
                      e.preventDefault();
                      closeModal();
                    }}
                    className="cursor-pointer w-6"
                  />
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
