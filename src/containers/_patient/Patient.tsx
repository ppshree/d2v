import React, { useEffect, useState } from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { APPLICATION_URL } from '../../app/router/applicationRoutes';
import { PatientDashboard } from './modules/Dashboard';
import { PatientChat } from './modules/Chat';
import { SideBar } from '../../components/SideBar/SideBar';
import { Header } from '../Header/Header';
import { RootState } from '../../app/rootReducer';
import { useStylesCommon } from '../../app/style';
import { signOut } from '../LoginPage/LoginPageSlice';
//import { contactSupport, deletePatientProfile } from '../../app/service/patient.service';
//import { PrivacyPage } from '../../components/Privacy/Privacy';

export const Patient: React.FC = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    isDeletedProfile,
    deleteProfileLoader,
    deleteProfileError,
    isContactSupport,
    contactSupportLoader,
    contactSupportError,
  } = useSelector((state: RootState) => state.PatientHomePageReducer);
  const [alertMessage, setAlertMessage] = useState<string>();
  const [alertMessageType, setAlertMessageType] = useState<'success' | 'error'>();
  const [alertMessageCloseFunction, setAlertMessageCloseFunction] = useState<VoidFunction>();
  const classes = useStylesCommon();

  useEffect(() => {
    //MAKE API CALLS
  }, []);

  return (
    <div className={classes.root} style={{ height: '100%' }}>
      <Header />
      <SideBar />

      <main className={classes.content}>
        <Switch>
          <Redirect exact from={path} to={APPLICATION_URL.PATIENT_DASHBOARD} />
          <Route exact path={APPLICATION_URL.PATIENT_DASHBOARD} component={PatientDashboard}></Route>
          <Route exact path={APPLICATION_URL.PATIENT_CHAT} component={PatientChat}></Route>
          <Redirect to={APPLICATION_URL.PATIENT_DASHBOARD} />
        </Switch>
      </main>
    </div>
  );
};
