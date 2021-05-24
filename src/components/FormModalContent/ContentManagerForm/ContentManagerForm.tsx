import React, { useState, useEffect } from 'react';
import { USER_TYPE, USER_STATUS } from '../../../app/entity/constant';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import './ContentManager.css';
import { useColorUserType } from '../../../app/heplers/useColorUserType';
import { AlertBar } from '../../shared/AlertBar';

interface Iprops {
  handleCloseModal: () => void;
}

export const ContentManagerForm: React.FC<Iprops> = ({ handleCloseModal }) => {
  const dispatch = useDispatch();
  const { selectedContentManager: currentContentManager, formError: errorMessage, submitLoader: loader } = useSelector(
    (state: RootState) => state.SuperAdminHomePageReducer,
  );

  const { currentPrimaryColor, currentSecondaryColor } = useColorUserType();

  const [first_name, setFirstName] = useState<string>('');
  const [last_name, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile_number, setMobileNumber] = useState<string>('');
  const [standard, setStandard] = useState<string>('');
  const [role_id, setRoleId] = useState<string>('');
  const [school_code, setSchoolCode] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    if (currentContentManager) {
      setFirstName(currentContentManager?.first_name);
      setLastName(currentContentManager?.last_name);
      setEmail(currentContentManager?.email);
      setMobileNumber(currentContentManager?.mobile_number);
      setStandard(currentContentManager?.standard);
      setRoleId(currentContentManager?.role_id);
      setSchoolCode(currentContentManager?.school_code);
      setStatus(currentContentManager?.status);
    } else {
      return;
    }
  }, [currentContentManager]);

  const handleClosePopup = () => {
    handleCloseModal();
  };

  return (
    /* wrapper inside modal layout */
    <form>
      {errorMessage && <AlertBar message={errorMessage} />}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col h-20 justify-evenly">
          <label className="block text-gray-500 font-bold" htmlFor="first_name">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={first_name}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="enter first name"
            className="form-input px-4 py-1 rounded-lg"
          ></input>
        </div>
        <div className="flex flex-col h-20 justify-evenly">
          <label className="block text-gray-500 font-bold" htmlFor="last_name">
            Last Name
          </label>
          <input
            type="text"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            id="last_name"
            name="last_name"
            value={last_name}
            placeholder="enter last name"
            className="form-input px-4 py-1 rounded-lg"
          ></input>
        </div>
        <div className="flex flex-col h-20 justify-evenly">
          <label className="block text-gray-500 font-bold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="email"
            name="email"
            placeholder="enter email"
            value={email}
            className="form-input px-4 py-1 rounded-lg"
          ></input>
        </div>
        <div className="flex flex-col h-20 justify-evenly">
          <label className="block text-gray-500 font-bold" htmlFor="mobile_number">
            Mobile Number
          </label>
          <input
            type="number"
            id="mobile_number"
            onChange={(e) => {
              setMobileNumber(e.target.value);
            }}
            name="mobile_number"
            value={mobile_number}
            placeholder="enter mobile number"
            className="form-input px-4 py-1 rounded-lg"
          ></input>
        </div>
        <div className="flex flex-col h-20 justify-evenly">
          <label className="block text-gray-500 font-bold" htmlFor="standard">
            Standard
          </label>
          <select
            onChange={(e) => {
              setStandard(e.target.value);
            }}
            id="standard"
            name="standard"
            value={standard}
            className="form-select px-4 py-1 rounded-lg"
          >
            <option value="none">None</option>
            {['1', '2', '3'].map((standard: string) => {
              return (
                <option key={standard} value={standard}>
                  {standard}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col h-20 justify-evenly">
          <label className="block text-gray-500 font-bold" htmlFor="role_id">
            User Type
          </label>
          <select
            onChange={(e) => {
              setRoleId(e.target.value);
            }}
            id="role_id"
            name="role_id"
            value={role_id}
            className="form-select px-4 py-1 rounded-lg"
          >
            <option value="none">None</option>
            <option value={USER_TYPE.CONTENTMANAGER}>CONTENTMANAGER</option>
            <option value={USER_TYPE.SCHOOLCONTENTMANAGER}>SCHOOLCONTENTMANAGER</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <div className="flex flex-col h-20 justify-evenly">
          <label className="block text-gray-500 font-bold" htmlFor="school_code">
            School Name
          </label>
          <select
            onChange={(e) => {
              setSchoolCode(e.target.value);
            }}
            id="school_code"
            name="school_code"
            value={school_code}
            className="form-select px-4 py-1 rounded-lg"
          >
            <option value="none">None</option>
            <option value="Dps">DAV Public School</option>
            <option value="OPS">ODM Public School</option>
          </select>
        </div>
        <div className="flex flex-col h-25 justify-evenly space-y-2">
          <label className="block text-gray-500 font-bold">Status Type</label>
          {[USER_STATUS.PENDING, USER_STATUS.APPROVED, USER_STATUS.DISCARDED].map((type: string, idx: number) => {
            return (
              <div key={idx} className="flex-row space-x-2">
                <input
                  type="radio"
                  name={type}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                  checked={type === status ? true : false}
                  value={type}
                  className="form-radio rounded-lg"
                ></input>
                <label className="font-light text-gray-500" htmlFor="pending">
                  {type.toUpperCase()}
                </label>
              </div>
            );
          })}
        </div>
        <div className="flex flex-row space-x-2 text-text_white">
          <button
            onClick={(e: React.SyntheticEvent) => {
              e.preventDefault();
            }}
            className={`px-2 py-2 rounded-lg focus:outline-none bg-${currentPrimaryColor} w-full button`}
          >
            {currentContentManager?.isEditFlag ? (loader ? 'Updating...' : 'Update') : loader ? 'Adding...' : 'Add'}
          </button>
          <button
            onClick={(e: React.SyntheticEvent) => {
              e.preventDefault();
              handleClosePopup();
            }}
            className={`px-2 py-2 rounded-lg focus:outline-none bg-${currentSecondaryColor} w-full button`}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
    /* wrapper inside modal layout */
  );
};
