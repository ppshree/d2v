/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IClass, ICreateSchool } from '../../app/entity/model';
import {
  retrieveAllSchool,
  createSchool,
  deleteSchoolById,
  retrieveAllClass,
  createNewClass,
  deleteClassByID,
} from '../../app/service/shared.service';
interface HomePageState {
  schoolList: ICreateSchool[];
  classList: IClass[];
  pageLoader: boolean;
  submitLoader: boolean;
  formError: string | null;
  selectedSchool: ICreateSchool | null;
  selectedClass: IClass | null;
  count: number;
}

const initialState: HomePageState = {
  schoolList: [],
  classList: [],
  pageLoader: false,
  submitLoader: false,
  formError: '',
  selectedSchool: null,
  selectedClass: null,
  count: 0,
};

type LanguagePayloadAction = PayloadAction<string>;
type SchoolPayloadAction = PayloadAction<ICreateSchool | null>;
type ClassPayloadAction = PayloadAction<IClass | null>;

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
    updateSelectedClass: (state, action: ClassPayloadAction) => {
      state.selectedClass = action.payload;
    },
  },
  extraReducers: {
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
    /*Class crud */
    [retrieveAllClass.pending.toString()]: (state) => {
      state.classList = [];
      state.count = 0;
      state.pageLoader = true;
    },
    [retrieveAllClass.fulfilled.toString()]: (state, action: any) => {
      if (action.payload && (action.payload.isAxiosError || action.payload.errors)) {
        state.classList = [];
        state.count = 0;
        state.pageLoader = false;
        return;
      }
      state.classList = action.payload && action.payload.data ? action.payload.data : [];
      state.count = action.payload ? action.payload.count : 0;
      state.pageLoader = false;
    },
    [retrieveAllClass.rejected.toString()]: (state) => {
      state.classList = [];
      state.count = 0;
      state.pageLoader = false;
    },

    [createNewClass.pending.toString()]: (state) => {
      state.submitLoader = true;
    },
    [createNewClass.fulfilled.toString()]: (state, action: any) => {
      if (!action.payload || action.payload.isAxiosError || action.payload.errors) {
        state.submitLoader = false;
        state.formError = action.payload.errors.length ? action.payload.errors[0].message : 'Network Error';
        return;
      }
      const index = state.classList.findIndex((x) => x.id == action.payload.data.id);

      if (index != -1) {
        state.classList[index] = action.payload.data;
      } else {
        state.count += 1;
        state.classList.push(action.payload.data);
      }
      state.formError = '';
      state.selectedClass = {
        standard_name: '',
        created_by: '',
      };
      state.submitLoader = false;
    },
    [createNewClass.rejected.toString()]: (state, action: any) => {
      state.submitLoader = false;
      state.formError = action.payload.error ? action.payload.error : 'Network Error';
    },

    [deleteClassByID.pending.toString()]: (state) => {
      state.submitLoader = true;
    },
    [deleteClassByID.fulfilled.toString()]: (state, action: any) => {
      if (!action.payload || action.payload.isAxiosError || action.payload.errors) {
        state.submitLoader = false;
        state.formError = action.payload.errors.length ? action.payload.errors[0].message : 'Network Error';
        return;
      }
      const index = state.classList.findIndex((x) => x.id == action.payload.id);

      if (index != -1) {
        state.count -= 1;
        state.classList.splice(index, 1);
      }
      state.formError = '';
      state.submitLoader = false;
    },
    [deleteClassByID.rejected.toString()]: (state, action: any) => {
      state.submitLoader = false;
      state.formError = action.payload.error ? action.payload.error : 'Network Error';
    },
  },
});
export const { updateFormError, updateSelectedSchool, updateSelectedClass } = HomePageSlice.actions;
export const SchoolHomePageReducer = HomePageSlice.reducer;
