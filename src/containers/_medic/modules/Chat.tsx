import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import '../Medic.css';
import { updateActivePanel } from '../../LoginPage/LoginPageSlice';

export const ChatBox: FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser: user } = useSelector((state: RootState) => state.LoginPageReducer);

  useEffect(() => {
    //MAKE API CALLS
  }, []);

  return <h1>This is medic chatscreen page</h1>;
};

// eslint-disable-next-line import/no-default-export
export default ChatBox;
