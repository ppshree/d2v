import { combineReducers } from '@reduxjs/toolkit';

import { LoginPageReducer } from '../containers/LoginPage/LoginPageSlice';
import { SchoolHomePageReducer } from '../containers/_school/SchoolSlice';
import { SuperAdminHomePageReducer } from '../containers/_superadmin/SuperAdminHomeSlice';
import { CourseHomePageReducer } from '../containers/_courses/CoursesSlice';

const rootReducer = combineReducers({
  LoginPageReducer: LoginPageReducer,
  SchoolHomePageReducer: SchoolHomePageReducer,
  SuperAdminHomePageReducer: SuperAdminHomePageReducer,
  CourseHomePageReducer: CourseHomePageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export { rootReducer };
