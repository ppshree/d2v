/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../SuperAdmin.css';
import { RootState } from '../../../app/rootReducer';
import { Header } from '../../../components/Header/Header';
import { MODAL_POSITION, USER_STATUS } from '../../../app/entity/constant';
import { ModalLayout } from '../../../components/shared/ModalLayout';
import { StudentForm } from '../../../components/FormModalContent/StudentForm/StudentForm';
import { updateFormError, updateSelectedStudent } from '../SuperAdminHomeSlice';
import { ICreateStudent } from '../../../app/entity/model';
import { retrieveAllStudent, createNewStudent, deleteStudent } from '../../../app/service/superadmin.service';
import { ListItems } from '../../../components/ListItems/ListItems';

export const StudentList: FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
  const { studentList, selectedStudent, count, pageLoader: loader } = useSelector(
    (state: RootState) => state.SuperAdminHomePageReducer,
  );
  const [filterObj, setFilterObj] = useState<any>({});

  useEffect(() => {
    dispatch(retrieveAllStudent(filterObj));
  }, [filterObj]);

  const openModalForm = () => {
    dispatch(
      updateSelectedStudent({
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
  const addOrUpdateStudent = (userObj: ICreateStudent) => {
    dispatch(updateFormError(''));
    if (userObj.email && userObj.name && loggedInUser.email) {
      dispatch(createNewStudent(userObj));
    } else {
      dispatch(updateFormError('Fill All the Mandatory Fields.'));
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
      <Header handleModalOpen={openModalForm} title={'Student'} />
      {/* Modal Part */}
      {selectedStudent !== null && selectedStudent?.created_by !== '' && (
        <ModalLayout title="Student Form" modalPosition={MODAL_POSITION.DEFAULT} isOpen={true} closeModal={closeModal}>
          <StudentForm addOrUpdateUser={addOrUpdateStudent} handleCloseModal={closeModal} />
        </ModalLayout>
      )}
      {/* User Table List */}
      <ListItems
        refer="Student"
        itemList={studentList}
        updateAction={updateStudentAction}
        deleteAction={deleteStudentAction}
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
export default StudentList;
