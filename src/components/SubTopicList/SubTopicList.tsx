import React, { useState } from 'react';
import { useColorUserType } from '../../app/heplers/useColorUserType';
import './SubTopicList.css';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { PencilIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/solid';
import { MenuAlt3Icon } from '@heroicons/react/solid';

export const SubTopicList: React.FC = () => {
  const { currentPrimaryColor, currentSecondaryColor } = useColorUserType();
  const [contentList, setContentList] = useState([1, 2, 3]);
  return (
    <>
      <div className="list-inside flex flex-row-reverse justify-start items-start flex-wrap">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setContentList((list) => [...list, list.length + 1]);
          }}
          className="ml-auto text-lg flex justify-start items-start"
        >
          <PlusCircleIcon className="w-7 mr-1 text-gray-700" /> Sub Topic{' '}
        </button>
        <ul className="flex flex-col">
          {contentList.map((n: number) => {
            return (
              <li className="text-lg flex justify-start items-center mb-2" key={n}>
                <div className={`w-7 h-7 flex justify-center items-center rounded-full bg-text_dark mr-4`}>
                  <MenuAlt3Icon className={`text-text_white w-6`} />
                </div>
                <div className="custom-cursor">
                  <input
                    disabled={true}
                    value="Sub Topic"
                    type="text"
                    id="content_name"
                    name="content_name"
                    className={`focus:outline-none py-1 bg-transparent`}
                  ></input>
                </div>
                <div style={{ marginLeft: '8.5rem' }} className="flex justify-evenly items-center mr-auto space-x-4">
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
