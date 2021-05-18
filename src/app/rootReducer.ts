import { combineReducers } from '@reduxjs/toolkit';

import { LoginPageReducer } from '../containers/LoginPage/LoginPageSlice';
import { AdminHomePageReducer } from '../containers/_admin/AdminHomeSlice';
import { MedicHomePageReducer } from '../containers/_medic/MedicHomeSlice';
import { PatientHomePageReducer } from '../containers/_patient/PatientHomeSlice';

const rootReducer = combineReducers({
  LoginPageReducer: LoginPageReducer,
  AdminHomePageReducer: AdminHomePageReducer,
  MedicHomePageReducer: MedicHomePageReducer,
  PatientHomePageReducer: PatientHomePageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export { rootReducer };
