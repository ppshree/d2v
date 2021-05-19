import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../Tutor.css';
import { RootState } from '../../../app/rootReducer';
//import { updateActivePanel } from '../../LoginPage/LoginPageSlice';

export const Course: FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser: user } = useSelector((state: RootState) => state.LoginPageReducer);

  useEffect(() => {
    //MAKE API CALLS
  }, []);

  return <h1>This is Tutor Course page</h1>;
};

// eslint-disable-next-line import/no-default-export
export default Course;
