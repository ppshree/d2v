import React from 'react';
import { useColorUserType } from '../../app/heplers/useColorUserType';

interface Iprops {
  confirmResponse: (isConfirm: boolean) => void;
}
export const ConfirmAlert: React.FC<Iprops> = ({ confirmResponse }) => {
  const { currentPrimaryColor, currentSecondaryColor } = useColorUserType();
  return (
    /* wrapper inside modal layout */
    <div className="flex flex-col space-y-2">
      <p className="font-bold text-2xl">Confirm to Delete</p>
      <p>Are you sure to delete this ?</p>
      <div className="flex justify-start items-center text-white my-6">
        <button
          onClick={(e: React.SyntheticEvent) => {
            e.preventDefault();
            confirmResponse(false);
          }}
          className={`bg-${currentSecondaryColor} button w-32 h-8 rounded-lg focus:outline-none px-4`}
        >
          Cancel
        </button>
        <button
          onClick={(e: React.SyntheticEvent) => {
            e.preventDefault();
            confirmResponse(true);
          }}
          className={`bg-${currentPrimaryColor} button w-32 h-8 rounded-lg focus:outline-none px-4 ml-5`}
        >
          Confirm
        </button>
      </div>
    </div>
    /* wrapper inside modal layout */
  );
};
