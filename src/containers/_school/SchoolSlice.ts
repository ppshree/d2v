/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICreateSchool } from '../../app/entity/model';
import {
  /* school crud */
  retrieveAllSchool,
  createSchool,
  deleteSchoolById,
} from '../../app/service/shared.service';
interface HomePageState {
  schoolList: ICreateSchool[];
  pageLoader: boolean;
  submitLoader: boolean;
  formError: string | null;
  selectedSchool: ICreateSchool | null;
  count: number;
}

const initialState: HomePageState = {
  schoolList: [],
  pageLoader: false,
  submitLoader: false,
  formError: '',
  selectedSchool: null,
  count: 0,
};

type LanguagePayloadAction = PayloadAction<string>;
type SchoolPayloadAction = PayloadAction<ICreateSchool | null>;

export const HomePageSlice = createSlice({
  name: 'SchoolHomePageReducer',
  initialState,
  reducers: {
    updateFormError: (state, action: LanguagePayloadAction) => {
      state.formError = action.payload;
    },
    updateSelectedSchool: (state, action: SchoolPayloadAction) => {
      state.selectedSchool = action.payload;
    },
  },
  extraReducers: {
    /* School CRUD */
    [retrieveAllSchool.pending.toString()]: (state) => {
      state.schoolList = [];
      state.count = 0;
      state.pageLoader = true;
    },
    [retrieveAllSchool.fulfilled.toString()]: (state, action: any) => {
      if (action.payload && (action.payload.isAxiosError || action.payload.error)) {
        state.schoolList = [];
        state.count = 0;
        state.pageLoader = false;
        return;
      }
      state.schoolList = action.payload && action.payload.data ? action.payload.data : [];
      state.count = action.payload ? action.payload.count : 0;
      state.pageLoader = false;
    },
    [retrieveAllSchool.rejected.toString()]: (state) => {
      state.schoolList = [];
      state.count = 0;
      state.pageLoader = false;
    },
    [createSchool.pending.toString()]: (state) => {
      state.submitLoader = true;
    },
    [createSchool.fulfilled.toString()]: (state, action: any) => {
      if (!action.payload || action.payload.isAxiosError || action.payload.errors) {
        state.submitLoader = false;
        state.formError = action.payload.errors.length ? action.payload.errors[0].message : 'Network Error';
        return;
      }
      const index = state.schoolList.findIndex((x) => x.id == action.payload.data.id);

      if (index != -1) {
        state.schoolList[index] = action.payload.data;
      } else {
        state.schoolList.push(action.payload.data);
        state.count += 1;
      }
      state.formError = '';
      state.selectedSchool = {
        school_name: '',
        school_head: '',
        classes: '',
        address: '',
        pin: '',
        city: '',
        contact_number: '',
        email: '',
        affiliation_no: '',
        authorized_by: '',
        is_active: false,
        created_by: '',
      };
      state.submitLoader = false;
    },
    [createSchool.rejected.toString()]: (state, action: any) => {
      state.submitLoader = false;
      state.formError = action.payload.error ? action.payload.error : 'Network Error';
    },
    [deleteSchoolById.pending.toString()]: (state) => {
      state.submitLoader = true;
    },
    [deleteSchoolById.fulfilled.toString()]: (state, action: any) => {
      if (!action.payload || action.payload.isAxiosError || action.payload.errors) {
        state.submitLoader = false;
        state.formError = action.payload.errors.length ? action.payload.errors[0].message : 'Network Error';
        return;
      }
      const index = state.schoolList.findIndex((x) => x.id == action.payload.id);

      if (index != -1) {
        state.count -= 1;
        state.schoolList.splice(index, 1);
      }
      state.formError = '';
      state.submitLoader = false;
    },
    [deleteSchoolById.rejected.toString()]: (state, action: any) => {
      state.submitLoader = false;
      state.formError = action.payload.error ? action.payload.error : 'Network Error';
    },
  },
});
export const { updateFormError, updateSelectedSchool } = HomePageSlice.actions;
export const SchoolHomePageReducer = HomePageSlice.reducer;
