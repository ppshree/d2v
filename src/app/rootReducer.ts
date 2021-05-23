import { combineReducers } from '@reduxjs/toolkit';

import { LoginPageReducer } from '../containers/LoginPage/LoginPageSlice';
import { SuperAdminHomePageReducer } from '../containers/_superadmin/SuperAdminHomeSlice';
import { AdminHomePageReducer } from '../containers/_admin/AdminHomeSlice';

const rootReducer = combineReducers({
  LoginPageReducer: LoginPageReducer,
  AdminHomePageReducer: AdminHomePageReducer,
  SuperAdminHomePageReducer: SuperAdminHomePageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export { rootReducer };
