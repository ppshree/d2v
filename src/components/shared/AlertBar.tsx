import React from 'react';

interface Iprops {
  message: string;
}

export const AlertBar: React.FC<Iprops> = ({ message }) => {
  return (
    <div className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 my-2 shadow-md" role="alert">
      <div className="flex">
        <div>
          <p className="font-bold">{message}</p>
        </div>
      </div>
    </div>
  );
};
