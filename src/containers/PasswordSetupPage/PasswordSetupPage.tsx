/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { useParams } from 'react-router-dom';

export const PasswordSetupPage: React.FC = () => {
  const { id }: { id: string } = useParams();
  console.log(id);
  return (
    <div className="login-background">
      <input type="text" placeholder="Set password" />
    </div>
  );
};
