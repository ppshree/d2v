import React from 'react';

interface IProps {
  closeModal?: () => void;
}

export const AdminModalContent: React.FC<IProps> = ({ closeModal }) => {
  return (
    <form className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-3">
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">First Name</label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="admin-first-name"
            type="text"
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Last Name</label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="admin-last-name"
            type="text"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-3">
        <div className="w-full md:w-1/2 px-3 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Email Address</label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="admin-email-address"
            type="text"
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Mobile Number</label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="admin-mobile-number"
            type="text"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-3">
        <div className="w-full md:w-1/2 px-3 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">User Type</label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-user-type"
            >
              <option>Super Admin</option>
              <option>Global Admin</option>
              <option>Local Admin</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 25 25"
                stroke="currentColor"
              >
                {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /> */}
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">School Code</label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Status Type</label>
        <input type="radio" id="pending" name="status" value="pending" />
        <label className="pl-2">Pending</label>
        <br />
        <input type="radio" id="approved" name="status" value="approved" />
        <label className="pl-2">Approved</label>
        <br />
        <input type="radio" id="discarded" name="status" value="approved" />
        <label className="pl-2">Discarded</label>
        <br />
      </div>
    </form>
  );
};
