/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState, useEffect } from 'react';
import './FilterHeader.css';
import { SearchIcon } from '@heroicons/react/solid';
import { MailIcon } from '@heroicons/react/solid';
import { PhoneIcon } from '@heroicons/react/solid';
import { AcademicCapIcon } from '@heroicons/react/solid';
import { ClipboardCheckIcon } from '@heroicons/react/solid';
import { useColorUserType } from '../../app/heplers/useColorUserType';
import { ROLES, USER_STATUS, USER_TYPE } from '../../app/entity/constant';
interface Iprops {
  refer: string;
  filterObj?: any;
  setFilterObj: React.Dispatch<React.SetStateAction<any>>;
}
export const FilterHeader: React.FC<Iprops> = ({ refer, setFilterObj, filterObj }) => {
  const { currentSecondaryColor } = useColorUserType();

  /* filter State change */
  const [queryName, setQueryName] = useState<string>('');
  const [queryEmail, setQueryEmail] = useState<string>('');
  const [queryPhone, setQueryPhone] = useState<string>('');
  const [queryUserType, setQueryUserType] = useState<string>('');
  const [queryStatus, setQueryStatus] = useState<string>('');
  /* filter State change*/

  /* filter input ref */
  const inputName = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPhone = useRef<HTMLInputElement>(null);
  const userType = useRef<HTMLSelectElement>(null);
  const status = useRef<HTMLSelectElement>(null);
  /* filter input ref */

  useEffect(() => {
    let timer: any;
    if (document.activeElement === inputName.current) {
      timer = setTimeout(() => {
        setFilterObj({
          ...filterObj,
          name: queryName,
        });
      }, 500);
      return () => clearTimeout(timer);
    } else if (document.activeElement === inputEmail.current) {
      timer = setTimeout(() => {
        setFilterObj({
          ...filterObj,
          email: queryEmail,
        });
      }, 500);
      return () => clearTimeout(timer);
    } else if (document.activeElement === inputPhone.current) {
      timer = setTimeout(() => {
        setFilterObj({
          ...filterObj,
          mobile_number: queryPhone,
        });
      }, 500);
      return () => clearTimeout(timer);
    } else if (document.activeElement === userType.current) {
      timer = setTimeout(() => {
        setFilterObj({
          ...filterObj,
          role_id: queryUserType,
        });
      }, 500);
      return () => clearTimeout(timer);
    } else if (document.activeElement === status.current) {
      timer = setTimeout(() => {
        setFilterObj({
          ...filterObj,
          status: queryStatus,
        });
      }, 500);
      return () => clearTimeout(timer);
    } else {
      return;
    }
  }, [queryName, queryEmail, queryPhone, queryUserType, queryStatus]);

  return (
    <div className="flex flex-wrap justify-start items-center bg-white filter-shadow w-full sm:h-16 xsm:h-auto rounded-lg my-5 px-3 space-x-3">
      <div className="flex justify-start search-box w-auto h-12">
        <div className="m-auto w-auto rounded-md border border-text_dark relative text-gray-600 ">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <SearchIcon className={`text-${currentSecondaryColor} w-6`} />
          </span>
          <input
            ref={inputName}
            type="search"
            name="name"
            onChange={(e) => {
              setQueryName(e.target.value);
            }}
            className="py-2 w-full rounded-md pl-10 focus:outline-none"
            placeholder="Search By Name..."
            autoComplete="off"
          />
        </div>
      </div>
      {refer !== 'Tag' && (
        <div className="flex justify-start email-box w-auto h-12">
          <div className="m-auto w-full rounded-md border border-text_dark relative text-gray-600 ">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <MailIcon className={`text-${currentSecondaryColor} w-6`} />
            </span>
            <input
              ref={inputEmail}
              onChange={(e) => {
                setQueryEmail(e.target.value);
              }}
              type="search"
              name="email"
              className="py-2 w-full rounded-md pl-10 focus:outline-none"
              placeholder="Search By Email..."
              autoComplete="off"
            />
          </div>
        </div>
      )}
      {refer !== 'Tag' && (
        <div className="flex justify-start mobile-box w-auto h-12">
          <div className="m-auto w-full rounded-md border border-text_dark relative text-gray-600 ">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <PhoneIcon className={`text-${currentSecondaryColor} w-6`} />
            </span>
            <input
              ref={inputPhone}
              onChange={(e) => {
                setQueryPhone(e.target.value);
              }}
              type="search"
              name="phone"
              className="py-2 w-full rounded-md pl-10 focus:outline-none"
              placeholder="Search By Phone..."
              autoComplete="off"
            />
          </div>
        </div>
      )}
      {refer !== 'School' && refer !== 'Tag' && (
        <div className="flex-1 flex justify-start user-type-box w-auto h-12">
          <div className="m-auto w-full rounded-md border border-text_dark relative text-gray-600 ">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <AcademicCapIcon className={`text-${currentSecondaryColor} w-6`} />
            </span>
            <select
              ref={userType}
              onChange={(e) => {
                setQueryUserType(e.target.value);
              }}
              id="userType"
              name="userType"
              className="py-2 rounded-md w-full pl-10 focus:outline-none"
            >
              <option value="">Filter By User</option>
              {refer === 'Admin' &&
                [USER_TYPE.ADMIN, USER_TYPE.SCHOOLSUPERADMIN, USER_TYPE.SCHOOLADMIN].map((userType: number) => {
                  return (
                    <option key={userType} value={userType}>
                      {ROLES[userType]}
                    </option>
                  );
                })}
              {refer === 'Tutor' &&
                [USER_TYPE.TUTOR, USER_TYPE.SCHOOLTUTOR].map((userType: number) => {
                  return (
                    <option key={userType} value={userType}>
                      {ROLES[userType]}
                    </option>
                  );
                })}
              {refer === 'Content Manager' &&
                [USER_TYPE.CONTENTMANAGER, USER_TYPE.SCHOOLCONTENTMANAGER].map((userType: number) => {
                  return (
                    <option key={userType} value={userType}>
                      {ROLES[userType]}
                    </option>
                  );
                })}
              {refer === 'Student' &&
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
      {refer !== 'Tag' && (
        <div className="flex-1 flex justify-start status-box w-full h-12">
          <div className="m-auto w-full rounded-md border border-text_dark relative text-gray-600 ">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <ClipboardCheckIcon className={`text-${currentSecondaryColor} w-6`} />
            </span>
            <select
              ref={status}
              onChange={(e) => {
                setQueryStatus(e.target.value);
              }}
              id="status"
              name="status"
              className="py-2 rounded-md w-full pl-10 focus:outline-none"
            >
              <option value="">Filter By Status</option>
              {refer !== 'School' &&
                [USER_STATUS.PENDING, USER_STATUS.APPROVED, USER_STATUS.DISCARDED].map((status: string) => {
                  return (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  );
                })}
              {refer === 'School' &&
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
