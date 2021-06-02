/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import './SchoolForm.css';
import { useColorUserType } from '../../../app/heplers/useColorUserType';
import { AlertBar } from '../../shared/AlertBar';
import { ICreateSchool } from '../../../app/entity/model';

interface Iprops {
  addOrUpdateSchool: (schoolObj: ICreateSchool) => void;
  handleCloseModal: () => void;
}

export const SchoolForm: React.FC<Iprops> = ({ handleCloseModal, addOrUpdateSchool }) => {
  const { selectedSchool: currentSchool, formError: errorMessage, submitLoader: loader } = useSelector(
    (state: RootState) => state.SchoolHomePageReducer,
  );

  const { currentPrimaryColor, currentSecondaryColor } = useColorUserType();

  const [school_name, setSchoolName] = useState<string>('');
  const [school_head, setSchoolHead] = useState<string>('');
  const [classes, setClasses] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [contact_number, setContactNumber] = useState<string>('');
  const [affiliation_no, setAffiliationNo] = useState<string>('');

  useEffect(() => {
    if (currentSchool) {
      setSchoolName(currentSchool?.school_name);
      setSchoolHead(currentSchool?.school_head);
      setAddress(currentSchool?.address);
      setCity(currentSchool?.city);
      setPin(currentSchool?.pin);
      setAffiliationNo(currentSchool?.affiliation_no);
      setEmail(currentSchool?.email);
      setContactNumber(currentSchool?.contact_number);
      setClasses(currentSchool?.classes);
    } else {
      return;
    }
  }, [currentSchool]);

  const handleFormSubmitAction = () => {
    const schoolFormData: ICreateSchool = {
      id: currentSchool?.id,
      school_name: school_name,
      school_head: school_head,
      address: address,
      city: city,
      pin: pin,
      email: email,
      contact_number: contact_number,
      classes: classes,
      affiliation_no: affiliation_no,
      isEditFlag: currentSchool?.isEditFlag ? currentSchool.isEditFlag : false,
      is_active: currentSchool?.is_active ? currentSchool.is_active : false,
    };
    addOrUpdateSchool(schoolFormData);
  };

  return (
    /* wrapper inside modal layout */
    <form>
      {errorMessage && <AlertBar message={errorMessage} />}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col h-20 justify-evenly">
          <label className="block text-gray-500 font-bold" htmlFor="school_name">
            School Name
          </label>
          <input
            type="text"
            id="school_name"
            name="school_name"
            value={school_name}
            onChange={(e) => {
              setSchoolName(e.target.value);
            }}
            placeholder="enter school name"
            className="form-input px-4 py-1 rounded-lg"
          ></input>
        </div>
        <div className="flex flex-col h-20 justify-evenly">
          <label className="block text-gray-500 font-bold" htmlFor="school_head">
            School Head Name
          </label>
          <input
            type="text"
            onChange={(e) => {
              setSchoolHead(e.target.value);
            }}
            id="school_head"
            name="school_head"
            value={school_head}
            placeholder="enter school head name"
            className="form-input px-4 py-1 rounded-lg"
          ></input>
        </div>
        <div className="flex flex-col h-20 justify-evenly">
          <label className="block text-gray-500 font-bold" htmlFor="address">
            School Address
          </label>
          <input
            type="text"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            id="address"
            name="address"
            value={address}
            placeholder="enter school address"
            className="form-input px-4 py-1 rounded-lg"
          ></input>
        </div>
        <div className="flex flex-col h-20 justify-evenly">
          <label className="block text-gray-500 font-bold" htmlFor="city">
            City
          </label>
          <input
            type="text"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            id="city"
            name="city"
            value={city}
            placeholder="enter city"
            className="form-input px-4 py-1 rounded-lg"
          ></input>
        </div>
        <div className="flex flex-col h-20 justify-evenly">
          <label className="block text-gray-500 font-bold" htmlFor="pin">
            Pincode
          </label>
          <input
            type="number"
            id="pin"
            onChange={(e) => {
              setPin(e.target.value);
            }}
            name="pin"
            value={pin}
            placeholder="enter pincode"
            className="form-input px-4 py-1 rounded-lg"
          ></input>
        </div>
        <div className="flex flex-col h-20 justify-evenly">
          <label className="block text-gray-500 font-bold" htmlFor="affiliation_no">
            Affiliation Number
          </label>
          <input
            type="number"
            id="affiliation_no"
            onChange={(e) => {
              setAffiliationNo(e.target.value);
            }}
            name="affiliation_no"
            value={affiliation_no}
            placeholder="enter affiliation no"
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
          <label className="block text-gray-500 font-bold" htmlFor="contact_number">
            Mobile Number
          </label>
          <input
            type="number"
            id="contact_number"
            onChange={(e) => {
              setContactNumber(e.target.value);
            }}
            name="contact_number"
            value={contact_number}
            placeholder="enter mobile number"
            className="form-input px-4 py-1 rounded-lg"
          ></input>
        </div>
        {/* Standard Lists */}
        <div className="flex flex-col h-20 justify-evenly">
          <label className="block text-gray-500 font-bold" htmlFor="classes">
            Classes
          </label>
          <select
            onChange={(e) => {
              setClasses(e.target.value);
            }}
            id="classes"
            name="classes"
            value={classes}
            className="form-select px-4 py-1 rounded-lg"
          >
            <option value="">None</option>
            {['1', '2', '3'].map((classes: string) => {
              return (
                <option key={classes} value={classes}>
                  {classes}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 mt-5">
        <div className="flex flex-row space-x-2 text-text_white">
          <button
            onClick={(e: React.SyntheticEvent) => {
              e.preventDefault();
              handleFormSubmitAction();
            }}
            className={`px-2 py-2 rounded-lg focus:outline-none bg-${currentPrimaryColor} w-full button`}
          >
            {currentSchool?.isEditFlag ? (loader ? 'Updating...' : 'Update') : loader ? 'Adding...' : 'Add'}
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
