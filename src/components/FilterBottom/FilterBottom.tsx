/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';

interface Iprops {
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

export const FilterBottom: React.FC<Iprops> = ({ setLimit }) => {
  return (
    <div className="flex justify-end item-center flex-wrap w-full">
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
    </div>
  );
};
