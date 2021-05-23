/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { RootState } from '../../app/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, USER_TYPE, ROLES } from '../../app/entity/constant';
import { PencilIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/solid';
import { CustomeBadge } from '../../components/CustomeBadge/CustomeBadge';
import './UserTableList.css';

interface Iprops {
  userList: any[];
}
export const UserTableList: React.FC<Iprops> = ({ userList }) => {
  const [currentPrimaryColor, setCurrentPrimaryColor] = useState<string>('');
  const [currentSecondaryColor, setCurrentSecondaryColor] = useState<string>('');

  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);

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
    <>
      <table className="auto w-full bordered">
        <thead>
          <tr className={`bg-${currentPrimaryColor} text-text_white`}>
            <th className="font-normal">Full Name</th>
            <th className="font-normal">Email</th>
            <th className="font-normal">Mobile Number</th>
            <th className="font-normal">School Code</th>
            <th className="font-normal">User Type</th>
            <th className="font-normal">Created By</th>
            <th className="font-normal">Status</th>
            <th className="font-normal"></th>
            <th className="font-normal"></th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 &&
            userList.map((user: any) => {
              return (
                <>
                  <tr key={user.id} className="border-b-2">
                    <td className="font-semibold">{user.first_name + ' ' + user.last_name}</td>
                    <td className="font-normal">{user.email}</td>
                    <td className="font-normal">{user.mobile_number}</td>
                    <td className="font-normal">{user.school_code}</td>
                    <td className="font-semibold">{ROLES[parseInt(user.role_id)]}</td>
                    <td className="font-normal">{user.created_by}</td>
                    <td className="font-semibold">
                      <CustomeBadge statusType={user.status} />
                    </td>
                    <td>
                      <button className="focus:outline-none">
                        <PencilIcon className={`text-${currentPrimaryColor} w-5`} />
                      </button>
                    </td>
                    <td>
                      <button className="focus:outline-none">
                        <TrashIcon className={`text-${currentSecondaryColor} w-5`} />
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
