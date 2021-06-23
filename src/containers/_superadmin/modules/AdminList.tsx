/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-dupe-else-if */
import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../SuperAdmin.css';
import { RootState } from '../../../app/rootReducer';
import { Header } from '../../../components/Header/Header';
import { MODAL_POSITION, USER_STATUS } from '../../../app/entity/constant';
import { ModalLayout } from '../../../components/shared/ModalLayout';
import { AdminForm } from '../../../components/FormModalContent/AdminForm/AdminForm';
import { updateSelectedAdmin, updateFormError } from '../SuperAdminHomeSlice';
import { ICreateAdmin } from '../../../app/entity/model';
import { retrieveAllAdmin, createNewAdmin, deleteAdmin } from '../../../app/service/superadmin.service';
import { ListItems } from '../../../components/ListItems/ListItems';

export const AdminList: FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
  const { adminList, selectedAdmin, count, pageLoader: loader } = useSelector(
    (state: RootState) => state.SuperAdminHomePageReducer,
  );

  const [filterObj, setFilterObj] = useState<any>({});

  useEffect(() => {
    dispatch(retrieveAllAdmin(filterObj));
  }, [filterObj]);

  const openModalForm = () => {
    dispatch(
      updateSelectedAdmin({
        name: '',
        email: '',
        mobile_number: '',
        role_id: '',
        school_code: '',
        status: USER_STATUS.PENDING,
        created_by: loggedInUser.email,
      }),
    );
  };

  const addOrUpdateAdmin = (userObj: ICreateAdmin) => {
    dispatch(updateFormError(''));
    if (userObj.email && userObj.name && loggedInUser.email) {
      dispatch(createNewAdmin(userObj));
    } else {
      dispatch(updateFormError('Fill All the Mandatory Fields.'));
    }
  };

  const updateAdminAction = (userObj: ICreateAdmin) => {
    dispatch(updateSelectedAdmin(userObj));
  };

  const deleteAdminAction = (userId: string) => {
    dispatch(deleteAdmin(userId));
  };

  const closeModal = () => {
    dispatch(updateFormError(''));
    dispatch(
      updateSelectedAdmin({
        name: '',
        email: '',
        mobile_number: '',
        role_id: '',
        school_code: '',
        status: USER_STATUS.PENDING,
        created_by: '',
      }),
    );
  };

  return (
    <>
      {/* Header Part */}
      <Header handleModalOpen={openModalForm} title={'Admin'} />
      {/* Modal Part */}
      {selectedAdmin !== null && selectedAdmin?.created_by !== '' && (
        <ModalLayout title="Admin Form" modalPosition={MODAL_POSITION.DEFAULT} isOpen={true} closeModal={closeModal}>
          <AdminForm addOrUpdateUser={addOrUpdateAdmin} handleCloseModal={closeModal} />
        </ModalLayout>
      )}
      {/* User Table List */}
      <ListItems
        refer="Admin"
        itemList={adminList}
        updateAction={updateAdminAction}
        deleteAction={deleteAdminAction}
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
export default AdminList;
