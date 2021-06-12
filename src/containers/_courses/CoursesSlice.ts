/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tempTopics } from '../../app/entity/constant';
import { IClass, ICreateSchool, ISubject, ITopic } from '../../app/entity/model';
import {
  /* class crud */
  retrieveAllClass,
  createNewClass,
  deleteClassByID,
  /*subject crud*/
  retrieveAllSubject,
  createNewSubject,
  deleteSubjectByID,
  /* topic crud */
  retrieveAllTopicBySubject,
  createNewTopic,
  deleteTopicByID,
} from '../../app/service/shared.service';
interface HomePageState {
  classList: IClass[];
  subjectList: ISubject[];
  topicList: ITopic[];
  pageLoader: boolean;
  topicLoader: boolean;
  submitLoader: boolean;
  formError: string | null;
  selectedSchool: ICreateSchool | null;
  selectedClass: IClass | null;
  selectedSubject: ISubject | null;
  selectedTopic: ITopic | null;
  count: number;
}

const initialState: HomePageState = {
  classList: [],
  subjectList: [],
  topicList: tempTopics,
  pageLoader: false,
  topicLoader: false,
  submitLoader: false,
  formError: '',
  selectedSchool: null,
  selectedClass: null,
  selectedSubject: null,
  selectedTopic: null,
  count: 0,
};

type LanguagePayloadAction = PayloadAction<string>;
type ClassPayloadAction = PayloadAction<IClass | null>;
type SubjectPayloadAction = PayloadAction<ISubject | null>;
type TopicPayloadAction = PayloadAction<ITopic | null>;

export const HomePageSlice = createSlice({
  name: 'CourseHomePageReducer',
  initialState,
  reducers: {
    updateFormError: (state, action: LanguagePayloadAction) => {
      state.formError = action.payload;
    },
    updateSelectedClass: (state, action: ClassPayloadAction) => {
      state.selectedClass = action.payload;
    },
    updateSelectedSubject: (state, action: SubjectPayloadAction) => {
      state.selectedSubject = action.payload;
    },
    updateSelectedTopic: (state, action: TopicPayloadAction) => {
      state.selectedTopic = action.payload;
    },
  },
  extraReducers: {
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
    /*Subject crud */
    [retrieveAllSubject.pending.toString()]: (state) => {
      state.subjectList = [];
      state.pageLoader = true;
    },
    [retrieveAllSubject.fulfilled.toString()]: (state, action: any) => {
      if (action.payload && (action.payload.isAxiosError || action.payload.errors)) {
        state.subjectList = [];
        state.pageLoader = false;
        return;
      }
      state.subjectList = action.payload && action.payload.data ? action.payload.data : [];
      state.pageLoader = false;
    },
    [retrieveAllSubject.rejected.toString()]: (state) => {
      state.subjectList = [];
      state.pageLoader = false;
    },

    [createNewSubject.pending.toString()]: (state) => {
      state.submitLoader = true;
    },
    [createNewSubject.fulfilled.toString()]: (state, action: any) => {
      if (!action.payload || action.payload.isAxiosError || action.payload.errors) {
        state.submitLoader = false;
        state.formError = action.payload.errors.length ? action.payload.errors[0].message : 'Network Error';
        return;
      }
      const index = state.subjectList.findIndex((x) => x.id == action.payload.data.id);

      if (index != -1) {
        state.subjectList[index] = action.payload.data;
      } else {
        state.subjectList.push(action.payload.data);
      }
      state.formError = '';
      state.selectedSubject = {
        subject_name: '',
        subject_image: '',
        standard_id: '',
        created_by: '',
      };
      state.submitLoader = false;
    },
    [createNewSubject.rejected.toString()]: (state, action: any) => {
      state.submitLoader = false;
      state.formError = action.payload.error ? action.payload.error : 'Network Error';
    },

    [deleteSubjectByID.pending.toString()]: (state) => {
      state.submitLoader = true;
    },
    [deleteSubjectByID.fulfilled.toString()]: (state, action: any) => {
      if (!action.payload || action.payload.isAxiosError || action.payload.errors) {
        state.submitLoader = false;
        state.formError = action.payload.errors.length ? action.payload.errors[0].message : 'Network Error';
        return;
      }
      const index = state.subjectList.findIndex((x) => x.id == action.payload.id);

      if (index != -1) {
        state.count -= 1;
        state.subjectList.splice(index, 1);
      }
      state.formError = '';
      state.submitLoader = false;
    },
    [deleteSubjectByID.rejected.toString()]: (state, action: any) => {
      state.submitLoader = false;
      state.formError = action.payload.error ? action.payload.error : 'Network Error';
    },
    /*Topic crud */
    [retrieveAllTopicBySubject.pending.toString()]: (state) => {
      state.topicList = [];
      state.topicLoader = true;
    },
    [retrieveAllTopicBySubject.fulfilled.toString()]: (state, action: any) => {
      if (action.payload && (action.payload.isAxiosError || action.payload.errors)) {
        state.topicList = [];
        state.topicLoader = false;
        return;
      }
      state.topicList = action.payload && action.payload.data ? action.payload.data : [];
      state.topicLoader = false;
    },
    [retrieveAllTopicBySubject.rejected.toString()]: (state) => {
      state.topicList = [];
      state.topicLoader = false;
    },

    [createNewTopic.pending.toString()]: (state) => {
      state.submitLoader = true;
    },
    [createNewTopic.fulfilled.toString()]: (state, action: any) => {
      if (!action.payload || action.payload.isAxiosError || action.payload.errors) {
        state.submitLoader = false;
        state.formError = action.payload.errors.length ? action.payload.errors[0].message : 'Network Error';
        return;
      }
      const index = state.topicList.findIndex((x) => x.id == action.payload.data.id);

      if (index != -1) {
        state.topicList[index] = action.payload.data;
      } else {
        state.topicList.push(action.payload.data);
      }
      state.formError = '';
      state.selectedTopic = {
        topic_name: '',
        subject_id: '',
        subject_name: '',
        created_by: '',
      };
      state.submitLoader = false;
    },
    [createNewTopic.rejected.toString()]: (state, action: any) => {
      state.submitLoader = false;
      state.formError = action.payload.error ? action.payload.error : 'Network Error';
    },

    [deleteTopicByID.pending.toString()]: (state) => {
      state.submitLoader = true;
    },
    [deleteTopicByID.fulfilled.toString()]: (state, action: any) => {
      if (!action.payload || action.payload.isAxiosError || action.payload.errors) {
        state.submitLoader = false;
        state.formError = action.payload.errors.length ? action.payload.errors[0].message : 'Network Error';
        return;
      }
      const index = state.topicList.findIndex((x) => x.id == action.payload.id);

      if (index != -1) {
        state.count -= 1;
        state.topicList.splice(index, 1);
      }
      state.formError = '';
      state.submitLoader = false;
    },
    [deleteTopicByID.rejected.toString()]: (state, action: any) => {
      state.submitLoader = false;
      state.formError = action.payload.error ? action.payload.error : 'Network Error';
    },
  },
});
export const {
  updateFormError,
  updateSelectedClass,
  updateSelectedSubject,
  updateSelectedTopic,
} = HomePageSlice.actions;
export const CourseHomePageReducer = HomePageSlice.reducer;
