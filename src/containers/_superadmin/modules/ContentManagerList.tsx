/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../SuperAdmin.css';
import { RootState } from '../../../app/rootReducer';
import { Header } from '../../../components/Header/Header';
import { MODAL_POSITION, USER_STATUS } from '../../../app/entity/constant';
import { ModalLayout } from '../../../components/shared/ModalLayout';
import { ContentManagerForm } from '../../../components/FormModalContent/ContentManagerForm/ContentManagerForm';
import { updateSelectedContentManager, updateFormError } from '../SuperAdminHomeSlice';
import { ICreateContentManager } from '../../../app/entity/model';
import {
  retrieveAllContentManagers,
  createNewContentManager,
  deleteContentManager,
} from '../../../app/service/superadmin.service';
import { ListItems } from '../../../components/ListItems/ListItems';

export const ContentManagerList: FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
  const { contentManagerList, selectedContentManager, count, pageLoader: loader } = useSelector(
    (state: RootState) => state.SuperAdminHomePageReducer,
  );

  const [filterObj, setFilterObj] = useState<any>({});

  useEffect(() => {
    dispatch(retrieveAllContentManagers(filterObj));
  }, [filterObj]);

  const openModalForm = () => {
    dispatch(
      updateSelectedContentManager({
        name: '',
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
  const addOrUpdateContentManager = (userObj: ICreateContentManager) => {
    dispatch(updateFormError(''));
    if (userObj.email && userObj.name && loggedInUser.email) {
      dispatch(createNewContentManager(userObj));
    } else {
      dispatch(updateFormError('Fill All the Mandatory Fields.'));
    }
  };

  const updateContentManagerAction = (userObj: ICreateContentManager) => {
    dispatch(updateSelectedContentManager(userObj));
  };

  const deleteContentManagerAction = (userId: string) => {
    dispatch(deleteContentManager(userId));
  };

  const closeModal = () => {
    dispatch(updateFormError(''));
    dispatch(
      updateSelectedContentManager({
        name: '',
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
          <ContentManagerForm addOrUpdateUser={addOrUpdateContentManager} handleCloseModal={closeModal} />
        </ModalLayout>
      )}
      {/* User Table List */}
      <ListItems
        refer="Content Manager"
        itemList={contentManagerList}
        updateAction={updateContentManagerAction}
        deleteAction={deleteContentManagerAction}
        filterObj={filterObj}
        setFilterObj={setFilterObj}
      >
        <ListItems.FilterHeader key="filterheader" />
        <ListItems.UserTableList isLoading={loader} key="itemList" />
        <ListItems.FilterBottom key="filterBottom" listLength={count} />
      </ListItems>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default ContentManagerList;
