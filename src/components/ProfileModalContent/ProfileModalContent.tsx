import React from 'react';
import { useSelector } from 'react-redux';
import { UserCircleIcon } from '@heroicons/react/solid';
import { AnnotationIcon } from '@heroicons/react/solid';
import { BellIcon } from '@heroicons/react/solid';
import { RootState } from '../../app/rootReducer';
import { useColorUserType } from '../../app/heplers/useColorUserType';

interface Iprops {
  openLogoutModal: () => void;
}

export const ProfileModalContent: React.FC<Iprops> = ({ openLogoutModal }) => {
  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);

  const { currentPrimaryColor, currentSecondaryColor } = useColorUserType();

  return (
    /* wrapper inside modal layout */
    <>
      <div className="flex flex-col justify-evenly items-center space-y-2">
        <UserCircleIcon className={`w-8 text-${currentPrimaryColor}`} />
        <div className="text-center">
          <p>Good afternoon</p>
          <p>{loggedInUser.first_name}</p>
        </div>
        <div className="flex justify-center items-center space-x-2">
          <AnnotationIcon className={`cursor-pointer w-6 text-${currentPrimaryColor}`} />
          <BellIcon className={`cursor-pointer w-6 text-${currentPrimaryColor}`} />
        </div>
        <button
          className={`focus:outline-none rounded-md hover:shadow-lg bg-${currentPrimaryColor} py-0.5 text-text_white w-full`}
          onClick={(e: React.SyntheticEvent) => {
            e.preventDefault();
            openLogoutModal();
          }}
        >
          Logout
        </button>
        <button
          className={`focus:outline-none rounded-md hover:shadow-lg bg-${currentSecondaryColor} py-0.5 px-1.5 text-text_white w-full`}
          onClick={(e: React.SyntheticEvent) => {
            e.preventDefault();
          }}
        >
          Change Password
        </button>
      </div>
    </>
    /* wrapper inside modal layout */
  );
};
