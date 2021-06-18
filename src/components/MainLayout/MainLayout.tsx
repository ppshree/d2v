import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MIN_MAX_WIDTH, MODAL_POSITION } from '../../app/entity/constant';
import { ProfileModalContent } from '../ProfileModalContent/ProfileModalContent';
import { signOut } from '../../containers/LoginPage/LoginPageSlice';
import { ModalLayout } from '../shared/ModalLayout';
import { SideBar } from '../SideBar/SideBar';
import './MainLayout.css';
import { LogoutConfirmModal } from '../LogoutConfirmModal/LogoutConfirmModal';

interface Iprops {
  children: React.ReactElement;
}
export const MainLayout: React.FC<Iprops> = ({ children }) => {
  const dispatch = useDispatch();
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState<boolean>(false);
  const [modalPosition, setModalPosition] = useState<string>('');
  const [layoutWidth, setLayoutWidth] = useState<string>(MIN_MAX_WIDTH.MAX_LAYOUT);

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

  const openLogoutModal = () => {
    setLogoutConfirmOpen(true);
  };

  const confirmResponse = (isConfirm: boolean) => {
    if (isConfirm) {
      handleSignout();
      closeLogoutModal();
    } else {
      closeLogoutModal();
    }
  };

  const closeLogoutModal = () => {
    setLogoutConfirmOpen(false);
  };

  return (
    <>
      <SideBar openProfileModal={openProfileModal} handleLayoutWidth={handleLayoutWidth} />
      <ModalLayout modalPosition={modalPosition} isOpen={isProfileOpen} closeModal={closeModal}>
        <ProfileModalContent openLogoutModal={openLogoutModal} />
      </ModalLayout>
      <ModalLayout modalPosition={MODAL_POSITION.DEFAULT} isOpen={logoutConfirmOpen} closeModal={closeLogoutModal}>
        <LogoutConfirmModal confirmResponse={confirmResponse} />
      </ModalLayout>
      <div className={`flex-4 w-full ${layoutWidth} xsm:pl-20  sm:pr-8 xsm:pr-8 w-full overflow-x-hidden`}>
        <>{children}</>
      </div>
    </>
  );
};
