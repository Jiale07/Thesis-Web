import Vue from 'vue'
import Vuex from 'vuex'

import loginAbout from './loginAbout'
import errorAbout from "./errorAbout";
import studentInfo from "./admin/InfoManagement/studentInfoAbout";
import teacherInfo from "./admin/InfoManagement/teacherInfo";
import roleInfoAbout from "./admin/InfoManagement/roleInfoAbout";
import majorInfoAbout from "./admin/InfoManagement/majorInfoAbout";
import tutorStore from "./admin/GraduationDesignAbout/tutorStore";
import topicView from "./teacher/topicView";
import choiceInstructor from "./student/independentChoice/choiceInstructor";
import studentHome from "./student/studentHome";
import teacherHome from "./teacher/teacherHome";
import announcementDetail from "./admin/Announcement/AnnouncementDetail";
import readTheAnnouncement from "./publicView/readTheAnnouncement";
import teamAboutStore from "./teacher/TeamAboutStore";
import thesisProposalAudit from "./teacher/ThesisProposalAudit";
import thesisProposalViewSetting from "./admin/ThesisProposalViewSetting";
import thesisRecordOfStudentStore from "./teacher/ThesisRecordOfStudentStore";
import thesisAuditViewStore from "./teacher/ThesisAuditViewStore";
import thesisDetailViewStore from "./student/ThesisDetailViewStore";
import thesisFinalDetail from "./teacher/ThesisFinalDetailStore";

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    loginAbout,
    errorAbout,
    studentInfo,
    teacherInfo,
    roleInfoAbout,
    majorInfoAbout,
    announcementDetail,
    thesisProposalViewSetting,


    //teacher
    teacherHome,
    tutorStore,
    thesisProposalAudit,
    thesisRecordOfStudentStore,
    thesisAuditViewStore,

    //teacher
    topicView,
    teamAboutStore,
    thesisFinalDetail,

    //studentRouter
    studentHome,
    choiceInstructor,
    thesisDetailViewStore,

    // public
    readTheAnnouncement
  }
})
