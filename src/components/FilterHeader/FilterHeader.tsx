import React from 'react';
import './FilterHeader.css';
import { SearchIcon } from '@heroicons/react/solid';
import { MailIcon } from '@heroicons/react/solid';
import { PhoneIcon } from '@heroicons/react/solid';
import { AcademicCapIcon } from '@heroicons/react/solid';
import { ClipboardCheckIcon } from '@heroicons/react/solid';
import { useColorUserType } from '../../app/heplers/useColorUserType';
import { USER_STATUS } from '../../app/entity/constant';
interface Iprops {
  filterFor: string;
}
export const FilterHeader: React.FC<Iprops> = ({ filterFor }) => {
  const { currentSecondaryColor } = useColorUserType();
  return (
    <div className="flex justify-evenly items-center bg-white filter-shadow w-full h-16 rounded-lg my-5 px-3 space-x-3">
      <div className="flex-1 flex justify-start search-box w-full h-12">
        <div className="m-auto w-full rounded-md border border-text_dark relative text-gray-600 ">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <SearchIcon className={`text-${currentSecondaryColor} w-6`} />
          </span>
          <input
            type="text"
            name="search"
            className="py-2 rounded-md pl-10 focus:outline-none"
            placeholder="Search any..."
            autoComplete="off"
          />
        </div>
      </div>
      <div className="flex-1 flex justify-start email-box w-full h-12">
        <div className="m-auto w-full rounded-md border border-text_dark relative text-gray-600 ">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <MailIcon className={`text-${currentSecondaryColor} w-6`} />
          </span>
          <select id="email" name="email" className="py-2 rounded-md w-full pl-10 focus:outline-none">
            <option value="none">None</option>
            {['1', '2', '3'].map((email: string) => {
              return (
                <option key={email} value={email}>
                  {email}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="flex-1 flex justify-start mobile-box w-full h-12">
        <div className="m-auto w-full rounded-md border border-text_dark relative text-gray-600 ">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <PhoneIcon className={`text-${currentSecondaryColor} w-6`} />
          </span>
          <select id="phone" name="phone" className="py-2 rounded-md w-full pl-10 focus:outline-none">
            <option value="none">None</option>
            {['1', '2', '3'].map((phone: string) => {
              return (
                <option key={phone} value={phone}>
                  {phone}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="flex-1 flex justify-start school-code-box w-full h-12">
        <div className="m-auto w-full rounded-md border border-text_dark relative text-gray-600 ">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <AcademicCapIcon className={`text-${currentSecondaryColor} w-6`} />
          </span>
          <select id="school" name="school" className="py-2 rounded-md w-full pl-10 focus:outline-none">
            <option value="none">None</option>
            {['1', '2', '3'].map((school: string) => {
              return (
                <option key={school} value={school}>
                  {school}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="flex-1 flex justify-start status-box w-full h-12">
        <div className="m-auto w-full rounded-md border border-text_dark relative text-gray-600 ">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <ClipboardCheckIcon className={`text-${currentSecondaryColor} w-6`} />
          </span>
          <select id="status" name="status" className="py-2 rounded-md w-full pl-10 focus:outline-none">
            <option value="none">None</option>
            {[USER_STATUS.PENDING, USER_STATUS.APPROVED, USER_STATUS.DISCARDED].map((status: string) => {
              return (
                <option key={status} value={status}>
                  {status}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};
