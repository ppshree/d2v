import React, { FC, useEffect, useState } from 'react';
import { RootState } from '../../app/rootReducer';
import { useSelector } from 'react-redux';
import { USER_TYPE } from '../../app/entity/constant';
import './Header.css';
interface IProps {
  w: string;
}

export const Header: FC<IProps> = ({ w }) => {
  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
  const [currentPrimaryColor, setCurrentPrimaryColor] = useState<string>('');
  const [userType, setuserType] = useState<string>('');
  useEffect(() => {
    if (loggedInUser.role_id == USER_TYPE.SUPERADMIN) {
      setCurrentPrimaryColor('gsa_primary');
      setuserType('SUPERADMIN');
    } else if (loggedInUser.role_id == USER_TYPE.ADMIN) {
      setCurrentPrimaryColor('ga_primary');
      setuserType('ADMIN');
    } else if (loggedInUser.role_id == USER_TYPE.TUTOR) {
      setCurrentPrimaryColor('gt_primary');
      setuserType('TUTOR');
    } else if (loggedInUser.role_id == USER_TYPE.SCHOOLSUPERADMIN) {
      setCurrentPrimaryColor('lsa_primary');
      setuserType('SCHOOLSUPERADMIN');
    } else if (loggedInUser.role_id == USER_TYPE.SCHOOLADMIN) {
      setCurrentPrimaryColor('la_primary');
      setuserType('SCHOOLADMIN');
    } else if (loggedInUser.role_id == USER_TYPE.SCHOOLTUTOR) {
      setCurrentPrimaryColor('lt_primary');
      setuserType('SCHOOLTUTOR');
    } else {
      return;
    }
  }, [loggedInUser]);
  return (
    <div className={`flex-3 fixed sm:inset-x-0 header-postion top-0 h-16`}>
      <div className={`font-sans pt-3 ${w} text-${currentPrimaryColor} font-bold text-3xl`}>{userType}</div>
    </div>
  );
};
