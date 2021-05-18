import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../../app/rootReducer';
import '../Patient.css';
// import { updateActivePanel } from '../../LoginPage/LoginPageSlice';
// import { updateGraphForPatient, updatePageLoader, updateChatForPatient } from '../PatientHomeSlice';
// import { ListItems } from '../../../components/ListItem/ListItems';
// import { getMyReadings } from '../../../app/service/shared.service';
// import { IrequestReadings } from '../../../app/entity/model';

export const PatientDashboard: FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser: user } = useSelector((state: RootState) => state.LoginPageReducer);
  const { displayGraphPatient, pageLoader } = useSelector((state: RootState) => state.PatientHomePageReducer);

  const { t } = useTranslation();
  const [displayUserReadings, setDisplayUserReadings] = useState(true);

  useEffect(() => {
    //make API calls
  }, []);

  return <h1>this is patient dashboard page</h1>;
};

// eslint-disable-next-line import/no-default-export
export default PatientDashboard;
