/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import { useColorUserType } from '../../app/heplers/useColorUserType';
import { LIMIT } from '../../app/entity/constant';
interface Iprops {
  filterObj?: any;
  setFilterObj?: React.Dispatch<React.SetStateAction<any>>;
  listLength: number;
}

export const FilterBottom: React.FC<Iprops> = ({ filterObj, setFilterObj, listLength }) => {
  const { currentPrimaryColor } = useColorUserType();

  const [limit, setLimit] = useState<number>(LIMIT.DEFAULT);
  const [offset, setOffset] = useState<number>(0);

  /* filter limit,offset ref */
  const limitRef = useRef<HTMLSelectElement>(null);
  const leftButtonRef = useRef<HTMLButtonElement>(null);
  const rightButtonRef = useRef<HTMLButtonElement>(null);
  /* filter limit,offset ref */

  const [leftButtonDisabled, setleftButtonDisabled] = useState<boolean>(true);
  const [rightButtonDisabled, setrightButtonDisabled] = useState<boolean>(true);

  const loadPrevPage = () => {
    setOffset(offset - limit);
  };
  const loadNextPage = () => {
    setOffset(limit + offset);
  };

  useEffect(() => {
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

  useEffect(() => {
    if (
      setFilterObj &&
      (document.activeElement === leftButtonRef.current || document.activeElement === rightButtonRef.current)
    ) {
      setFilterObj({
        ...filterObj,
        offset,
      });
    } else if (setFilterObj && document.activeElement === limitRef.current) {
      setFilterObj({
        ...filterObj,
        limit,
        offset: 0,
      });
    } else {
      return;
    }
  }, [limit, offset]);

  return (
    <div className="flex justify-end item-center flex-wrap w-full space-x-3 mb-3">
      <div className="flex justify-evenly items-center space-x-2">
        <label className="font-bold" htmlFor="limit">
          Rows per page:
        </label>
        <select
          ref={limitRef}
          value={limit}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setLimit(parseInt(e.target.value));
          }}
          id="limit"
          name="limit"
          className="py-1 rounded-lg"
        >
          <option value={LIMIT.ALL}>All</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <div className="flex justify-evenly items-center space-x-2">
        <button
          ref={leftButtonRef}
          disabled={leftButtonDisabled}
          onClick={loadPrevPage}
          className={`${!leftButtonDisabled ? 'button' : ''} rounded-lg focus:outline-none border ${
            !leftButtonDisabled ? `border-${currentPrimaryColor}` : 'bg-text_grey'
          }`}
        >
          <ChevronLeftIcon className="w-6" />
        </button>
        <button
          ref={rightButtonRef}
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
