import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../SuperAdmin.css';
// import { ListItems } from '../../../components/ListItem/ListItems';
import { RootState } from '../../../app/rootReducer';
//import { updateActivePanel } from '../../LoginPage/LoginPageSlice';

export const SchoolList: FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser: user } = useSelector((state: RootState) => state.LoginPageReducer);

  useEffect(() => {
    //MAKE API CALLS
  }, []);

  return <h1>This is super admin school-list page</h1>;
};

// eslint-disable-next-line import/no-default-export
export default SchoolList;
