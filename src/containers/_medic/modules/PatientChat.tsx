import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../../Header/Header';
import { SideBar } from '../../../components/SideBar/SideBar';
import { useStylesCommon } from '../../../app/style';
import Toolbar from '@material-ui/core/Toolbar';
import { RootState } from '../../../app/rootReducer';
import '../Medic.css';
import { updateSelectedChat } from '../MedicHomeSlice';
import { updateActivePanel } from '../../LoginPage/LoginPageSlice';
import { retrieveAllPatients } from '../../../app/service/medic.service';
import { IrequestReadings } from '../../../app/entity/model';

export const PatientChat: FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser: user } = useSelector((state: RootState) => state.LoginPageReducer);
  const { displayGraphPatient } = useSelector((state: RootState) => state.MedicHomePageReducer);

  const classes = useStylesCommon();

  useEffect(() => {
    //MAKE API CALLS
  }, []);

  return <h1>This is medic patient chat page</h1>;
};

// eslint-disable-next-line import/no-default-export
export default PatientChat;
