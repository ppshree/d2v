import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../SuperAdmin.css';

// import { retrieveAllMedics, retrieveAllDevice } from '../../../app/service/admin.service';
import { RootState } from '../../../app/rootReducer';

export const Dashboard: FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser: user } = useSelector((state: RootState) => state.LoginPageReducer);

  useEffect(() => {
    //MAKE API CALLS
  }, []);

  return <h1>This is super admin Dashboard page</h1>;
};

// eslint-disable-next-line import/no-default-export
export default Dashboard;
