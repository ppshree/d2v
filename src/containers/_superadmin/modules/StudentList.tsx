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
  const { studentList, selectedStudent, pageLoader: loader } = useSelector(
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
    // debounce effect
    if (queryEmail || queryName || queryPhone || queryUserType || queryStatus) {
      const timer = setTimeout(() => {
        if (queryName !== '') {
          dispatch(retrieveAllStudent({ filterType: 'search', filterQuery: queryName, limit, offset }));
        } else if (queryEmail !== '') {
          dispatch(retrieveAllStudent({ filterType: 'search', filterQuery: queryEmail, limit, offset }));
        } else if (queryPhone !== '') {
          dispatch(retrieveAllStudent({ filterType: 'search', filterQuery: queryPhone, limit, offset }));
        } else if (queryUserType !== '') {
          dispatch(retrieveAllStudent({ filterType: 'role_id', filterQuery: queryUserType, limit, offset }));
        } else if (queryStatus !== '') {
          dispatch(retrieveAllStudent({ filterType: 'status', filterQuery: queryStatus, limit, offset }));
        } else {
          dispatch(retrieveAllStudent({ limit, offset }));
        }
      }, 500);
      return () => clearTimeout(timer);
    } else {
      dispatch(retrieveAllStudent({ limit, offset }));
    }
  }, [limit, queryName, queryEmail, queryPhone, queryStatus, queryUserType]);

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
      {loader ? (
        <div>Loading...</div>
      ) : (
        <div className="sm:my-3 xsm:my-3">
          <UserTableList
            refer="Student"
            updateActionUser={updateStudentAction}
            deleteActionUser={deleteStudentAction}
            userList={studentList}
          />
        </div>
      )}
      {/* Filter Bottom Part */}
      <FilterBottom setLimit={setLimit} setOffset={setOffset} />
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default StudentList;
