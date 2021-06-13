import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../School.css';
import { RootState } from '../../../app/rootReducer';
import { Header } from '../../../components/Header/Header';
import { MODAL_POSITION, SCHOOL } from '../../../app/entity/constant';
import { ModalLayout } from '../../../components/shared/ModalLayout';
import { SchoolTableList } from '../../../components/SchoolTableList/SchoolTableList';
import { SchoolForm } from '../../../components/FormModalContent/SchoolForm/SchoolForm';
import { updateSelectedSchool, updateFormError } from '../SchoolSlice';
import { FilterHeader } from '../../../components/FilterHeader/FilterHeader';
import { ICreateSchool } from '../../../app/entity/model';
import { retrieveAllSchool, createSchool, deleteSchoolById } from '../../../app/service/shared.service';
import { FilterBottom } from '../../../components/FilterBottom/FilterBottom';
import { Loader } from '../../../components/Loader/Loader';

export const SchoolList: FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
  const { schoolList, selectedSchool, pageLoader: loader } = useSelector(
    (state: RootState) => state.SchoolHomePageReducer,
  );

  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);

  /* filter State change */
  const [queryName, setQueryName] = useState<string>('');
  const [queryEmail, setQueryEmail] = useState<string>('');
  const [queryPhone, setQueryPhone] = useState<string>('');
  const [queryStatus, setQueryStatus] = useState<number>();
  /* filter State change*/

  /*page state change*/
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (schoolList.length > count) setCount(Math.max(count, schoolList.length));
  }, [schoolList]);

  useEffect(() => {
    // debounce effect
    if (queryEmail || queryName || queryPhone || queryStatus) {
      const timer = setTimeout(() => {
        dispatch(
          retrieveAllSchool({
            name: queryName.toLowerCase(),
            email: queryEmail.toLowerCase(),
            mobile_number: queryPhone,
            status: queryStatus,
            limit,
            offset,
          }),
        );
      }, 500);
      return () => clearTimeout(timer);
    } else {
      dispatch(
        retrieveAllSchool({
          name: '',
          email: '',
          mobile_number: '',
          status: SCHOOL.ACTIVE,
          limit,
          offset,
        }),
      );
    }
  }, [limit, offset, queryName, queryEmail, queryPhone, queryStatus]);

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
    try {
      dispatch(updateFormError(''));
      if (schoolObj.email && schoolObj.school_name && loggedInUser.email) {
        dispatch(createSchool(schoolObj));
      } else {
        dispatch(updateFormError('Fill All the Mandatory Fields.'));
      }
    } catch (err) {
      dispatch(updateFormError(err));
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
      {/* Filter Header Part */}
      <FilterHeader
        filterFor="School"
        setQueryName={setQueryName}
        setQueryEmail={setQueryEmail}
        setQueryPhone={setQueryPhone}
        setQueryStatus={setQueryStatus}
      />
      {/* User Table List */}
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="sm:my-3 xsm:my-3">
            <SchoolTableList
              updateActionSchool={updateSchoolAction}
              deleteActionSchool={deleteSchoolAction}
              schoolList={schoolList}
            />
          </div>
          {/* Filter Bottom Part */}
          <FilterBottom limit={limit} offset={offset} listLength={count} setLimit={setLimit} setOffset={setOffset} />
        </>
      )}
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default SchoolList;
