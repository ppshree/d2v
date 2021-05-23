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

export const ContentManagerList: FC = () => {
  const dispatch = useDispatch();
  const { contentManagerList } = useSelector((state: RootState) => state.SuperAdminHomePageReducer);
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
      <Header handleModalOpen={openModal} title={'Content Manager'} />
      {/* Modal Part */}
      <ModalLayout modalPosition={modalPosition} isOpen={isModalOpen} closeModal={closeModal}>
        <p>Content Manager Add Form to be render</p>
      </ModalLayout>
      {/* Filter part not done yet */}
      <div className="sm:my-3 xsm:my-3">
        <UserTableList userList={contentManagerList} />
      </div>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default ContentManagerList;
