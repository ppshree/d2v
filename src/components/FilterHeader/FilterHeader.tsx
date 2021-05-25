import React from 'react';
import './FilterHeader.css';

interface Iprops {
  filterFor: string;
}
export const FilterHeader: React.FC<Iprops> = ({ filterFor }) => {
  return <div className="flex justify-evenly items-center bg-white filter-shadow w-full h-16 rounded-lg my-5"></div>;
};
