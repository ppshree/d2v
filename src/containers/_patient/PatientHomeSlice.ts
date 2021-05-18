/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPatientUser, IReadingsDevice } from '../../app/entity/model';
// import { contactSupport, deletePatientProfile } from '../../app/service/patient.service';
// import { getMyReadings } from '../../app/service/shared.service';
interface HomePageState {
  displayGraphPatient: IPatientUser | null;
  pageLoader: boolean;
  listOfRecords: IReadingsDevice[];
  displayChatPatient: IPatientUser | null;
  deleteProfileLoader: boolean;
  isDeletedProfile: boolean;
  deleteProfileError: string | null;
  contactSupportLoader: boolean;
  isContactSupport: boolean;
  contactSupportError: string | null;
}

const initialState: HomePageState = {
  displayGraphPatient: null,
  listOfRecords: [],
  displayChatPatient: null,
  pageLoader: false,
  deleteProfileLoader: false,
  isDeletedProfile: false,
  deleteProfileError: '',
  contactSupportLoader: false,
  isContactSupport: false,
  contactSupportError: '',
};

type PatientUpdatePayloadAction = PayloadAction<any>;
type FlagPayloadAction = PayloadAction<boolean>;
export const HomePageSlice = createSlice({
  name: 'PatientHomePageReducer',
  initialState,
  reducers: {
    updateGraphForPatient: (state, action: PatientUpdatePayloadAction) => {
      state.pageLoader = true;
      state.displayGraphPatient = action.payload;
    },
    updatePageLoader: (state, action: FlagPayloadAction) => {
      state.pageLoader = action.payload;
    },
    updateChatForPatient: (state, action: PatientUpdatePayloadAction) => {
      state.displayChatPatient = action.payload;
    },
  },
  extraReducers: {
    //READINGS FOR PATIENTS SHARED SLICE TO BE DONE FOR BOTH PATIENT AND ADMIN
  },
});
export const { updateGraphForPatient, updatePageLoader, updateChatForPatient } = HomePageSlice.actions;
export const PatientHomePageReducer = HomePageSlice.reducer;
