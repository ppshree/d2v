/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPatientUser, IReadingsDevice } from '../../app/entity/model';
import { retrieveAllPatients } from '../../app/service/medic.service';
//import { getReadings, getChatList, getChatMessages, sendChat } from '../../app/service/shared.service';
interface HomePageState {
  pageLoader: boolean;
  chatLoader: boolean;
  deleteProfileLoader: boolean;
  isDeletedProfile: boolean;
  deleteProfileError: string | null;
  assignedDeveList: any[];
  patientList: IPatientUser[];
  submitLoader: boolean;
  formError: string | null;
  selectedPatient: IPatientUser | null;
  displayGraphPatient: IPatientUser | null;
  displayChatPatient: IPatientUser | null;
  deviceModalFlag: boolean;
  listOfRecords: IReadingsDevice[];
  listOfChatRooms: any[]; //all chatrooms here
  selectedChatRoom: any;
  contactSupportLoader: boolean;
  isContactSupport: boolean;
  contactSupportError: string | null;
}

const initialState: HomePageState = {
  pageLoader: false,
  chatLoader: false,
  deleteProfileLoader: false,
  isDeletedProfile: false,
  deleteProfileError: '',
  patientList: [],
  assignedDeveList: [],
  submitLoader: false,
  formError: '',
  selectedPatient: null,
  displayGraphPatient: null,
  displayChatPatient: null,
  deviceModalFlag: false,
  listOfRecords: [],
  listOfChatRooms: [],
  selectedChatRoom: null,
  contactSupportLoader: false,
  isContactSupport: false,
  contactSupportError: '',
};

type LanguagePayloadAction = PayloadAction<string>;
type ChatRoomPayloadAction = PayloadAction<any>;
type FlagPayloadAction = PayloadAction<boolean>;
type PatientPayloadAction = PayloadAction<IPatientUser | null>;
type PatientUpdatePayloadAction = PayloadAction<any>;
export const HomePageSlice = createSlice({
  name: 'MedicHomePageReducer',
  initialState,
  reducers: {
    updateSelectedChat: (state, action: ChatRoomPayloadAction) => {
      state.selectedChatRoom = action.payload;
    },
    updateSelectedPatient: (state, action: PatientPayloadAction) => {
      state.selectedPatient = action.payload;
    },
    updateFormError: (state, action: LanguagePayloadAction) => {
      state.formError = action.payload;
    },
    updateGraphForPatient: (state, action: PatientUpdatePayloadAction) => {
      state.displayGraphPatient = action.payload;
    },
    updateChatForPatient: (state, action: PatientUpdatePayloadAction) => {
      state.displayChatPatient = action.payload;
    },
    updateDeviceModalFlag: (state, action: FlagPayloadAction) => {
      state.deviceModalFlag = action.payload;
    },
  },
  extraReducers: {
    [retrieveAllPatients.pending.toString()]: (state) => {
      state.patientList = [];
      state.pageLoader = true;
    },
    [retrieveAllPatients.fulfilled.toString()]: (state, action: any) => {
      if (action.payload && (action.payload.isAxiosError || action.payload.error)) {
        state.patientList = [];
        state.pageLoader = false;
        return;
      }
      state.patientList = action.payload && action.payload.data ? action.payload.data : [];
      state.pageLoader = false;
    },
    [retrieveAllPatients.rejected.toString()]: (state) => {
      state.patientList = [];
      state.pageLoader = false;
    },

    //READINGS FOR PATIENTS SHARED SLICE TO BE DONE FOR BOTH PATIENT AND ADMIN
  },
});
export const {
  //updateActivePanel,
  updateSelectedPatient,
  updateChatForPatient,
  updateFormError,
  updateDeviceModalFlag,
  updateGraphForPatient,
  updateSelectedChat,
} = HomePageSlice.actions;
export const MedicHomePageReducer = HomePageSlice.reducer;
