/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../Courses.css';
import { RootState } from '../../../app/rootReducer';
import { Header } from '../../../components/Header/Header';
import { MODAL_POSITION } from '../../../app/entity/constant';
import { ModalLayout } from '../../../components/shared/ModalLayout';
import { SubjectForm } from '../../../components/FormModalContent/SubjectForm/SubjectForm';
import { updateFormError, updateSelectedSubject } from '../../_courses/CoursesSlice';
import { ISubject } from '../../../app/entity/model';
import { retrieveAllSubject, createNewSubject, deleteSubjectByID } from '../../../app/service/shared.service';
import { useParams } from 'react-router-dom';
import { ListItems } from '../../../components/ListItems/ListItems';

export const Subjects: FC = () => {
  const dispatch = useDispatch();

  const { standardID, standard }: { standardID: string; standard: string } = useParams();

  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
  const { subjectList, selectedSubject, count, pageLoader: loader } = useSelector(
    (state: RootState) => state.CourseHomePageReducer,
  );

  const [filterObj, setFilterObj] = useState<any>({ standard });

  useEffect(() => {
    dispatch(retrieveAllSubject(filterObj));
  }, [filterObj]);

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
    dispatch(updateFormError(''));
    if (subjectObj.subject_name && subjectObj.subject_image && loggedInUser.email) {
      dispatch(createNewSubject(subjectObj));
    } else {
      dispatch(updateFormError('Fill All the Mandatory Fields.'));
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
      {/* Subject List */}
      <ListItems
        refer="Subject"
        itemList={subjectList}
        updateAction={updateSubjectAction}
        deleteAction={deleteSubjectAction}
        filterObj={filterObj}
        setFilterObj={setFilterObj}
      >
        <ListItems.SubjectList isLoading={loader} key="itemList" />
        <ListItems.FilterBottom key="filterBottom" listLength={count} />
      </ListItems>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default Subjects;
