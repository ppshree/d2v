import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../SuperAdmin.css';
import { RootState } from '../../../app/rootReducer';
import { Header } from '../../../components/Header/Header';
import { MODAL_POSITION, USER_STATUS } from '../../../app/entity/constant';
import { ModalLayout } from '../../../components/shared/ModalLayout';
import { UserTableList } from '../../../components/UserTableList/UserTableList';
import { TutorForm } from '../../../components/FormModalContent/TutorForm/TutorForm';
import { updateSelectedTutor, updateFormError } from '../SuperAdminHomeSlice';
import { FilterHeader } from '../../../components/FilterHeader/FilterHeader';
import { ICreateTutor } from '../../../app/entity/model';
import {
  retrieveAllTutor,
  createNewTutor,
  deleteTutor,
} from '../../../app/service/superadmin.service';
import { FilterBottom } from '../../../components/FilterBottom/FilterBottom';

export const TutorList: FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
  const { tutorList, selectedTutor } = useSelector(
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
    dispatch(retrieveAllTutor({ limit, offset }));
  }, [limit]);

  useEffect(() => {
    // api call for get all tutor lists by search name
    dispatch(retrieveAllTutor({ filterType: 'name', filterQuery: queryName, limit, offset }));
  }, [limit, queryName]);

  useEffect(() => {
    // api call for get all tutor lists by search email
    dispatch(retrieveAllTutor({ filterType: 'email', filterQuery: queryEmail, limit, offset }));
  }, [limit, queryEmail]);

  useEffect(() => {
    // api call for get all Tutor lists by search phone
    dispatch(retrieveAllTutor({ filterType: 'phone', filterQuery: queryPhone, limit, offset }));
  }, [limit, queryPhone]);

  useEffect(() => {
    // api call for get all Tutor lists by role id
    dispatch(retrieveAllTutor({ filterType: 'role_id', filterQuery: queryUserType, limit, offset }));
  }, [limit, queryUserType]);

  useEffect(() => {
    // api call for get all Tutor lists by user status
    dispatch(retrieveAllTutor({ filterType: 'status', filterQuery: queryStatus, limit, offset }));
  }, [limit, queryStatus]);

  const openModalForm = () => {
    dispatch(
      updateSelectedTutor({
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
  const addOrUpdateTutor = (userObj: ICreateTutor) => {
    try {
      dispatch(updateFormError(''));
      if (userObj.email && userObj.first_name && loggedInUser.email) {
        dispatch(createNewTutor(userObj));
      } else {
        dispatch(updateFormError('Fill All the Mandatory Fields.'));
      }
    } catch (err) {
      dispatch(updateFormError(err));
    }
  };

  const updateTutorAction = (userObj: ICreateTutor) => {
    dispatch(updateSelectedTutor(userObj));
  };

  const deleteTutorAction = (userId: string) => {
    dispatch(deleteTutor(userId));
  };

  const closeModal = () => {
    dispatch(updateFormError(''));
    dispatch(
      updateSelectedTutor({
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
      <Header handleModalOpen={openModalForm} title={'Tutor'} />
      {/* Modal Part */}
      {selectedTutor !== null && selectedTutor?.created_by !== '' && (
        <ModalLayout
          title="Tutor Form"
          modalPosition={MODAL_POSITION.DEFAULT}
          isOpen={true}
          closeModal={closeModal}
        >
          <TutorForm addOrUpdateUser={addOrUpdateTutor} handleCloseModal={closeModal} />
        </ModalLayout>
      )}
      {/* Filter Header Part */}
      <FilterHeader
        filterFor="Tutor"
        setQueryName={setQueryName}
        setQueryEmail={setQueryEmail}
        setQueryPhone={setQueryPhone}
        setQueryUserType={setQueryUserType}
        setQueryStatus={setQueryStatus}
      />
      {/* User Table List */}
      <div className="sm:my-3 xsm:my-3">
        <UserTableList
          updateActionUser={updateTutorAction}
          deleteActionUser={deleteTutorAction}
          userList={tutorList}
        />
      </div>
      {/* Filter Bottom Part */}
      <FilterBottom setLimit={setLimit} setOffset={setOffset} />
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default TutorList;
