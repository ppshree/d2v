import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import '../Patient.css';
import { updateActivePanel } from '../../LoginPage/LoginPageSlice';
import { updateChatForPatient } from '../PatientHomeSlice';

export const PatientChat: FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser: user } = useSelector((state: RootState) => state.LoginPageReducer);

  useEffect(() => {
    //MAKE API
  }, []);

  return <h1>This is patient chat page</h1>;
};

// eslint-disable-next-line import/no-default-export
export default PatientChat;
