import React, { FC, useEffect, useState } from 'react';
import { RootState } from '../../app/rootReducer';
import { useSelector } from 'react-redux';
import { USER_TYPE, COLORS } from '../../app/entity/constant';
import { PlusIcon } from '@heroicons/react/solid';
import { ChevronDownIcon } from '@heroicons/react/solid';
import './Header.css';

interface Iprops {
  title?: string;
  handleModalOpen?: () => void;
}

export const Header: FC<Iprops> = ({ title, handleModalOpen }) => {
  const { loggedInUser, activePanel: activeMenu } = useSelector((state: RootState) => state.LoginPageReducer);
  const [currentPrimaryColor, setCurrentPrimaryColor] = useState<string>('');
  const [currentSecondaryColor, setCurrentSecondaryColor] = useState<string>('');
  useEffect(() => {
    if (loggedInUser.role_id == USER_TYPE.SUPERADMIN) {
      setCurrentPrimaryColor(COLORS.GSA_PRIMARY);
      setCurrentSecondaryColor(COLORS.GSA_SECONDARY);
    } else if (loggedInUser.role_id == USER_TYPE.ADMIN) {
      setCurrentPrimaryColor(COLORS.GA_PRIMARY);
      setCurrentSecondaryColor(COLORS.GA_SECONDARY);
    } else if (loggedInUser.role_id == USER_TYPE.TUTOR) {
      setCurrentPrimaryColor(COLORS.GT_PRIMARY);
      setCurrentSecondaryColor(COLORS.GT_SECONDARY);
    } else if (loggedInUser.role_id == USER_TYPE.SCHOOLSUPERADMIN) {
      setCurrentPrimaryColor(COLORS.LSA_PRIMARY);
      setCurrentSecondaryColor(COLORS.LSA_SECONDARY);
    } else if (loggedInUser.role_id == USER_TYPE.SCHOOLADMIN) {
      setCurrentPrimaryColor(COLORS.LA_PRIMARY);
      setCurrentSecondaryColor(COLORS.LA_SECONDARY);
    } else if (loggedInUser.role_id == USER_TYPE.SCHOOLTUTOR) {
      setCurrentPrimaryColor(COLORS.LT_PRIMARY);
      setCurrentSecondaryColor(COLORS.LT_SECONDARY);
    } else {
      return;
    }
  }, [loggedInUser]);
  return (
    <div className={`w-full flex mt-1 sm:flex-row xsm:flex-col justify-center  items-center header-postion`}>
      <h2 className={`flex-1 font-sans pt-3 font-normal text-${currentPrimaryColor} text-3xl`}>{activeMenu}</h2>
      {title && handleModalOpen && (
        <div className="flex sm:flex-row xsm:flex-col justify-end sm:h-16 xsm:h-28 items-center flex-1 sm:space-x-3 sm:mt-0 xsm:mt-2 text-text_white">
          <button
            className={`bg-${currentSecondaryColor} w-60 p-2 focus:outline-none rounded-md button flex justify-center items-center`}
          >
            <ChevronDownIcon className="w-5" />
            Export into CSV
          </button>
          <button
            onClick={(e: React.SyntheticEvent) => {
              e.preventDefault();
              handleModalOpen();
            }}
            className={`bg-${currentPrimaryColor} w-60 p-2 focus:outline-none rounded-md button flex justify-center sm:mt-0 xsm:mt-3 items-center`}
          >
            <PlusIcon className="w-5" />
            Add new {title}
          </button>
        </div>
      )}
    </div>
  );
};
