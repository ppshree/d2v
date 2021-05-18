import React, { useEffect, useState } from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { APPLICATION_URL } from '../../app/router/applicationRoutes';
import { PatientList } from './modules/PatientList';
import { ChatBox } from './modules/Chat';
import { useStylesCommon } from '../../app/style';
import { RootState } from '../../app/rootReducer';
import { signOut } from '../LoginPage/LoginPageSlice';
import { Header } from '../Header/Header';
import { SideBar } from '../../components/SideBar/SideBar';
import { IrequestReadings } from '../../app/entity/model';

export const Medic: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = useStylesCommon();
  const { path } = useRouteMatch();
  const {
    displayGraphPatient,
    isDeletedProfile,
    deleteProfileLoader,
    deleteProfileError,
    isContactSupport,
    contactSupportLoader,
    contactSupportError,
  } = useSelector((state: RootState) => state.MedicHomePageReducer);
  const [alertMessage, setAlertMessage] = useState<string>();
  const [alertMessageType, setAlertMessageType] = useState<'success' | 'error'>();
  const [alertMessageCloseFunction, setAlertMessageCloseFunction] = useState<VoidFunction>();

  useEffect(() => {
    //MAKE API CALLS
  }, []);

  // const handleContactSupport = (message: string) => {
  //   dispatch(contactSupport(message));
  // };

  // const handleContactSupportSent = () => {
  //   setAlertMessage(undefined);
  //   setAlertMessageType(undefined);
  //   setAlertMessageCloseFunction(undefined);
  // };

  return (
    <div className={classes.root} style={{ height: '100%' }}>
      <Header />
      <SideBar />

      <main className={classes.content}>
        <Switch>
          <Redirect exact from={path} to={APPLICATION_URL.MEDIC_PATIENT_LIST} />
          <Route exact path={APPLICATION_URL.MEDIC_PATIENT_LIST} component={PatientList} />
          <Route exact path={APPLICATION_URL.MEDIC_CHAT} component={ChatBox} />
          <Redirect to={APPLICATION_URL.MEDIC_PATIENT_LIST} />
        </Switch>
      </main>
    </div>
  );
};
