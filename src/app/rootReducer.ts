import { combineReducers } from '@reduxjs/toolkit';

import { LoginPageReducer } from '../containers/LoginPage/LoginPageSlice';
import { SuperAdminHomePageReducer } from '../containers/_superadmin/SuperAdminHomeSlice';

const rootReducer = combineReducers({
  LoginPageReducer: LoginPageReducer,
  SuperAdminHomePageReducer: SuperAdminHomePageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export { rootReducer };
