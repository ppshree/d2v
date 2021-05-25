import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../SuperAdmin.css';
// import { ListItems } from '../../../components/ListItem/ListItems';
import { RootState } from '../../../app/rootReducer';
//import { updateActivePanel } from '../../LoginPage/LoginPageSlice';
import { Header } from '../../../components/Header/Header';
import { MODAL_POSITION, USER_STATUS } from '../../../app/entity/constant';
import { ModalLayout } from '../../../components/shared/ModalLayout';
import { UserTableList } from '../../../components/UserTableList/UserTableList';
import { ContentManagerForm } from '../../../components/FormModalContent/ContentManagerForm/ContentManagerForm';
import { updateSelectedContentManager, updateFormError } from '../SuperAdminHomeSlice';
import { FilterHeader } from '../../../components/FilterHeader/FilterHeader';

export const ContentManagerList: FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
  const { contentManagerList, selectedContentManager } = useSelector(
    (state: RootState) => state.SuperAdminHomePageReducer,
  );

  useEffect(() => {
    //MAKE API CALLS
  }, []);

  const openModalForm = () => {
    dispatch(
      updateSelectedContentManager({
        first_name: '',
        last_name: '',
        email: '',
        mobile_number: '',
        role_id: '',
        standard: '',
        school_code: '',
        status: USER_STATUS.PENDING,
        created_by: loggedInUser.email,
      }),
    );
  };

  const closeModal = () => {
    dispatch(updateFormError(''));
    dispatch(
      updateSelectedContentManager({
        first_name: '',
        last_name: '',
        email: '',
        mobile_number: '',
        role_id: '',
        standard: '',
        school_code: '',
        status: USER_STATUS.PENDING,
        created_by: '',
      }),
    );
  };

  return (
    <>
      {/* Header Part */}
      <Header handleModalOpen={openModalForm} title={'Content Manager'} />
      {/* Modal Part */}
      {selectedContentManager !== null && selectedContentManager?.created_by !== '' && (
        <ModalLayout
          title="Content Manager Form"
          modalPosition={MODAL_POSITION.DEFAULT}
          isOpen={true}
          closeModal={closeModal}
        >
          <ContentManagerForm handleCloseModal={closeModal} />
        </ModalLayout>
      )}
      {/* Filter Header Part */}
      <FilterHeader filterFor="Content Manager" />
      {/* User Table List */}
      <div className="sm:my-3 xsm:my-3">
        <UserTableList title="Content Manager" userList={contentManagerList} />
      </div>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default ContentManagerList;
