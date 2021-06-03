import React from 'react';
import { useColorUserType } from '../../app/heplers/useColorUserType';
import './Loader.css';

export const Loader: React.FC = () => {
  const { currentPrimaryColor } = useColorUserType();
  return (
    <>
      <div className="fixed transition duration-700 ease-in-out top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-200 opacity-60 flex flex-col items-center justify-center">
        <div
          className={`loader ease-linear rounded-full border-4 border-t-4 border-${currentPrimaryColor} h-12 w-12 mb-4`}
        ></div>
      </div>
    </>
  );
};
