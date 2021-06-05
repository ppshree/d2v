/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import './FilterHeader.css';
import { SearchIcon } from '@heroicons/react/solid';
import { MailIcon } from '@heroicons/react/solid';
import { PhoneIcon } from '@heroicons/react/solid';
import { AcademicCapIcon } from '@heroicons/react/solid';
import { ClipboardCheckIcon } from '@heroicons/react/solid';
import { useColorUserType } from '../../app/heplers/useColorUserType';
import { ROLES, USER_STATUS, USER_TYPE } from '../../app/entity/constant';
interface Iprops {
  filterFor: string;
  setQueryName: React.Dispatch<React.SetStateAction<string>>;
  setQueryEmail?: React.Dispatch<React.SetStateAction<string>>;
  setQueryPhone?: React.Dispatch<React.SetStateAction<string>>;
  setQueryUserType?: React.Dispatch<React.SetStateAction<string>>;
  setQueryStatus?: React.Dispatch<React.SetStateAction<string | any>>;
}
export const FilterHeader: React.FC<Iprops> = ({
  filterFor,
  setQueryName,
  setQueryEmail,
  setQueryPhone,
  setQueryUserType,
  setQueryStatus,
}) => {
  const { currentSecondaryColor } = useColorUserType();
  return (
    <div className="flex flex-wrap justify-evenly items-center bg-white filter-shadow w-full sm:h-16 xsm:h-auto rounded-lg my-5 px-3 space-x-3">
      <div className="flex-1 flex justify-start search-box w-full h-12">
        <div className="m-auto w-full rounded-md border border-text_dark relative text-gray-600 ">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <SearchIcon className={`text-${currentSecondaryColor} w-6`} />
          </span>
          <input
            type="search"
            onChange={(e) => {
              setQueryName(e.target.value);
            }}
            name="name"
            className="py-2 w-full rounded-md pl-10 focus:outline-none"
            placeholder="Search By Name..."
            autoComplete="off"
          />
        </div>
      </div>
      {filterFor !== 'Tag' && (
        <div className="flex-1 flex justify-start email-box w-full h-12">
          <div className="m-auto w-full rounded-md border border-text_dark relative text-gray-600 ">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <MailIcon className={`text-${currentSecondaryColor} w-6`} />
            </span>
            <input
              type="search"
              onChange={(e) => {
                setQueryEmail && setQueryEmail(e.target.value);
              }}
              name="email"
              className="py-2 w-full rounded-md pl-10 focus:outline-none"
              placeholder="Search By Email..."
              autoComplete="off"
            />
          </div>
        </div>
      )}
      {filterFor !== 'Tag' && (
        <div className="flex-1 flex justify-start mobile-box w-full h-12">
          <div className="m-auto w-full rounded-md border border-text_dark relative text-gray-600 ">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <PhoneIcon className={`text-${currentSecondaryColor} w-6`} />
            </span>
            <input
              type="search"
              onChange={(e) => {
                setQueryPhone && setQueryPhone(e.target.value);
              }}
              name="phone"
              className="py-2 w-full rounded-md pl-10 focus:outline-none"
              placeholder="Search By Phone..."
              autoComplete="off"
            />
          </div>
        </div>
      )}
      {filterFor !== 'School' && filterFor !== 'Tag' && (
        <div className="flex-1 flex justify-start user-type-box w-full h-12">
          <div className="m-auto w-full rounded-md border border-text_dark relative text-gray-600 ">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <AcademicCapIcon className={`text-${currentSecondaryColor} w-6`} />
            </span>
            <select
              onChange={(e) => {
                setQueryUserType && setQueryUserType(e.target.value);
              }}
              id="userType"
              name="userType"
              className="py-2 rounded-md w-full pl-10 focus:outline-none"
            >
              <option value="">Filter By User</option>
              {filterFor === 'Admin' &&
                [USER_TYPE.ADMIN, USER_TYPE.SCHOOLSUPERADMIN, USER_TYPE.SCHOOLADMIN].map((userType: number) => {
                  return (
                    <option key={userType} value={userType}>
                      {ROLES[userType]}
                    </option>
                  );
                })}
              {filterFor === 'Tutor' &&
                [USER_TYPE.TUTOR, USER_TYPE.SCHOOLTUTOR].map((userType: number) => {
                  return (
                    <option key={userType} value={userType}>
                      {ROLES[userType]}
                    </option>
                  );
                })}
              {filterFor === 'Content Manager' &&
                [USER_TYPE.CONTENTMANAGER, USER_TYPE.SCHOOLCONTENTMANAGER].map((userType: number) => {
                  return (
                    <option key={userType} value={userType}>
                      {ROLES[userType]}
                    </option>
                  );
                })}
              {filterFor === 'Student' &&
                [USER_TYPE.STUDENT, USER_TYPE.SCHOOLSTUDENT].map((userType: number) => {
                  return (
                    <option key={userType} value={userType}>
                      {ROLES[userType]}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      )}
      {filterFor !== 'Tag' && (
        <div className="flex-1 flex justify-start status-box w-full h-12">
          <div className="m-auto w-full rounded-md border border-text_dark relative text-gray-600 ">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <ClipboardCheckIcon className={`text-${currentSecondaryColor} w-6`} />
            </span>
            <select
              onChange={(e) => setQueryStatus && setQueryStatus(e.target.value)}
              id="status"
              name="status"
              className="py-2 rounded-md w-full pl-10 focus:outline-none"
            >
              <option value="">Filter By Status</option>
              {filterFor !== 'School' &&
                [USER_STATUS.PENDING, USER_STATUS.APPROVED, USER_STATUS.DISCARDED].map((status: string) => {
                  return (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  );
                })}
              {filterFor === 'School' &&
                ['not-active', 'active'].map((status: string, idx: number) => {
                  return (
                    <option key={status} value={idx}>
                      {status}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
