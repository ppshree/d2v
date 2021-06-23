import React from 'react';
import './CustomeBadge.css';
import { USER_STATUS } from '../../app/entity/constant';

interface Iprops {
  statusType: string;
}

export const CustomeBadge: React.FC<Iprops> = ({ statusType }) => {
  return (
    <>
      {statusType === USER_STATUS.PENDING && (
        <div className="status-pending text-sm rounded-lg">{USER_STATUS.PENDING.toUpperCase()}</div>
      )}
      {statusType === 'Active' && <div className="status-active text-sm rounded-lg">{'Active'.toUpperCase()}</div>}
      {statusType === USER_STATUS.APPROVED && (
        <div className="status-approved text-sm rounded-lg">{USER_STATUS.APPROVED.toUpperCase()}</div>
      )}
      {statusType === USER_STATUS.DISCARDED && (
        <div className="status-discard text-sm rounded-lg">{USER_STATUS.DISCARDED.toUpperCase()}</div>
      )}
      {statusType === 'Not Active' && (
        <div className="status-notActive text-sm rounded-lg">{'Not Active'.toUpperCase()}</div>
      )}
    </>
  );
};
