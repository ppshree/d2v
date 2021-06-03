import { combineReducers } from '@reduxjs/toolkit';

import { LoginPageReducer } from '../containers/LoginPage/LoginPageSlice';
import { SchoolHomePageReducer } from '../containers/_school/SchoolSlice';
import { SuperAdminHomePageReducer } from '../containers/_superadmin/SuperAdminHomeSlice';

const rootReducer = combineReducers({
  LoginPageReducer: LoginPageReducer,
  SchoolHomePageReducer: SchoolHomePageReducer,
  SuperAdminHomePageReducer: SuperAdminHomePageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export { rootReducer };
