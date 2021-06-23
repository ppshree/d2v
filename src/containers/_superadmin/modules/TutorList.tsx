/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../SuperAdmin.css';
import { RootState } from '../../../app/rootReducer';
import { Header } from '../../../components/Header/Header';
import { MODAL_POSITION, USER_STATUS } from '../../../app/entity/constant';
import { ModalLayout } from '../../../components/shared/ModalLayout';
import { TutorForm } from '../../../components/FormModalContent/TutorForm/TutorForm';
import { updateSelectedTutor, updateFormError } from '../SuperAdminHomeSlice';
import { ICreateTutor } from '../../../app/entity/model';
import { retrieveAllTutor, createNewTutor, deleteTutor } from '../../../app/service/superadmin.service';
import { ListItems } from '../../../components/ListItems/ListItems';

export const TutorList: FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
  const { tutorList, selectedTutor, count, pageLoader: loader } = useSelector(
    (state: RootState) => state.SuperAdminHomePageReducer,
  );

  const [filterObj, setFilterObj] = useState<any>({});

  useEffect(() => {
    dispatch(retrieveAllTutor(filterObj));
  }, [filterObj]);

  const openModalForm = () => {
    dispatch(
      updateSelectedTutor({
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
  const addOrUpdateTutor = (userObj: ICreateTutor) => {
    dispatch(updateFormError(''));
    if (userObj.email && userObj.name && loggedInUser.email) {
      dispatch(createNewTutor(userObj));
    } else {
      dispatch(updateFormError('Fill All the Mandatory Fields.'));
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
      <Header handleModalOpen={openModalForm} title={'Tutor'} />
      {/* Modal Part */}
      {selectedTutor !== null && selectedTutor?.created_by !== '' && (
        <ModalLayout title="Tutor Form" modalPosition={MODAL_POSITION.DEFAULT} isOpen={true} closeModal={closeModal}>
          <TutorForm addOrUpdateUser={addOrUpdateTutor} handleCloseModal={closeModal} />
        </ModalLayout>
      )}
      {/* User Table List */}
      <ListItems
        refer="Tutor"
        itemList={tutorList}
        updateAction={updateTutorAction}
        deleteAction={deleteTutorAction}
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
export default TutorList;
