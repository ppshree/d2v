/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { USER_TYPE, USER_STATUS, DEFAULT } from '../../../app/entity/constant';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import { useColorUserType } from '../../../app/heplers/useColorUserType';
import { AlertBar } from '../../shared/AlertBar';
import { retrieveAllSchool } from '../../../app/service/shared.service';
import { ICreateAdmin, ICreateSchool } from '../../../app/entity/model';

interface Iprops {
  addOrUpdateUser: (userObj: ICreateAdmin) => void;
  handleCloseModal: () => void;
}

export const AdminForm: React.FC<Iprops> = ({ handleCloseModal, addOrUpdateUser }) => {
  const dispatch = useDispatch();
  const { selectedAdmin: currentAdmin, formError: errorMessage, submitLoader: loader } = useSelector(
    (state: RootState) => state.SuperAdminHomePageReducer,
  );
  const { schoolList } = useSelector((state: RootState) => state.SchoolHomePageReducer);

  const { currentPrimaryColor, currentSecondaryColor } = useColorUserType();

  const [first_name, setFirstName] = useState<string>('');
  const [last_name, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile_number, setMobileNumber] = useState<string>('');
  const [role_id, setRoleId] = useState<string>('');
  const [school_id, setSchoolId] = useState<string>('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (role_id == USER_TYPE.SCHOOLSUPERADMIN.toString() || role_id == USER_TYPE.SCHOOLADMIN.toString()) {
      dispatch(retrieveAllSchool({ limit: 0, offset: 0 }));
    } else {
      setSchoolId('');
    }
  }, [role_id]);

  useEffect(() => {
    if (currentAdmin) {
      setFirstName(currentAdmin?.first_name);
      setLastName(currentAdmin?.last_name);
      setEmail(currentAdmin?.email);
      setMobileNumber(currentAdmin?.mobile_number);
      setRoleId(currentAdmin?.role_id);
      setSchoolId(currentAdmin.school_id);
      setStatus(currentAdmin?.status);
    } else {
      return;
    }
  }, [currentAdmin]);

  const handleFormSubmitAction = () => {
    const AdminFormData: ICreateAdmin = {
      id: currentAdmin?.id,
      first_name: first_name,
      last_name: last_name,
      email: email,
      mobile_number: mobile_number,
      role_id: role_id,
      school_id: school_id,
      school_code: currentAdmin?.school_code ? currentAdmin.school_code : DEFAULT.GLOBALSCHOOL,
      isEditFlag: currentAdmin?.isEditFlag ? currentAdmin.isEditFlag : false,
      status: status,
    };
    addOrUpdateUser(AdminFormData);
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
        {/* User Type Lists */}
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
            <option value={USER_TYPE.ADMIN}>GLOBAL ADMIN</option>
            <option value={USER_TYPE.SCHOOLSUPERADMIN}>SCHOOL SUPERADMIN</option>
            <option value={USER_TYPE.SCHOOLADMIN}>SCHOOL ADMIN</option>
          </select>
        </div>
        {/* School Code */}
        <div className="flex flex-col h-20 justify-evenly">
          <label className="block text-gray-500 font-bold" htmlFor="school_id">
            School Name
          </label>
          <select
            onChange={(e) => {
              setSchoolId(e.target.value);
            }}
            disabled={role_id === '' || role_id === 'none' || role_id == USER_TYPE.ADMIN.toString() ? true : false}
            id="school_id"
            name="school_id"
            value={school_id}
            className="form-select px-4 py-1 rounded-lg"
          >
            <option value="none">{role_id == USER_TYPE.ADMIN.toString() ? DEFAULT.GLOBALSCHOOL : 'None'}</option>
            {schoolList.length > 0 &&
              schoolList.map((school: ICreateSchool) => {
                return (
                  <option key={school.id} value={school.id}>
                    {school.school_name}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
      {/* School Lists */}
      <div className="grid grid-cols-1 gap-2">
        {/* Status Type */}
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
              handleFormSubmitAction();
            }}
            className={`px-2 py-2 rounded-lg focus:outline-none bg-${currentPrimaryColor} w-full button`}
          >
            {currentAdmin?.isEditFlag ? (loader ? 'Updating...' : 'Update') : loader ? 'Adding...' : 'Add'}
          </button>
          <button
            onClick={(e: React.SyntheticEvent) => {
              e.preventDefault();
              handleCloseModal();
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
