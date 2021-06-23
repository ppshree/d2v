const APPLICATION_URL = {
  LOGIN: '/login',
  CREATE_PASSWORD: '/createPassword/:id',
  RESET_PASSWORD: '/reset-password',

  // ========== School Routes =============
  SCHOOL: '/school',
  SCHOOL_LIST: '/school/schoolList',

  // ========== Courses Routes ============
  COURSE: '/course',
  COURSE_CLASSLIST: '/course/classList',
  COURSE_SUBJECTLIST: '/course/:standard/:standardID/subjects',

  // ========== Global USERS Routes =========
  SUPERADMIN: '/superAdmin',
  SUPERADMIN_DASHBOARD: '/superAdmin/dashboard',
  SUPERADMIN_ADMIN_LIST: '/superAdmin/adminList',
  SUPERADMIN_CONTENTMANAGER_LIST: '/superAdmin/contentManagerList',
  SUPERADMIN_TUTOR_LIST: '/superAdmin/tutorList',
  SUPERADMIN_STUDENT_LIST: '/superAdmin/studentList',
  SUPERADMIN_TAG_LIST: '/superAdmin/tagList',
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_ADMIN_LIST: '/admin/adminList',
  ADMIN_CONTENTMANAGER_LIST: '/admin/contentManagerList',
  ADMIN_TUTOR_LIST: '/admin/tutorList',
  ADMIN_STUDENT_LIST: '/admin/studentList',
  ADMIN_TAG_LIST: '/admin/tagList',
  TUTOR: '/tutor',
  TUTOR_DASHBOARD: '/tutor/dashboard',
  TUTOR_STUDENT_LIST: '/tutor/studentList',
  STUDENT: '/student',
  STUDENT_DASHBOARD: '/student/dashboard',
  CONTENTMANAGER: '/contentManager',
  CONTENTMANAGER_DASHBOARD: '/contentManager/dashboard',
  CONTENTMANAGER_STUDENT_LIST: '/contentManager/studentList',

  // =========== Local USER Routes ===========
  SCHOOLSUPERADMIN: '/schoolSuperAdmin',
  SCHOOLSUPERADMIN_DASHBOARD: '/schoolSuperAdmin/dashboard',
  SCHOOLSUPERADMIN_ADMIN_LIST: '/schoolSuperAdmin/adminList',
  SCHOOLSUPERADMIN_CONTENTMANAGER_LIST: '/schoolSuperAdmin/contentManagerList',
  SCHOOLSUPERADMIN_TUTOR_LIST: '/schoolSuperAdmin/tutorList',
  SCHOOLSUPERADMIN_STUDENT_LIST: '/schoolSuperAdmin/studentList',
  SCHOOLADMIN: '/schoolAdmin',
  SCHOOLADMIN_DASHBOARD: '/schoolAdmin/dashboard',
  SCHOOLADMIN_CONTENTMANAGER_LIST: '/schoolAdmin/contentManagerList',
  SCHOOLADMIN_TUTOR_LIST: '/schoolAdmin/tutorList',
  SCHOOLADMIN_STUDENT_LIST: '/schoolAdmin/studentList',
  SCHOOLTUTOR: '/schoolTutor',
  SCHOOLTUTOR_DASHBOARD: '/schoolTutor/dashboard',
  SCHOOLTUTOR_STUDENT_LIST: '/schoolTutor/studentList',
  SCHOOLSTUDENT: '/schoolStudent',
  SCHOOLSTUDENT_DASHBOARD: '/schoolStudent/dashboard',
  SCHOOLCONTENTMANAGER: '/schoolContentManager',
  SCHOOLCONTENTMANAGER_DASHBOARD: '/schoolContentManager/dashboard',
};

export { APPLICATION_URL };
