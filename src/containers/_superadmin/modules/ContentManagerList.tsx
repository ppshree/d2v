import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../SuperAdmin.css';
import { RootState } from '../../../app/rootReducer';
import { Header } from '../../../components/Header/Header';
import { MODAL_POSITION, USER_STATUS } from '../../../app/entity/constant';
import { ModalLayout } from '../../../components/shared/ModalLayout';
import { UserTableList } from '../../../components/UserTableList/UserTableList';
import { ContentManagerForm } from '../../../components/FormModalContent/ContentManagerForm/ContentManagerForm';
import { updateSelectedContentManager, updateFormError } from '../SuperAdminHomeSlice';
import { FilterHeader } from '../../../components/FilterHeader/FilterHeader';
import { ICreateContentManager } from '../../../app/entity/model';
import {
  retrieveAllContentManagers,
  createNewContentManager,
  deleteContentManager,
} from '../../../app/service/superadmin.service';
import { FilterBottom } from '../../../components/FilterBottom/FilterBottom';

export const ContentManagerList: FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
  const { contentManagerList, selectedContentManager } = useSelector(
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

  useEffect(() => {
    dispatch(retrieveAllContentManagers({ limit, offset }));
  }, [limit]);

  useEffect(() => {
    // api call for get all content manager lists by search name
    dispatch(retrieveAllContentManagers({ filterType: 'name', filterQuery: queryName, limit, offset }));
  }, [limit, queryName]);

  useEffect(() => {
    // api call for get all content manager lists by search email
    dispatch(retrieveAllContentManagers({ filterType: 'email', filterQuery: queryEmail, limit, offset }));
  }, [limit, queryEmail]);

  useEffect(() => {
    // api call for get all content manager lists by search phone
    dispatch(retrieveAllContentManagers({ filterType: 'phone', filterQuery: queryPhone, limit, offset }));
  }, [limit, queryPhone]);

  useEffect(() => {
    // api call for get all content manager lists by role id
    dispatch(retrieveAllContentManagers({ filterType: 'role_id', filterQuery: queryUserType, limit, offset }));
  }, [limit, queryUserType]);

  useEffect(() => {
    // api call for get all content manager lists by user status
    dispatch(retrieveAllContentManagers({ filterType: 'status', filterQuery: queryStatus, limit, offset }));
  }, [limit, queryStatus]);

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
  const addOrUpdateContentManager = (userObj: ICreateContentManager) => {
    try {
      dispatch(updateFormError(''));
      if (userObj.email && userObj.first_name && loggedInUser.email) {
        dispatch(createNewContentManager(userObj));
      } else {
        dispatch(updateFormError('Fill All the Mandatory Fields.'));
      }
    } catch (err) {
      dispatch(updateFormError(err));
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
          <ContentManagerForm addOrUpdateUser={addOrUpdateContentManager} handleCloseModal={closeModal} />
        </ModalLayout>
      )}
      {/* Filter Header Part */}
      <FilterHeader
        filterFor="Content Manager"
        setQueryName={setQueryName}
        setQueryEmail={setQueryEmail}
        setQueryPhone={setQueryPhone}
        setQueryUserType={setQueryUserType}
        setQueryStatus={setQueryStatus}
      />
      {/* User Table List */}
      <div className="sm:my-3 xsm:my-3">
        <UserTableList
          updateActionUser={updateContentManagerAction}
          deleteActionUser={deleteContentManagerAction}
          userList={contentManagerList}
        />
      </div>
      {/* Filter Bottom Part */}
      <FilterBottom setLimit={setLimit} setOffset={setOffset} />
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default ContentManagerList;
