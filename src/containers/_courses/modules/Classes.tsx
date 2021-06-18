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
import { FilterBottom } from '../../../components/FilterBottom/FilterBottom';
import { Loader } from '../../../components/Loader/Loader';
import { ClassList } from '../../../components/ClassList/ClassList';
import { ClassForm } from '../../../components/FormModalContent/ClassForm/ClassForm';

export const Classes: FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
  const { classList, selectedClass, count, pageLoader: loader } = useSelector(
    (state: RootState) => state.CourseHomePageReducer,
  );

  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    setOffset(0);
  }, [limit]);

  useEffect(() => {
    dispatch(
      retrieveAllClass({
        limit,
        offset,
      }),
    );
  }, [limit, offset]);

  const openModalForm = () => {
    dispatch(
      updateSelectedClass({
        standard_name: '',
        created_by: loggedInUser.email,
      }),
    );
  };
  const addOrUpdateClass = (classObj: IClass) => {
    try {
      dispatch(updateFormError(''));
      if (classObj.standard_name && loggedInUser.email) {
        dispatch(createNewClass(classObj));
      } else {
        dispatch(updateFormError('Fill All the Mandatory Fields.'));
      }
    } catch (err) {
      dispatch(updateFormError(err));
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
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="sm:my-3 xsm:my-3">
            <ClassList
              updateActionClass={updateClassAction}
              deleteActionClass={deleteClassAction}
              classList={classList}
            />
          </div>
          {/* Filter Bottom Part */}
          <FilterBottom listLength={count} />
        </>
      )}
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default Classes;
