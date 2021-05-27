/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICreateContentManager, ICreateSchool } from '../../app/entity/model';
import {
  retrieveAllContentManagers,
  createNewContentManager,
  deleteContentManager,
} from '../../app/service/superadmin.service';
import { retrieveAllSchoolBySuperAdmin } from '../../app/service/shared.service';
import { USER_STATUS } from '../../app/entity/constant';
interface HomePageState {
  contentManagerList: ICreateContentManager[];
  schoolList: ICreateSchool[];
  pageLoader: boolean;
  submitLoader: boolean;
  formError: string | null;
  selectedContentManager: ICreateContentManager | null;
  selectedSchool: ICreateSchool | null;
}

const initialState: HomePageState = {
  contentManagerList: [],
  schoolList: [],
  pageLoader: false,
  submitLoader: false,
  formError: '',
  selectedContentManager: null,
  selectedSchool: null,
};

type LanguagePayloadAction = PayloadAction<string>;
type ContentManagerPayloadAction = PayloadAction<ICreateContentManager | null>;
type SchoolPayloadAction = PayloadAction<ICreateSchool | null>;
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
    updateSelectedSchool: (state, action: SchoolPayloadAction) => {
      state.selectedSchool = action.payload;
    },
  },
  extraReducers: {
    [retrieveAllContentManagers.pending.toString()]: (state) => {
      state.contentManagerList = [];
      state.pageLoader = true;
    },
    [retrieveAllContentManagers.fulfilled.toString()]: (state, action: any) => {
      if (action.payload && (action.payload.isAxiosError || action.payload.errors)) {
        state.contentManagerList = [];
        state.pageLoader = false;
        return;
      }
      state.contentManagerList = action.payload && action.payload.data ? action.payload.data : [];
      state.pageLoader = false;
    },
    [retrieveAllContentManagers.rejected.toString()]: (state) => {
      state.contentManagerList = [];
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
        state.contentManagerList.splice(index, 1);
      }
      state.formError = '';
      state.submitLoader = false;
    },
    [deleteContentManager.rejected.toString()]: (state, action: any) => {
      state.submitLoader = false;
      state.formError = action.payload.error ? action.payload.error : 'Network Error';
    },
    [retrieveAllSchoolBySuperAdmin.pending.toString()]: (state) => {
      state.schoolList = [];
      state.pageLoader = true;
    },
    [retrieveAllSchoolBySuperAdmin.fulfilled.toString()]: (state, action: any) => {
      if (action.payload && (action.payload.isAxiosError || action.payload.error)) {
        state.schoolList = [];
        state.pageLoader = false;
        return;
      }
      state.schoolList = action.payload && action.payload.data ? action.payload.data : [];
      state.pageLoader = false;
    },
    [retrieveAllSchoolBySuperAdmin.rejected.toString()]: (state) => {
      state.schoolList = [];
      state.pageLoader = false;
    },
  },
});
export const { updateFormError, updateSelectedContentManager, updateSelectedSchool } = HomePageSlice.actions;
export const SuperAdminHomePageReducer = HomePageSlice.reducer;
