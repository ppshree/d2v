import React, { useState } from 'react';
import { useColorUserType } from '../../app/heplers/useColorUserType';
import './ContentList.css';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { PencilIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/solid';

export const ContentList: React.FC = () => {
  const { currentPrimaryColor, currentSecondaryColor } = useColorUserType();
  const [contentList, setContentList] = useState([1, 2, 3]);
  return (
    <>
      <div className="list-inside flex flex-col justify-start items-start">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setContentList((list) => [...list, list.length + 1]);
          }}
          className="ml-auto text-lg flex justify-evenly items-center"
        >
          <PlusCircleIcon className="w-7 mr-1 text-gray-700" /> Content{' '}
        </button>
        <ul className="flex flex-col">
          {contentList.map((n: number) => {
            return (
              <li className="text-lg flex justify-start items-center mb-2" key={n}>
                <div className={`w-4 h-4 rounded-full bg-${currentSecondaryColor} mr-4`}></div>
                <div className="custom-cursor">
                  <input
                    disabled={true}
                    value="Content"
                    type="text"
                    id="content_name"
                    name="content_name"
                    className={`focus:outline-none py-1 w-auto bg-transparent`}
                  ></input>
                </div>
                <div className="flex justify-evenly items-center mr-auto space-x-4">
                  <>
                    <button
                      onClick={(e: React.SyntheticEvent) => {
                        e.stopPropagation();
                      }}
                      className="focus:outline-none"
                    >
                      <PencilIcon className={`text-${currentPrimaryColor} w-6`} />
                    </button>
                    <button
                      onClick={(e: React.SyntheticEvent) => {
                        e.stopPropagation();
                      }}
                      className="focus:outline-none"
                    >
                      <TrashIcon className={`text-${currentSecondaryColor} w-6`} />
                    </button>
                  </>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
