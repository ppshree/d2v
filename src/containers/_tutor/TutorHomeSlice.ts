/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Idevice, IMedicUser } from '../../app/entity/model';
import { createNewMedicUser } from '../../app/service/admin.service';
//import { deactivateDevice, activateDevice } from '../../app/service/shared.service';
import { retrieveAllMedics } from '../../app/service/admin.service';
interface HomePageState {
  medicList: IMedicUser[];
  deviceList: Idevice[];
  pageLoader: boolean;
  submitLoader: boolean;
  formError: string | null;
  selectedMedic: IMedicUser | null;
  selectedDevice: Idevice | null;
  deleteProfileLoader: boolean;
  isDeletedProfile: boolean;
  deleteProfileError: string | null;
  contactSupportLoader: boolean;
  isContactSupport: boolean;
  contactSupportError: string | null;
}

const initialState: HomePageState = {
  medicList: [],
  deviceList: [],
  pageLoader: false,
  submitLoader: false,
  formError: '',
  selectedMedic: null,
  selectedDevice: null,
  deleteProfileLoader: false,
  isDeletedProfile: false,
  deleteProfileError: '',
  contactSupportLoader: false,
  isContactSupport: false,
  contactSupportError: '',
};

type LanguagePayloadAction = PayloadAction<string>;
type DevicePayloadAction = PayloadAction<Idevice | null>;
type MedicPayloadAction = PayloadAction<IMedicUser | null>;
export const HomePageSlice = createSlice({
  name: 'TutorHomePageReducer',
  initialState,
  reducers: {
    updateFormError: (state, action: LanguagePayloadAction) => {
      state.formError = action.payload;
    },
    updateSelectedDevice: (state, action: DevicePayloadAction) => {
      state.selectedDevice = action.payload;
    },
    updateSelectedMedic: (state, action: MedicPayloadAction) => {
      state.selectedMedic = action.payload;
    },
  },
  extraReducers: {
    [retrieveAllMedics.pending.toString()]: (state) => {
      state.medicList = [];
      state.pageLoader = true;
    },
    [retrieveAllMedics.fulfilled.toString()]: (state, action: any) => {
      if (action.payload && (action.payload.isAxiosError || action.payload.error)) {
        state.medicList = [];
        state.pageLoader = false;
        return;
      }
      state.medicList = action.payload && action.payload.data ? action.payload.data : [];
      state.pageLoader = false;
    },
    [retrieveAllMedics.rejected.toString()]: (state) => {
      state.medicList = [];
      state.pageLoader = false;
    },

    [createNewMedicUser.pending.toString()]: (state) => {
      state.submitLoader = true;
    },
    [createNewMedicUser.fulfilled.toString()]: (state, action: any) => {
      if (!action.payload || action.payload.isAxiosError || action.payload.error || action.payload.message) {
        state.submitLoader = false;
        state.formError = action.payload.error ? action.payload.error : 'Network Error';
        return;
      }
      const index = state.medicList.findIndex((x) => x.id == action.payload.data.id);

      if (index != -1) {
        state.medicList[index] = action.payload.data;
      } else {
        state.medicList.push(action.payload.data);
      }
      state.formError = '';
      state.selectedMedic = null;
      state.submitLoader = false;
    },
    [createNewMedicUser.rejected.toString()]: (state, action: any) => {
      state.submitLoader = false;
      state.formError = action.payload.error ? action.payload.error : 'Network Error';
    },
  },
});
export const { updateFormError, updateSelectedDevice, updateSelectedMedic } = HomePageSlice.actions;
export const TutorHomePageReducer = HomePageSlice.reducer;
