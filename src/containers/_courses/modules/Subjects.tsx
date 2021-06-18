import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../Courses.css';
import { RootState } from '../../../app/rootReducer';
import { Header } from '../../../components/Header/Header';
import { DEFAULT, MODAL_POSITION } from '../../../app/entity/constant';
import { ModalLayout } from '../../../components/shared/ModalLayout';
import { SubjectList } from '../../../components/SubjectList/SubjectList';
import { SubjectForm } from '../../../components/FormModalContent/SubjectForm/SubjectForm';
import { updateFormError, updateSelectedSubject } from '../../_courses/CoursesSlice';
import { ISubject } from '../../../app/entity/model';
import { retrieveAllSubject, createNewSubject, deleteSubjectByID } from '../../../app/service/shared.service';
import { FilterBottom } from '../../../components/FilterBottom/FilterBottom';
import { Loader } from '../../../components/Loader/Loader';
import { useParams } from 'react-router-dom';

export const Subjects: FC = () => {
  const dispatch = useDispatch();

  const { standardID, standard }: { standardID: string; standard: string } = useParams();

  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
  const { subjectList, selectedSubject, count, pageLoader: loader } = useSelector(
    (state: RootState) => state.CourseHomePageReducer,
  );

  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    setOffset(0);
  }, [limit]);

  useEffect(() => {
    dispatch(
      retrieveAllSubject({
        standard,
        limit,
        offset,
      }),
    );
  }, [limit, offset]);

  const openModalForm = () => {
    dispatch(
      updateSelectedSubject({
        subject_name: '',
        subject_image: '',
        standard_id: standardID,
        created_by: loggedInUser.email,
      }),
    );
  };
  const addOrUpdateSubject = (subjectObj: ISubject) => {
    try {
      dispatch(updateFormError(''));
      if (subjectObj.subject_name && subjectObj.subject_image && loggedInUser.email) {
        dispatch(createNewSubject(subjectObj));
      } else {
        dispatch(updateFormError('Fill All the Mandatory Fields.'));
      }
    } catch (err) {
      dispatch(updateFormError(err));
    }
  };

  const updateSubjectAction = (subjectObj: ISubject) => {
    dispatch(updateSelectedSubject(subjectObj));
  };

  const deleteSubjectAction = (subjectId: string) => {
    dispatch(deleteSubjectByID(subjectId));
  };

  const closeModal = () => {
    dispatch(updateFormError(''));
    dispatch(
      updateSelectedSubject({
        subject_name: '',
        subject_image: '',
        standard_id: '',
        created_by: '',
      }),
    );
  };

  return (
    <>
      {/* Header Part */}
      <Header handleModalOpen={openModalForm} title={'Subject'} />
      {/* Modal Part */}
      {selectedSubject !== null && selectedSubject?.created_by !== '' && (
        <ModalLayout title="Subject Form" modalPosition={MODAL_POSITION.DEFAULT} isOpen={true} closeModal={closeModal}>
          <SubjectForm addOrUpdateSubject={addOrUpdateSubject} handleCloseModal={closeModal} />
        </ModalLayout>
      )}
      {/* User Table List */}
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="sm:my-3 xsm:my-3">
            <SubjectList
              updateActionSubject={updateSubjectAction}
              deleteActionSubject={deleteSubjectAction}
              subjectList={subjectList}
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
export default Subjects;
