/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { useHistory } from 'react-router-dom';

export const Navbar = () => {
  const history = useHistory();
  return (
    <header className="fixed top-0 left-0 right-0 flex justify-start items-center space-x-24 mx-10 py-6">
      <div className="flex justify-evenly items-center space-x-4">
        <div className="w-10 h-10 m-auto bg-text_grey"></div>
        <div className="comp-name">DAMBARUU</div>
      </div>
      <div className="nav-links w-auto">
        <ul className="flex justify-evenly items-center space-x-16">
          {['Home', 'Course', 'Help'].map((link: string) => {
            return (
              <li
                onClick={() => history.push(`/${link}`)}
                key={link}
                className="list-none text-gray font-bold cursor-pointer"
              >
                {link}
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};
