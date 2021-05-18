import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import '../SuperAdmin.css';
import { retrieveAllMedics } from '../../../app/service/admin.service';
import { updateActivePanel } from '../../LoginPage/LoginPageSlice';

export const Master: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //MAKE API CALLS
  }, []);

  return <h1>This is super admin Master page</h1>;
};

// eslint-disable-next-line import/no-default-export
export default Master;
