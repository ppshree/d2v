/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import { useColorUserType } from '../../app/heplers/useColorUserType';
interface Iprops {
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

export const FilterBottom: React.FC<Iprops> = ({ setLimit, setOffset }) => {
  const { currentPrimaryColor } = useColorUserType();
  return (
    <div className="flex justify-end item-center flex-wrap w-full space-x-3">
      <div className="flex justify-evenly items-center space-x-2">
        <label className="font-bold" htmlFor="limit">
          Rows per page:
        </label>
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setLimit(parseInt(e.target.value));
          }}
          id="limit"
          name="limit"
          className="py-1 rounded-lg"
        >
          <option value="0">All</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <div className="flex justify-evenly items-center space-x-2">
        <button className={`button rounded-lg focus:outline-none border border-${currentPrimaryColor}`}>
          <ChevronLeftIcon className="w-6" />
        </button>
        <button className={`button rounded-lg focus:outline-none border border-${currentPrimaryColor}`}>
          <ChevronRightIcon className="w-6" />
        </button>
      </div>
    </div>
  );
};
