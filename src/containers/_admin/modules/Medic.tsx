import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import '../Admin.css';
import { retrieveAllMedics } from '../../../app/service/admin.service';
import { updateActivePanel } from '../../LoginPage/LoginPageSlice';

export const MedicList: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //MAKE API CALLS
  }, []);

  return <h1>This is admin mediclist page</h1>;
};

// eslint-disable-next-line import/no-default-export
export default MedicList;
