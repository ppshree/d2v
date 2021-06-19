/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../School.css';
import { RootState } from '../../../app/rootReducer';
import { Header } from '../../../components/Header/Header';
import { MODAL_POSITION, SCHOOL } from '../../../app/entity/constant';
import { ModalLayout } from '../../../components/shared/ModalLayout';
import { SchoolForm } from '../../../components/FormModalContent/SchoolForm/SchoolForm';
import { updateSelectedSchool, updateFormError } from '../SchoolSlice';
import { ICreateSchool } from '../../../app/entity/model';
import { retrieveAllSchool, createSchool, deleteSchoolById } from '../../../app/service/shared.service';
import { ListItems } from '../../../components/ListItems/ListItems';

export const SchoolList: FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
  const { schoolList, selectedSchool, pageLoader: loader, count } = useSelector(
    (state: RootState) => state.SchoolHomePageReducer,
  );

  const [filterObj, setFilterObj] = useState<any>({});

  useEffect(() => {
    dispatch(retrieveAllSchool(filterObj));
  }, [filterObj]);

  const openModalForm = () => {
    dispatch(
      updateSelectedSchool({
        school_name: '',
        school_head: '',
        classes: '',
        address: '',
        pin: '',
        city: '',
        contact_number: '',
        email: '',
        affiliation_no: '',
        authorized_by: '',
        is_active: false,
        created_by: loggedInUser.email,
      }),
    );
  };
  const addOrUpdateSchool = (schoolObj: ICreateSchool) => {
    dispatch(updateFormError(''));
    if (schoolObj.email && schoolObj.school_name && loggedInUser.email) {
      dispatch(createSchool(schoolObj));
    } else {
      dispatch(updateFormError('Fill All the Mandatory Fields.'));
    }
  };

  const updateSchoolAction = (schoolObj: ICreateSchool) => {
    dispatch(updateSelectedSchool(schoolObj));
  };

  const deleteSchoolAction = (schoolId: string) => {
    dispatch(deleteSchoolById(schoolId));
  };

  const closeModal = () => {
    dispatch(updateFormError(''));
    dispatch(
      updateSelectedSchool({
        school_name: '',
        school_head: '',
        classes: '',
        address: '',
        pin: '',
        city: '',
        contact_number: '',
        email: '',
        affiliation_no: '',
        authorized_by: '',
        is_active: false,
        created_by: '',
      }),
    );
  };

  return (
    <>
      {/* Header Part */}
      <Header handleModalOpen={openModalForm} title={'School'} />
      {/* Modal Part */}
      {selectedSchool !== null && selectedSchool?.created_by !== '' && (
        <ModalLayout title="School Form" modalPosition={MODAL_POSITION.DEFAULT} isOpen={true} closeModal={closeModal}>
          <SchoolForm addOrUpdateSchool={addOrUpdateSchool} handleCloseModal={closeModal} />
        </ModalLayout>
      )}
      {/* School Table List */}
      <ListItems
        refer="School"
        itemList={schoolList}
        updateAction={updateSchoolAction}
        deleteAction={deleteSchoolAction}
        filterObj={filterObj}
        setFilterObj={setFilterObj}
      >
        <ListItems.FilterHeader key="filterheader" />
        <ListItems.SchoolTableList isLoading={loader} key="itemList" />
        <ListItems.FilterBottom key="filterBottom" listLength={count} />
      </ListItems>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default SchoolList;
