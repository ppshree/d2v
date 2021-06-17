import { ISubTopic, ITopic } from './../entity/model';
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  /* authenticate */
  login as userLogin,
  authenticate as userAuthenticate,

  /* School CRUD */
  getAllSchool,
  addNewSchool,
  updateSchool,
  deleteSchool,

  /* Class crud */
  getAllClass,
  addNewClass,
  updateClass,
  deleteClass,

  /* Subject CRUD */
  getAllSubject,
  addNewSubject,
  updateSubject,
  deleteSubject,

  /* Topic CRUD */
  getAllTopicBySubject,
  addNewTopic,
  updateTopic,
  deleteTopic,

  /* Sub Topic Crud */
  getAllSubTopicByTopic,
  addNewSubTopic,
  updateSubTopic,
  deleteSubTopic,
} from '../api/shared.api';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { IClass, ICreateSchool, ISubject, IFilterObj, IloginUser } from '../entity/model';

// ==================LOGIN API=============================
export const authenticateUser = createAsyncThunk('user/authenticate', async () => {
  const result = await userAuthenticate();
  return result;
});

export const loginUser = createAsyncThunk('user/login', async (obj: IloginUser) => {
  const result = await userLogin(obj);
  return result;
});

// ======================= SCHOOL CRUD ===========================
export const retrieveAllSchool = createAsyncThunk(
  'school/retrieveAllSchool',
  async ({ name, status, limit, offset }: IFilterObj) => {
    return await getAllSchool({ status: status && status, name, limit, offset });
  },
);

export const createSchool = createAsyncThunk('school/addOrUpdateSchool', async (obj: ICreateSchool) => {
  if (obj.isEditFlag) {
    return await updateSchool(obj);
  } else {
    return await addNewSchool(obj);
  }
});

export const deleteSchoolById = createAsyncThunk('school/deleteSchoolById', async (objId: string) => {
  return await deleteSchool(objId);
});

//=========== CRUD FOR CLASS ===========================
export const retrieveAllClass = createAsyncThunk('class/retrieveAllClass', async ({ limit, offset }: IFilterObj) => {
  return await getAllClass({ limit, offset });
});

export const createNewClass = createAsyncThunk('class/addOrUpdateClass', async (obj: IClass) => {
  if (obj.isEditFlag) {
    return await updateClass(obj);
  } else {
    return await addNewClass(obj);
  }
});

export const deleteClassByID = createAsyncThunk('class/deleteClass', async (objId: string) => {
  return await deleteClass(objId);
});

//=========== CRUD FOR SUBJECT ===========================
export const retrieveAllSubject = createAsyncThunk(
  'subject/retrieveAllSubject',
  async ({ standard, limit, offset }: IFilterObj) => {
    return await getAllSubject({ standard, limit, offset });
  },
);

export const createNewSubject = createAsyncThunk('subject/addOrUpdateSubject', async (obj: ISubject) => {
  if (obj.isEditFlag) {
    return await updateSubject(obj);
  } else {
    return await addNewSubject(obj);
  }
});

export const deleteSubjectByID = createAsyncThunk('subject/deleteSubject', async (objId: string) => {
  return await deleteSubject(objId);
});

//=========== CRUD FOR Topic ===========================
export const retrieveAllTopicBySubject = createAsyncThunk(
  'topic/retrieveAllTopicBySubject',
  async ({ subject, limit, offset }: IFilterObj) => {
    return await getAllTopicBySubject({ subject, limit, offset });
  },
);

export const createNewTopic = createAsyncThunk('topic/addOrUpdateTopic', async (obj: ITopic) => {
  if (obj.isEditFlag) {
    return await updateTopic(obj);
  } else {
    return await addNewTopic(obj);
  }
});

export const deleteTopicByID = createAsyncThunk('topic/deleteTopic', async (objId: string) => {
  return await deleteTopic(objId);
});

//=========== CRUD FOR Sub Topic ===========================
export const retrieveAllSubTopicByTopic = createAsyncThunk(
  'subtopic/retrieveAllSubTopicByTopic',
  async ({ topic, limit, offset }: IFilterObj) => {
    return await getAllSubTopicByTopic({ topic, limit, offset });
  },
);

export const createNewSubTopic = createAsyncThunk('topic/addOrUpdateSubTopic', async (obj: ISubTopic) => {
  if (obj.isEditFlag) {
    return await updateSubTopic(obj);
  } else {
    return await addNewSubTopic(obj);
  }
});

export const deleteSubTopicByID = createAsyncThunk('topic/deleteSubTopic', async (objId: string) => {
  return await deleteSubTopic(objId);
});
