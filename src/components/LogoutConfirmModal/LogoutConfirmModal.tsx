import React from 'react';
import { useColorUserType } from '../../app/heplers/useColorUserType';
import logoutGif from '../../asset/logout.gif';
import './LogoutConfirmModal.css';

interface Iprops {
  confirmResponse: (isConfirm: boolean) => void;
}
export const LogoutConfirmModal: React.FC<Iprops> = ({ confirmResponse }) => {
  const { currentPrimaryColor, currentSecondaryColor } = useColorUserType();
  return (
    /* wrapper inside modal layout */
    <div className="flex flex-col justify-center items-center">
      <img className="logoutGif" src={logoutGif} />
      <p>
        Are you sure to <span className={`text-${currentPrimaryColor} font-bold`}>LOGOUT ?</span>
      </p>
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
