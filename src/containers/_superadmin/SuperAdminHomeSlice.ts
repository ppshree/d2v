/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICreateAdmin, ICreateContentManager, ICreateTutor, ICreateStudent } from '../../app/entity/model';
import {
  retrieveAllContentManagers,
  createNewContentManager,
  deleteContentManager,
  retrieveAllAdmin,
  createNewAdmin,
  deleteAdmin,
  retrieveAllTutor,
  createNewTutor,
  deleteTutor,
  retrieveAllStudent,
  createNewStudent,
  deleteStudent,
} from '../../app/service/superadmin.service';
import { USER_STATUS } from '../../app/entity/constant';
interface HomePageState {
  adminList: ICreateAdmin[];
  contentManagerList: ICreateContentManager[];
  tutorList: ICreateTutor[];
  studentList: ICreateStudent[];
  pageLoader: boolean;
  submitLoader: boolean;
  formError: string | null;
  selectedContentManager: ICreateContentManager | null;
  selectedAdmin: ICreateAdmin | null;
  selectedTutor: ICreateTutor | null;
  selectedStudent: ICreateStudent | null;
  count: number;
}

const initialState: HomePageState = {
  adminList: [],
  contentManagerList: [],
  tutorList: [],
  studentList: [],
  pageLoader: false,
  submitLoader: false,
  formError: '',
  selectedContentManager: null,
  selectedAdmin: null,
  selectedStudent: null,
  selectedTutor: null,
  count: 0,
};

type LanguagePayloadAction = PayloadAction<string>;
type ContentManagerPayloadAction = PayloadAction<ICreateContentManager | null>;
type AdminPayloadAction = PayloadAction<ICreateAdmin | null>;
type TutorPayloadAction = PayloadAction<ICreateTutor | null>;
type StudentPayloadAction = PayloadAction<ICreateStudent | null>;
export const HomePageSlice = createSlice({
  name: 'SuperAdminHomePageReducer',
  initialState,
  reducers: {
    updateFormError: (state, action: LanguagePayloadAction) => {
      state.formError = action.payload;
    },
    updateSelectedContentManager: (state, action: ContentManagerPayloadAction) => {
      state.selectedContentManager = action.payload;
    },
    updateSelectedAdmin: (state, action: AdminPayloadAction) => {
      state.selectedAdmin = action.payload;
    },
    updateSelectedTutor: (state, action: TutorPayloadAction) => {
      state.selectedTutor = action.payload;
    },
    updateSelectedStudent: (state, action: StudentPayloadAction) => {
      state.selectedStudent = action.payload;
    },
  },
  extraReducers: {
    [retrieveAllContentManagers.pending.toString()]: (state) => {
      state.contentManagerList = [];
      state.count = 0;
      state.pageLoader = true;
    },
    [retrieveAllContentManagers.fulfilled.toString()]: (state, action: any) => {
      if (action.payload && (action.payload.isAxiosError || action.payload.errors)) {
        state.contentManagerList = [];
        state.count = 0;
        state.pageLoader = false;
        return;
      }
      state.contentManagerList = action.payload && action.payload.data ? action.payload.data : [];
      state.count = action.payload ? action.payload.count : 0;
      state.pageLoader = false;
    },
    [retrieveAllContentManagers.rejected.toString()]: (state) => {
      state.contentManagerList = [];
      state.count = 0;
      state.pageLoader = false;
    },

    [createNewContentManager.pending.toString()]: (state) => {
      state.submitLoader = true;
    },
    [createNewContentManager.fulfilled.toString()]: (state, action: any) => {
      if (!action.payload || action.payload.isAxiosError || action.payload.errors) {
        state.submitLoader = false;
        state.formError = action.payload.errors.length ? action.payload.errors[0].message : 'Network Error';
        return;
      }
      const index = state.contentManagerList.findIndex((x) => x.id == action.payload.data.id);

      if (index != -1) {
        state.contentManagerList[index] = action.payload.data;
      } else {
        state.count += 1;
        state.contentManagerList.push(action.payload.data);
      }
      state.formError = '';
      state.selectedContentManager = {
        first_name: '',
        last_name: '',
        email: '',
        mobile_number: '',
        role_id: '',
        standard: '',
        school_code: '',
        status: USER_STATUS.PENDING,
        created_by: '',
      };
      state.submitLoader = false;
    },
    [createNewContentManager.rejected.toString()]: (state, action: any) => {
      state.submitLoader = false;
      state.formError = action.payload.error ? action.payload.error : 'Network Error';
    },

    [deleteContentManager.pending.toString()]: (state) => {
      state.submitLoader = true;
    },
    [deleteContentManager.fulfilled.toString()]: (state, action: any) => {
      if (!action.payload || action.payload.isAxiosError || action.payload.errors) {
        state.submitLoader = false;
        state.formError = action.payload.errors.length ? action.payload.errors[0].message : 'Network Error';
        return;
      }
      const index = state.contentManagerList.findIndex((x) => x.id == action.payload.id);

      if (index != -1) {
        state.count -= 1;
        state.contentManagerList.splice(index, 1);
      }
      state.formError = '';
      state.submitLoader = false;
    },
    [deleteContentManager.rejected.toString()]: (state, action: any) => {
      state.submitLoader = false;
      state.formError = action.payload.error ? action.payload.error : 'Network Error';
    },
    [retrieveAllAdmin.pending.toString()]: (state) => {
      state.adminList = [];
      state.count = 0;
      state.pageLoader = true;
    },
    [retrieveAllAdmin.fulfilled.toString()]: (state, action: any) => {
      if (action.payload && (action.payload.isAxiosError || action.payload.errors)) {
        state.adminList = [];
        state.count = 0;
        state.pageLoader = false;
        return;
      }
      state.adminList = action.payload && action.payload.data ? action.payload.data : [];
      state.count = action.payload ? action.payload.count : 0;
      state.pageLoader = false;
    },
    [retrieveAllAdmin.rejected.toString()]: (state) => {
      state.adminList = [];
      state.count = 0;
      state.pageLoader = false;
    },

    [createNewAdmin.pending.toString()]: (state) => {
      state.submitLoader = true;
    },
    [createNewAdmin.fulfilled.toString()]: (state, action: any) => {
      if (!action.payload || action.payload.isAxiosError || action.payload.errors) {
        state.submitLoader = false;
        state.formError = action.payload.errors.length ? action.payload.errors[0].message : 'Network Error';
        return;
      }
      const index = state.adminList.findIndex((x) => x.id == action.payload.data.id);

      if (index != -1) {
        state.adminList[index] = action.payload.data;
      } else {
        state.adminList.push(action.payload.data);
        state.count += 1;
      }
      state.formError = '';
      state.selectedAdmin = {
        first_name: '',
        last_name: '',
        email: '',
        mobile_number: '',
        role_id: '',
        school_code: '',
        status: USER_STATUS.PENDING,
        created_by: '',
      };
      state.submitLoader = false;
    },
    [createNewAdmin.rejected.toString()]: (state: any, action: any) => {
      state.submitLoader = false;
      state.formError = action.payload.error ? action.payload.error : 'Network Error';
    },

    [deleteAdmin.pending.toString()]: (state) => {
      state.submitLoader = true;
    },
    [deleteAdmin.fulfilled.toString()]: (state, action: any) => {
      if (!action.payload || action.payload.isAxiosError || action.payload.errors) {
        state.submitLoader = false;
        state.formError = action.payload.errors.length ? action.payload.errors[0].message : 'Network Error';
        return;
      }
      const index = state.adminList.findIndex((x) => x.id == action.payload.id);

      if (index != -1) {
        state.count -= 1;
        state.adminList.splice(index, 1);
      }
      state.formError = '';
      state.submitLoader = false;
    },
    [deleteAdmin.rejected.toString()]: (state, action: any) => {
      state.submitLoader = false;
      state.formError = action.payload.error ? action.payload.error : 'Network Error';
    },
    [retrieveAllTutor.pending.toString()]: (state) => {
      state.tutorList = [];
      state.count = 0;
      state.pageLoader = true;
    },
    [retrieveAllTutor.fulfilled.toString()]: (state, action: any) => {
      if (action.payload && (action.payload.isAxiosError || action.payload.errors)) {
        state.tutorList = [];
        state.count = 0;
        state.pageLoader = false;
        return;
      }
      state.tutorList = action.payload && action.payload.data ? action.payload.data : [];
      state.count = action.payload ? action.payload.count : 0;
      state.pageLoader = false;
    },
    [retrieveAllTutor.rejected.toString()]: (state) => {
      state.tutorList = [];
      state.count = 0;
      state.pageLoader = false;
    },

    [createNewTutor.pending.toString()]: (state) => {
      state.submitLoader = true;
    },
    [createNewTutor.fulfilled.toString()]: (state, action: any) => {
      if (!action.payload || action.payload.isAxiosError || action.payload.errors) {
        state.submitLoader = false;
        state.formError = action.payload.errors.length ? action.payload.errors[0].message : 'Network Error';
        return;
      }
      const index = state.tutorList.findIndex((x) => x.id == action.payload.data.id);

      if (index != -1) {
        state.tutorList[index] = action.payload.data;
      } else {
        state.count += 1;
        state.tutorList.push(action.payload.data);
      }
      state.formError = '';
      state.selectedTutor = {
        first_name: '',
        last_name: '',
        email: '',
        mobile_number: '',
        role_id: '',
        standard: '',
        school_code: '',
        status: USER_STATUS.PENDING,
        created_by: '',
      };
      state.submitLoader = false;
    },
    [createNewTutor.rejected.toString()]: (state, action: any) => {
      state.submitLoader = false;
      state.formError = action.payload.error ? action.payload.error : 'Network Error';
    },

    [deleteTutor.pending.toString()]: (state) => {
      state.submitLoader = true;
    },
    [deleteTutor.fulfilled.toString()]: (state, action: any) => {
      if (!action.payload || action.payload.isAxiosError || action.payload.errors) {
        state.submitLoader = false;
        state.formError = action.payload.errors.length ? action.payload.errors[0].message : 'Network Error';
        return;
      }
      const index = state.tutorList.findIndex((x) => x.id == action.payload.id);

      if (index != -1) {
        state.count -= 1;
        state.tutorList.splice(index, 1);
      }
      state.formError = '';
      state.submitLoader = false;
    },
    [deleteTutor.rejected.toString()]: (state, action: any) => {
      state.submitLoader = false;
      state.formError = action.payload.error ? action.payload.error : 'Network Error';
    },
    [retrieveAllStudent.pending.toString()]: (state) => {
      state.studentList = [];
      state.count = 0;
      state.pageLoader = true;
    },
    [retrieveAllStudent.fulfilled.toString()]: (state, action: any) => {
      if (action.payload && (action.payload.isAxiosError || action.payload.errors)) {
        state.studentList = [];
        state.count = 0;
        state.pageLoader = false;
        return;
      }
      state.studentList = action.payload && action.payload.data ? action.payload.data : [];
      state.count = action.payload ? action.payload.count : 0;
      state.pageLoader = false;
    },
    [retrieveAllStudent.rejected.toString()]: (state) => {
      state.studentList = [];
      state.count = 0;
      state.pageLoader = false;
    },

    [createNewStudent.pending.toString()]: (state) => {
      state.submitLoader = true;
    },
    [createNewStudent.fulfilled.toString()]: (state, action: any) => {
      if (!action.payload || action.payload.isAxiosError || action.payload.errors) {
        state.submitLoader = false;
        state.formError = action.payload.errors.length ? action.payload.errors[0].message : 'Network Error';
        return;
      }
      const index = state.studentList.findIndex((x) => x.id == action.payload.data.id);

      if (index != -1) {
        state.studentList[index] = action.payload.data;
      } else {
        state.count += 1;
        state.studentList.push(action.payload.data);
      }
      state.formError = '';
      state.selectedStudent = {
        first_name: '',
        last_name: '',
        email: '',
        mobile_number: '',
        role_id: '',
        standard: '',
        school_code: '',
        status: USER_STATUS.PENDING,
        created_by: '',
      };
      state.submitLoader = false;
    },
    [createNewStudent.rejected.toString()]: (state, action: any) => {
      state.submitLoader = false;
      state.formError = action.payload.error ? action.payload.error : 'Network Error';
    },

    [deleteStudent.pending.toString()]: (state) => {
      state.submitLoader = true;
    },
    [deleteStudent.fulfilled.toString()]: (state, action: any) => {
      if (!action.payload || action.payload.isAxiosError || action.payload.errors) {
        state.submitLoader = false;
        state.formError = action.payload.errors.length ? action.payload.errors[0].message : 'Network Error';
        return;
      }
      const index = state.studentList.findIndex((x) => x.id == action.payload.id);

      if (index != -1) {
        state.count -= 1;
        state.studentList.splice(index, 1);
      }
      state.formError = '';
      state.submitLoader = false;
    },
    [deleteStudent.rejected.toString()]: (state, action: any) => {
      state.submitLoader = false;
      state.formError = action.payload.error ? action.payload.error : 'Network Error';
    },
  },
});
export const {
  updateFormError,
  updateSelectedContentManager,
  updateSelectedAdmin,
  updateSelectedTutor,
  updateSelectedStudent,
} = HomePageSlice.actions;
export const SuperAdminHomePageReducer = HomePageSlice.reducer;
