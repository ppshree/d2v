/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState, useEffect } from 'react';
import { RootState } from '../rootReducer';
import { useSelector } from 'react-redux';
import { COLORS, USER_TYPE } from '../entity/constant';

export const useColorUserType = () => {
  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
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
    } else if (loggedInUser.role_id == USER_TYPE.CONTENTMANAGER) {
      setCurrentPrimaryColor(COLORS.GCM_PRIMARY);
      setCurrentSecondaryColor(COLORS.GCM_SECONDARY);
    } else if (loggedInUser.role_id == USER_TYPE.SCHOOLSUPERADMIN) {
      setCurrentPrimaryColor(COLORS.LSA_PRIMARY);
      setCurrentSecondaryColor(COLORS.LSA_SECONDARY);
    } else if (loggedInUser.role_id == USER_TYPE.SCHOOLADMIN) {
      setCurrentPrimaryColor(COLORS.LA_PRIMARY);
      setCurrentSecondaryColor(COLORS.LA_SECONDARY);
    } else if (loggedInUser.role_id == USER_TYPE.SCHOOLTUTOR) {
      setCurrentPrimaryColor(COLORS.LT_PRIMARY);
      setCurrentSecondaryColor(COLORS.LT_SECONDARY);
    } else if (loggedInUser.role_id == USER_TYPE.SCHOOLCONTENTMANAGER) {
      setCurrentPrimaryColor(COLORS.LCM_PRIMARY);
      setCurrentSecondaryColor(COLORS.LCM_SECONDARY);
    } else {
      return;
    }
  }, [loggedInUser]);
  return { currentPrimaryColor, currentSecondaryColor };
};
