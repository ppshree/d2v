import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../SuperAdmin.css';
import { RootState } from '../../../app/rootReducer';
import { Header } from '../../../components/Header/Header';
import { MODAL_POSITION, USER_STATUS } from '../../../app/entity/constant';
import { ModalLayout } from '../../../components/shared/ModalLayout';
import { UserTableList } from '../../../components/UserTableList/UserTableList';
import { StudentForm } from '../../../components/FormModalContent/StudentForm/StudentForm';
import { updateFormError, updateSelectedStudent } from '../SuperAdminHomeSlice';
import { FilterHeader } from '../../../components/FilterHeader/FilterHeader';
import { ICreateStudent } from '../../../app/entity/model';
import { retrieveAllStudent, createNewStudent, deleteStudent } from '../../../app/service/superadmin.service';
import { FilterBottom } from '../../../components/FilterBottom/FilterBottom';

export const StudentList: FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
  const { studentList, selectedStudent } = useSelector((state: RootState) => state.SuperAdminHomePageReducer);

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
    dispatch(retrieveAllStudent({ limit, offset }));
  }, [limit]);

  useEffect(() => {
    // api call for get all student lists by search name
    dispatch(retrieveAllStudent({ filterType: 'name', filterQuery: queryName, limit, offset }));
  }, [limit, queryName]);

  useEffect(() => {
    // api call for get all student lists by search email
    dispatch(retrieveAllStudent({ filterType: 'email', filterQuery: queryEmail, limit, offset }));
  }, [limit, queryEmail]);

  useEffect(() => {
    // api call for get all student lists by search phone
    dispatch(retrieveAllStudent({ filterType: 'phone', filterQuery: queryPhone, limit, offset }));
  }, [limit, queryPhone]);

  useEffect(() => {
    // api call for get all student lists by role id
    dispatch(retrieveAllStudent({ filterType: 'role_id', filterQuery: queryUserType, limit, offset }));
  }, [limit, queryUserType]);

  useEffect(() => {
    // api call for get all student lists by user status
    dispatch(retrieveAllStudent({ filterType: 'status', filterQuery: queryStatus, limit, offset }));
  }, [limit, queryStatus]);

  const openModalForm = () => {
    dispatch(
      updateSelectedStudent({
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
  const addOrUpdateStudent = (userObj: ICreateStudent) => {
    try {
      dispatch(updateFormError(''));
      if (userObj.email && userObj.first_name && loggedInUser.email) {
        dispatch(createNewStudent(userObj));
      } else {
        dispatch(updateFormError('Fill All the Mandatory Fields.'));
      }
    } catch (err) {
      dispatch(updateFormError(err));
    }
  };

  const updateStudentAction = (userObj: ICreateStudent) => {
    dispatch(updateSelectedStudent(userObj));
  };

  const deleteStudentAction = (userId: string) => {
    dispatch(deleteStudent(userId));
  };

  const closeModal = () => {
    dispatch(updateFormError(''));
    dispatch(
      updateSelectedStudent({
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
      <Header handleModalOpen={openModalForm} title={'Student'} />
      {/* Modal Part */}
      {selectedStudent !== null && selectedStudent?.created_by !== '' && (
        <ModalLayout title="Student Form" modalPosition={MODAL_POSITION.DEFAULT} isOpen={true} closeModal={closeModal}>
          <StudentForm addOrUpdateUser={addOrUpdateStudent} handleCloseModal={closeModal} />
        </ModalLayout>
      )}
      {/* Filter Header Part */}
      <FilterHeader
        filterFor="Student"
        setQueryName={setQueryName}
        setQueryEmail={setQueryEmail}
        setQueryPhone={setQueryPhone}
        setQueryUserType={setQueryUserType}
        setQueryStatus={setQueryStatus}
      />
      {/* User Table List */}
      <div className="sm:my-3 xsm:my-3">
        <UserTableList
          updateActionUser={updateStudentAction}
          deleteActionUser={deleteStudentAction}
          userList={studentList}
        />
      </div>
      {/* Filter Bottom Part */}
      <FilterBottom setLimit={setLimit} setOffset={setOffset} />
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default StudentList;
