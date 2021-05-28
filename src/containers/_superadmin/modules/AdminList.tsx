import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../SuperAdmin.css';
// import { ListItems } from '../../../components/ListItem/ListItems';
import { RootState } from '../../../app/rootReducer';
//import { updateActivePanel } from '../../LoginPage/LoginPageSlice';
import { Header } from '../../../components/Header/Header';
import { MODAL_POSITION } from '../../../app/entity/constant';
import { ModalLayout } from '../../../components/shared/ModalLayout';
import { UserTableList } from '../../../components/UserTableList/UserTableList';
import { AdminModalContent } from '../../../components/AdminModalContent/AdminModalContent';

export const AdminList: FC = () => {
  const dispatch = useDispatch();
  const { adminList } = useSelector((state: RootState) => state.SuperAdminHomePageReducer);
  const { loggedInUser: user } = useSelector((state: RootState) => state.LoginPageReducer);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalPosition, setModalPosition] = useState<string>('');

  useEffect(() => {
    //MAKE API CALLS
  }, []);
  const openModal = () => {
    setModalPosition(MODAL_POSITION.DEFAULT);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalPosition('');
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Header Part */}
      <Header handleModalOpen={openModal} title={'Admin'} />
      {/* Modal Part */}
      <ModalLayout modalPosition={modalPosition} isOpen={isModalOpen} closeModal={closeModal}>
        <AdminModalContent closeModal={closeModal} />
      </ModalLayout>
      {/* Filter Part not done yet */}
      {/* <div className="sm:my-3 xsm:my-3">
        <UserTableList userList={adminList} />
      </div> */}
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default AdminList;
