import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MIN_MAX_WIDTH } from '../../app/entity/constant';
import { signOut } from '../../containers/LoginPage/LoginPageSlice';
import { SideBar } from '../SideBar/SideBar';
import './MainLayout.css';

interface Iprops {
  children: React.ReactElement;
}
export const MainLayout: React.FC<Iprops> = ({ children }) => {
  const dispatch = useDispatch();
  const [layoutWidth, setLayoutWidth] = useState<string>(MIN_MAX_WIDTH.MIN_LAYOUT);

  const handleLayoutWidth = (size: string) => {
    setLayoutWidth(size);
  };

  const handleSignout = () => {
    dispatch(signOut());
  };

  return (
    <>
      <SideBar handleSignout={handleSignout} handleLayoutWidth={handleLayoutWidth} />
      <div className={`flex-4 w-full ${layoutWidth} xsm:pl-20 pt-20 pr-14 bg-text_white`}>{children}</div>
    </>
  );
};
