import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../School.css';
import { RootState } from '../../../app/rootReducer';
import { Header } from '../../../components/Header/Header';
import { MODAL_POSITION } from '../../../app/entity/constant';
import { ModalLayout } from '../../../components/shared/ModalLayout';
import { SchoolTableList } from '../../../components/SchoolTableList/SchoolTableList';
import { SchoolForm } from '../../../components/FormModalContent/SchoolForm/SchoolForm';
import { updateSelectedSchool, updateFormError } from '../SchoolSlice';
import { FilterHeader } from '../../../components/FilterHeader/FilterHeader';
import { ICreateSchool } from '../../../app/entity/model';
import { retrieveAllSchool, createSchool, deleteSchoolById } from '../../../app/service/shared.service';
import { FilterBottom } from '../../../components/FilterBottom/FilterBottom';

export const AdminSchoolList: FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state: RootState) => state.LoginPageReducer);
  const { schoolList, selectedSchool, pageLoader: loader } = useSelector(
    (state: RootState) => state.SchoolHomePageReducer,
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
          dispatch(retrieveAllSchool({ filterType: 'search', filterQuery: queryName, limit, offset }));
        }
        if (queryEmail !== '') {
          dispatch(retrieveAllSchool({ filterType: 'search', filterQuery: queryEmail, limit, offset }));
        }
        if (queryPhone !== '') {
          dispatch(retrieveAllSchool({ filterType: 'search', filterQuery: queryPhone, limit, offset }));
        }
        if (queryStatus !== '') {
          dispatch(retrieveAllSchool({ filterType: 'status', filterQuery: queryStatus, limit, offset }));
        }
      }, 500);
      return () => clearTimeout(timer);
    } else {
      dispatch(retrieveAllSchool({ limit, offset }));
    }
  }, [limit, queryName, queryEmail, queryPhone, queryStatus]);

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
        setQueryUserType={setQueryUserType}
        setQueryStatus={setQueryStatus}
      />
      {/* User Table List */}
      {loader ? (
        <div>Loading... </div>
      ) : (
        <div className="sm:my-3 xsm:my-3">
          <SchoolTableList
            updateActionSchool={updateSchoolAction}
            deleteActionSchool={deleteSchoolAction}
            schoolList={schoolList}
          />
        </div>
      )}
      {/* Filter Bottom Part */}
      {/* <FilterBottom setLimit={setLimit} setOffset={setOffset} /> */}
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default AdminSchoolList;
