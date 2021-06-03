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
  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
  const { adminList, selectedAdmin, pageLoader: loader } = useSelector(
    (state: RootState) => state.SuperAdminHomePageReducer,
  );

  const [limit, setLimit] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);

  /* filter State change */
  const [queryName, setQueryName] = useState<string>('');
  const [queryEmail, setQueryEmail] = useState<string>('');
  const [queryPhone, setQueryPhone] = useState<string>('');
  const [queryUserType, setQueryUserType] = useState<string>('');
  const [queryStatus, setQueryStatus] = useState<string>('');
  /* filter State change*/

  /*page state change*/
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (adminList.length > count) setCount(Math.max(count, adminList.length));
  }, [adminList]);

  useEffect(() => {
    // debounce effect
    if (queryEmail || queryName || queryPhone || queryUserType || queryStatus) {
      const timer = setTimeout(() => {
        if (queryName !== '') {
          dispatch(retrieveAllAdmin({ filterType: 'search', filterQuery: queryName, limit, offset }));
        } else if (queryEmail !== '') {
          dispatch(retrieveAllAdmin({ filterType: 'search', filterQuery: queryEmail, limit, offset }));
        } else if (queryPhone !== '') {
          dispatch(retrieveAllAdmin({ filterType: 'search', filterQuery: queryPhone, limit, offset }));
        } else if (queryUserType !== '') {
          dispatch(retrieveAllAdmin({ filterType: 'role_id', filterQuery: queryUserType, limit, offset }));
        } else if (queryStatus !== '') {
          dispatch(retrieveAllAdmin({ filterType: 'status', filterQuery: queryStatus, limit, offset }));
        } else {
          dispatch(retrieveAllAdmin({ limit, offset }));
        }
      }, 500);
      return () => clearTimeout(timer);
    } else {
      console.log('offset value', offset);
      dispatch(retrieveAllAdmin({ limit, offset }));
    }
  }, [limit, offset, queryName, queryEmail, queryPhone, queryStatus, queryUserType]);

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
      <FilterHeader
        filterFor="Admin"
        setQueryName={setQueryName}
        setQueryEmail={setQueryEmail}
        setQueryPhone={setQueryPhone}
        setQueryUserType={setQueryUserType}
        setQueryStatus={setQueryStatus}
      />
      {/* User Table List */}
      {loader ? (
        <div>Loading...</div>
      ) : (
        <div className="sm:my-3 xsm:my-3">
          <UserTableList
            updateActionUser={updateAdminAction}
            deleteActionUser={deleteAdminAction}
            userList={adminList}
          />
        </div>
      )}
      {/* Filter Bottom Part */}
      <FilterBottom limit={limit} offset={offset} setLimit={setLimit} setOffset={setOffset} listLength={count} />
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default AdminList;
