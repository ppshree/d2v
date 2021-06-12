/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect } from 'react';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import { useColorUserType } from '../../app/heplers/useColorUserType';
import { DEFAULT } from '../../app/entity/constant';
interface Iprops {
  limit: number;
  offset: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  listLength: number;
}

export const FilterBottom: React.FC<Iprops> = ({ limit, offset, setLimit, setOffset, listLength }) => {
  const { currentPrimaryColor } = useColorUserType();

  const [leftButtonDisabled, setleftButtonDisabled] = useState<boolean>(true);
  const [rightButtonDisabled, setrightButtonDisabled] = useState<boolean>(true);

  const loadPrevPage = () => {
    setOffset(offset - limit);
  };
  const loadNextPage = () => {
    setOffset(limit + offset);
  };

  useEffect(() => {
    // console.log(offset, listLength);
    offset - limit < 0
      ? setleftButtonDisabled(true)
      : offset === 0 && limit === 0
      ? setleftButtonDisabled(true)
      : setleftButtonDisabled(false);
    offset + limit >= listLength
      ? setrightButtonDisabled(true)
      : offset === 0 && limit === 0
      ? setrightButtonDisabled(true)
      : setrightButtonDisabled(false);
    if (offset === listLength) {
      if (leftButtonDisabled === false) {
        loadPrevPage();
      }
    }
  }, [offset, limit, listLength]);

  return (
    <div className="flex justify-end item-center flex-wrap w-full space-x-3 mb-3">
      <div className="flex justify-evenly items-center space-x-2">
        <label className="font-bold" htmlFor="limit">
          Rows per page:
        </label>
        <select
          value={limit && limit}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setLimit(parseInt(e.target.value));
          }}
          id="limit"
          name="limit"
          className="py-1 rounded-lg"
        >
          <option value={DEFAULT.ALL}>All</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <div className="flex justify-evenly items-center space-x-2">
        <button
          disabled={leftButtonDisabled}
          onClick={loadPrevPage}
          className={`${!leftButtonDisabled ? 'button' : ''} rounded-lg focus:outline-none border ${
            !leftButtonDisabled ? `border-${currentPrimaryColor}` : 'bg-text_grey'
          }`}
        >
          <ChevronLeftIcon className="w-6" />
        </button>
        <button
          disabled={rightButtonDisabled}
          onClick={loadNextPage}
          className={`${!rightButtonDisabled ? 'button' : ''} rounded-lg focus:outline-none border ${
            !rightButtonDisabled ? `border-${currentPrimaryColor}` : 'bg-text_grey'
          }`}
        >
          <ChevronRightIcon className="w-6" />
        </button>
      </div>
    </div>
  );
};
