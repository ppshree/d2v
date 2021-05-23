import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../SuperAdmin.css';
// import { ListItems } from '../../../components/ListItem/ListItems';
import { RootState } from '../../../app/rootReducer';
//import { updateActivePanel } from '../../LoginPage/LoginPageSlice';
import { Header } from '../../../components/Header/Header';
import { MODAL_POSITION } from '../../../app/entity/constant';
import { ModalLayout } from '../../../components/shared/ModalLayout';

export const AdminList: FC = () => {
  const dispatch = useDispatch();
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
        <p>Admin Add Form to be render</p>
      </ModalLayout>
      {/* Filter Part not done yet */}
      <div className="sm:mt-1 xsm:mt-1">
        <h1>This is super admin admin-list page</h1>
      </div>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default AdminList;
