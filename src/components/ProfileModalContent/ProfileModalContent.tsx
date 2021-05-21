import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { USER_TYPE } from '../../app/entity/constant';
import { UserCircleIcon } from '@heroicons/react/solid';
import { AnnotationIcon } from '@heroicons/react/solid';
import { BellIcon } from '@heroicons/react/solid';
import { RootState } from '../../app/rootReducer';

interface Iprops {
  handleSignout: () => void;
}

export const ProfileModalContent: React.FC<Iprops> = ({ handleSignout }) => {
  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
  const [currentPrimaryColor, setCurrentPrimaryColor] = useState<string>('');
  const [currentSecondaryColor, setCurrentSecondaryColor] = useState<string>('');

  useEffect(() => {
    if (loggedInUser.role_id == USER_TYPE.SUPERADMIN) {
      setCurrentPrimaryColor('gsa_primary');
      setCurrentSecondaryColor('gsa_secondary');
    } else if (loggedInUser.role_id == USER_TYPE.ADMIN) {
      setCurrentPrimaryColor('ga_primary');
      setCurrentSecondaryColor('ga_secondary');
    } else if (loggedInUser.role_id == USER_TYPE.TUTOR) {
      setCurrentPrimaryColor('gt_primary');
      setCurrentSecondaryColor('gt_secondary');
    } else if (loggedInUser.role_id == USER_TYPE.SCHOOLSUPERADMIN) {
      setCurrentPrimaryColor('lsa_primary');
      setCurrentSecondaryColor('lsa_secondary');
    } else if (loggedInUser.role_id == USER_TYPE.SCHOOLADMIN) {
      setCurrentPrimaryColor('la_primary');
      setCurrentSecondaryColor('la_secondary');
    } else if (loggedInUser.role_id == USER_TYPE.SCHOOLTUTOR) {
      setCurrentPrimaryColor('lt_primary');
      setCurrentSecondaryColor('lt_secondary');
    } else {
      return;
    }
  }, [loggedInUser]);

  return (
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
          handleSignout();
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
  );
};
