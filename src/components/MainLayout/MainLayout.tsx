import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MIN_MAX_WIDTH, MODAL_POSITION } from '../../app/entity/constant';
import { Header } from '../../containers/Header/Header';
import { ProfileModalContent } from '../ProfileModalContent/ProfileModalContent';
import { signOut } from '../../containers/LoginPage/LoginPageSlice';
import { ModalLayout } from '../shared/ModalLayout';
import { SideBar } from '../SideBar/SideBar';
import './MainLayout.css';

interface Iprops {
  children: React.ReactElement;
}
export const MainLayout: React.FC<Iprops> = ({ children }) => {
  const dispatch = useDispatch();
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [modalPosition, setModalPosition] = useState<string>('');
  const [layoutWidth, setLayoutWidth] = useState<string>(MIN_MAX_WIDTH.MIN_LAYOUT);

  const handleLayoutWidth = (size: string) => {
    setLayoutWidth(size);
  };

  const handleSignout = () => {
    dispatch(signOut());
  };

  const openProfileModal = () => {
    setModalPosition(layoutWidth);
    setIsProfileOpen(true);
  };

  const closeModal = () => {
    setModalPosition('');
    setIsProfileOpen(false);
  };

  return (
    <>
      <SideBar openProfileModal={openProfileModal} handleLayoutWidth={handleLayoutWidth} />
      <ModalLayout modalPosition={modalPosition} isOpen={isProfileOpen ? isProfileOpen : false} closeModal={closeModal}>
        <ProfileModalContent handleSignout={handleSignout} />
      </ModalLayout>
      <div className={`flex-4 w-full ${layoutWidth} xsm:pl-20 pt-20 pr-14 bg-text_white`}>{children}</div>
    </>
  );
};
