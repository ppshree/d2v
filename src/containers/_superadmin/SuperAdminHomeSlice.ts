/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICreateContentManager } from '../../app/entity/model';
import { createNewContentManager } from '../../app/service/superadmin.service';
import { retrieveAllContentManagers } from '../../app/service/superadmin.service';
import { temp_content_managers, USER_STATUS } from '../../app/entity/constant';
interface HomePageState {
  contentManagerList: ICreateContentManager[];
  pageLoader: boolean;
  submitLoader: boolean;
  formError: string | null;
  selectedContentManager: ICreateContentManager | null;
}

const initialState: HomePageState = {
  contentManagerList: temp_content_managers,
  pageLoader: false,
  submitLoader: false,
  formError: '',
  selectedContentManager: null,
};

type LanguagePayloadAction = PayloadAction<string>;
type ContentManagerPayloadAction = PayloadAction<ICreateContentManager | null>;
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
  },
  extraReducers: {
    [retrieveAllContentManagers.pending.toString()]: (state) => {
      state.contentManagerList = [];
      state.pageLoader = true;
    },
    [retrieveAllContentManagers.fulfilled.toString()]: (state, action: any) => {
      if (action.payload && (action.payload.isAxiosError || action.payload.error)) {
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
      if (!action.payload || action.payload.isAxiosError || action.payload.error || action.payload.message) {
        state.submitLoader = false;
        state.formError = action.payload.error ? action.payload.error : 'Network Error';
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
  },
});
export const { updateFormError, updateSelectedContentManager } = HomePageSlice.actions;
export const SuperAdminHomePageReducer = HomePageSlice.reducer;
