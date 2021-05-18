import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../../app/rootReducer';
import '../Medic.css';
import { updateChatForPatient, updateGraphForPatient, updateSelectedChat } from '../MedicHomeSlice';
import { updateActivePanel } from '../../LoginPage/LoginPageSlice';
import { retrieveAllPatients } from '../../../app/service/medic.service';
import { IPatientUser } from '../../../app/entity/model';
import { useQueryParam } from 'use-query-params';

export const PatientList: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [id] = useQueryParam<string>('id');
  const [isChat] = useQueryParam<string>('isChat');
  const [isDataGraph] = useQueryParam<string>('isDataGraph');

  const { loggedInUser: user } = useSelector((state: RootState) => state.LoginPageReducer);
  const { displayGraphPatient, pageLoader, listOfRecords, displayChatPatient, patientList } = useSelector(
    (state: RootState) => state.MedicHomePageReducer,
  );
  useEffect(() => {
    //MAKE API CALLS
  }, []);
  return <h1>This is medic patient list page</h1>;
};

// eslint-disable-next-line import/no-default-export
export default PatientList;
