import { combineReducers } from '@reduxjs/toolkit';

import { LoginPageReducer } from '../containers/LoginPage/LoginPageSlice';
import { AdminHomePageReducer } from '../containers/_admin/AdminHomeSlice';

const rootReducer = combineReducers({
  LoginPageReducer: LoginPageReducer,
  AdminHomePageReducer: AdminHomePageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export { rootReducer };
