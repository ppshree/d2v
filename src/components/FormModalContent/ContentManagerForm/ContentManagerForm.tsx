/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { USER_TYPE, USER_STATUS, DEFAULT } from '../../../app/entity/constant';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import './ContentManager.css';
import { useColorUserType } from '../../../app/heplers/useColorUserType';
import { AlertBar } from '../../shared/AlertBar';
import { retrieveAllSchool, retrieveAllClass } from '../../../app/service/shared.service';
import { IClass, ICreateContentManager, ICreateSchool } from '../../../app/entity/model';

interface Iprops {
  addOrUpdateUser: (userObj: ICreateContentManager) => void;
  handleCloseModal: () => void;
}

export const ContentManagerForm: React.FC<Iprops> = ({ handleCloseModal, addOrUpdateUser }) => {
  const dispatch = useDispatch();
  const { selectedContentManager: currentContentManager, formError: errorMessage, submitLoader: loader } = useSelector(
    (state: RootState) => state.SuperAdminHomePageReducer,
  );
  const { schoolList } = useSelector((state: RootState) => state.SchoolHomePageReducer);
  const { classList } = useSelector((state: RootState) => state.CourseHomePageReducer);

  const { currentPrimaryColor, currentSecondaryColor } = useColorUserType();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile_number, setMobileNumber] = useState<string>('');
  const [standard, setStandard] = useState<string>('');
  const [role_id, setRoleId] = useState<string>('');
  const [school_id, setSchoolId] = useState<string>('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (role_id == USER_TYPE.SCHOOLCONTENTMANAGER.toString()) {
      dispatch(retrieveAllSchool({ limit: 0, offset: 0 }));
    } else {
      setSchoolId('');
    }
  }, [role_id]);

  useEffect(() => {
    dispatch(retrieveAllClass({ limit: 0, offset: 0 }));
    if (currentContentManager) {
      setName(currentContentManager?.name);
      setEmail(currentContentManager?.email);
      setMobileNumber(currentContentManager?.mobile_number);
      setStandard(currentContentManager?.standard);
      setRoleId(currentContentManager?.role_id);
      setSchoolId(currentContentManager.school_id);
      setStatus(currentContentManager?.status);
    } else {
      return;
    }
  }, [currentContentManager]);

  const handleFormSubmitAction = () => {
    const contentManagerFormData: ICreateContentManager = {
      id: currentContentManager?.id,
      name: name,
      email: email,
      mobile_number: mobile_number,
      standard: standard,
      role_id: parseInt(role_id),
      school_id: school_id,
      isEditFlag: currentContentManager?.isEditFlag ? currentContentManager.isEditFlag : false,
      status: status,
    };
    addOrUpdateUser(contentManagerFormData);
  };

  return (
    /* wrapper inside modal layout */
    <form>
      {errorMessage && <AlertBar message={errorMessage} />}
      <div className="flex flex-col h-20 justify-evenly">
        <label className="block text-gray-500 font-bold" htmlFor="first_name">
          Full Name
        </label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="enter first name"
          className="form-input px-4 py-1 rounded-lg"
        ></input>
      </div>
      <div className="grid grid-cols-2 gap-2">
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
        {/* Standard Lists */}
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
            <option value="">Choose Standard</option>
            {classList.length > 0 &&
              classList.map((standard: IClass) => {
                return (
                  <option key={standard.id} value={standard.standard_name}>
                    {standard.standard_name}
                  </option>
                );
              })}
          </select>
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
            <option value={USER_TYPE.CONTENTMANAGER}>CONTENT MANAGER</option>
            <option value={USER_TYPE.SCHOOLCONTENTMANAGER}>SCHOOL CONTENTMANAGER</option>
          </select>
        </div>
      </div>
      {/* School Lists */}
      <div className="grid grid-cols-1 gap-2">
        <div className="flex flex-col h-20 justify-evenly">
          <label className="block text-gray-500 font-bold" htmlFor="school_id">
            School Name
          </label>
          <select
            onChange={(e) => {
              setSchoolId(e.target.value);
            }}
            disabled={
              role_id === '' || role_id === 'none' || role_id == USER_TYPE.CONTENTMANAGER.toString() ? true : false
            }
            id="school_id"
            name="school_id"
            value={school_id}
            className="form-select px-4 py-1 rounded-lg"
          >
            <option value="none">
              {role_id == USER_TYPE.CONTENTMANAGER.toString() ? DEFAULT.GLOBALSCHOOL : 'Choose School'}
            </option>
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
            {currentContentManager?.isEditFlag ? (loader ? 'Updating...' : 'Update') : loader ? 'Adding...' : 'Add'}
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
