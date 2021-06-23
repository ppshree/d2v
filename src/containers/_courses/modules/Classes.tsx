/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../Courses.css';
import { RootState } from '../../../app/rootReducer';
import { Header } from '../../../components/Header/Header';
import { MODAL_POSITION } from '../../../app/entity/constant';
import { ModalLayout } from '../../../components/shared/ModalLayout';
import { updateSelectedClass, updateFormError } from '../CoursesSlice';
import { IClass } from '../../../app/entity/model';
import { retrieveAllClass, createNewClass, deleteClassByID } from '../../../app/service/shared.service';
import { ClassForm } from '../../../components/FormModalContent/ClassForm/ClassForm';
import { ListItems } from '../../../components/ListItems/ListItems';

export const Classes: FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
  const { classList, selectedClass, count, pageLoader: loader } = useSelector(
    (state: RootState) => state.CourseHomePageReducer,
  );

  const [filterObj, setFilterObj] = useState<any>({});

  useEffect(() => {
    dispatch(retrieveAllClass(filterObj));
  }, [filterObj]);

  const openModalForm = () => {
    dispatch(
      updateSelectedClass({
        standard_name: '',
        created_by: loggedInUser.email,
      }),
    );
  };
  const addOrUpdateClass = (classObj: IClass) => {
    dispatch(updateFormError(''));
    if (classObj.standard_name && loggedInUser.email) {
      dispatch(createNewClass(classObj));
    } else {
      dispatch(updateFormError('Fill All the Mandatory Fields.'));
    }
  };

  const updateClassAction = (classObj: IClass) => {
    dispatch(updateSelectedClass(classObj));
  };

  const deleteClassAction = (classId: string) => {
    dispatch(deleteClassByID(classId));
  };

  const closeModal = () => {
    dispatch(updateFormError(''));
    dispatch(
      updateSelectedClass({
        standard_name: '',
        created_by: '',
      }),
    );
  };

  return (
    <>
      {/* Header Part */}
      <Header handleModalOpen={openModalForm} title={'Class'} />
      {/* Modal Part */}
      {selectedClass !== null && selectedClass?.created_by !== '' && (
        <ModalLayout title="Class Form" modalPosition={MODAL_POSITION.DEFAULT} isOpen={true} closeModal={closeModal}>
          <ClassForm addOrUpdateClass={addOrUpdateClass} handleCloseModal={closeModal} />
        </ModalLayout>
      )}
      {/* User Table List */}
      <ListItems
        refer="Class"
        itemList={classList}
        updateAction={updateClassAction}
        deleteAction={deleteClassAction}
        filterObj={filterObj}
        setFilterObj={setFilterObj}
      >
        <ListItems.ClassList isLoading={loader} key="itemList" />
        <ListItems.FilterBottom key="filterBottom" listLength={count} />
      </ListItems>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default Classes;
