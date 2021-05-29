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
import { AdminForm } from '../../../components/FormModalContent/AdminForm/AdminForm';
import { updateSelectedAdmin, updateFormError } from '../SuperAdminHomeSlice';
import { FilterHeader } from '../../../components/FilterHeader/FilterHeader';
import { ICreateAdmin } from '../../../app/entity/model';
import { retrieveAllAdmin, createNewAdmin, deleteAdmin } from '../../../app/service/superadmin.service';
import { FilterBottom } from '../../../components/FilterBottom/FilterBottom';

export const AdminList: FC = () => {
  const dispatch = useDispatch();
  // const { adminList } = useSelector((state: RootState) => state.SuperAdminHomePageReducer);
  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
  const { adminList, selectedAdmin } = useSelector((state: RootState) => state.SuperAdminHomePageReducer);

  const [limit, setLimit] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    // api call for get all content manager lists
    dispatch(retrieveAllAdmin({ limit, offset }));
  }, [limit]);

  const openModalForm = () => {
    dispatch(
      updateSelectedAdmin({
        first_name: '',
        last_name: '',
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
    try {
      dispatch(updateFormError(''));
      if (userObj.email && userObj.first_name && loggedInUser.email) {
        dispatch(createNewAdmin(userObj));
      } else {
        dispatch(updateFormError('Fill All the Mandatory Fields.'));
      }
    } catch (err) {
      dispatch(updateFormError(err));
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
        first_name: '',
        last_name: '',
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
      {/* Filter Header Part */}
      <FilterHeader filterFor="Content Manager" />
      {/* User Table List */}
      <div className="sm:my-3 xsm:my-3">
        <UserTableList updateActionUser={updateAdminAction} deleteActionUser={deleteAdminAction} userList={adminList} />
      </div>
      {/* Filter Bottom Part */}
      <FilterBottom setLimit={setLimit} setOffset={setOffset} />
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default AdminList;
