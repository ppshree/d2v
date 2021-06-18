import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../SchoolTutor.css';
import { RootState } from '../../../app/rootReducer';

export const Course: FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser: user } = useSelector((state: RootState) => state.LoginPageReducer);

  useEffect(() => {
    //MAKE API CALLS
  }, []);

  return <h1>This is School Tutor Course page</h1>;
};

// eslint-disable-next-line import/no-default-export
export default Course;
