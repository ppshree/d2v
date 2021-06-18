import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../SchoolSuperAdmin.css';

import { RootState } from '../../../app/rootReducer';

export const AdminList: FC = () => {
  const dispatch = useDispatch();
  const { loggedInUser: user } = useSelector((state: RootState) => state.LoginPageReducer);

  useEffect(() => {
    //MAKE API CALLS
  }, []);

  return <h1>This is school super admin admin-list page</h1>;
};

// eslint-disable-next-line import/no-default-export
export default AdminList;
