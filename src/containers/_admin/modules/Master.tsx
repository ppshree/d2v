import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import '../Admin.css';

export const Master: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //MAKE API CALLS
  }, []);

  return <h1>This is admin Master page</h1>;
};

// eslint-disable-next-line import/no-default-export
export default Master;
