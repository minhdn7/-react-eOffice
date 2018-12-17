

const apiUrl = {
    ROOT_URL: 'http://14.225.6.6/qlvb/',
    CHECK_VERSION_URL : "api/checkversion/",
    LOGIN_URL : "api/login/",
    LOGOUT_URL : "api/logout/",
    CHANGE_PASSWORD_URL : "api/updatepassword/",
    GET_USER_INFO_URL : "api/getuserinfo/me/",
    GET_CONTACT_INFO_URL : "api/getuserinfo/{userid}/",
    GET_CONTACT_URL : "api/getcontacts/",
    GET_COUNT_DOC_WAIT_URL : "api/document/getpagingwaitingdocument/",
    GET_DOC_WAIT_URL : "api/document/getlistwaitingdocument/",
    GET_COUNT_DOC_PROCECSSED_URL : "api/document/getpagingprocesseddocument/",
    GET_DOC_PROCECSSED_URL : "api/document/getlistprocesseddocument/",
    CHECK_RECOVER_DOC_RECEIVE_URL : "api/incommingdocument/checkrecoverdocument/{id}/",
    CHECK_RECOVER_DOC_SEND_URL : "api/outgoingdocument/checkrecoverdocument/{id}/",
    RECOVER_DOC_RECEIVE_URL : "api/incommingdocument/recoverdocument/{id}/",
    RECOVER_DOC_SEND_URL : "api/outgoingdocument/recovertranferdocument/{id}/",
    VIEW_DIAGRAM_URL : "qlvbdh/view_img.jsp",
    GET_COUNT_DOC_NOTIFICATION_URL : "api/document/getpagingnotifydocument/",
    GET_DOC_NOTIFICATION_URL : "api/document/getlistnotifydocument/",
    GET_COUNT_DOC_EXPIRED_URL : "api/document/getpagingoutdatedocument/",
    GET_DOC_EXPIRED_URL : "api/document/getlistoutdatedocument/",
    GET_DETAIL_DOCUMENT_URL : "api/document/getdetaildocument/",
    GET_LOGS_DOCUMENT_URL : "api/document/getactivitylog/",
    GET_ATTACH_FILE_DOCUMENT_URL : "api/file/getfileattach/",
    GET_RELATED_DOCUMENT_WAITING_URL : "api/document/getdocrelated/{id}/",
    GET_RELATED_FILE_WAITING_URL : "api/file/getfilerelated/{id}/",
    GET_DETAIL_DOCUMENT_PROCESSED_URL : "api/document/getdetaildocument/{id}/",
    GET_LOGS_DOCUMENT_PROCESSED_URL : "api/document/getactivitylog/{id}/",
    GET_ATTACH_FILE_DOCUMENT_PROCESSED_URL : "api/file/getfileattach/{id}/",
    GET_RELATED_DOCUMENT_PROCESSED_URL : "api/document/getdocrelated/{id}/",
    GET_RELATED_FILE_PROCESSED_URL : "api/file/getfilerelated/{id}/",
    GET_DETAIL_DOCUMENT_EXPIRED_URL : "api/document/getdetaildocument/{id}/",
    GET_LOGS_DOCUMENT_EXPIRED_URL : "api/document/getactivitylog/{id}/",
    GET_ATTACH_FILE_DOCUMENT_EXPIRED_URL : "api/file/getfileattach/{id}/",
    GET_RELATED_DOCUMENT_EXPIRED_URL : "api/document/getdocrelated/{id}/",
    GET_RELATED_FILE_EXPIRED_URL : "api/file/getfilerelated/{id}/",
    GET_DETAIL_DOCUMENT_NOTIFICATION_URL : "api/document/getdetaildocument/{id}/",
    GET_LOGS_DOCUMENT_NOTIFICATION_URL : "api/document/getactivitylog/{id}/",
    GET_ATTACH_FILE_DOCUMENT_NOTIFICATION_URL : "api/file/getfileattach/{id}/",
    GET_RELATED_DOCUMENT_NOTIFICATION_URL : "api/document/getdocrelated/{id}/",
    GET_RELATED_FILE_NOTIFICATION_URL : "api/file/getfilerelated/{id}/",
    GET_LIST_TYPE_DOC_URL : "api/document/getlisttypecode/",
    GET_LIST_FIELD_DOC_URL : "api/document/getlistfield/",
    GET_LIST_PRIORITY_DOC_URL : "api/document/getlistpriority/",

    GET_LIST_TYPE_CHANGE_DOC_URL : "api/document/getapprovedvalue/",
    GET_COUNT_DOC_SEARCH_URL : "api/document/paginglookupbyparam/",
    GET_DOC_SEARCH_URL : "api/document/getlistlookupbyparam/",
    GET_COUNT_DOC_ADVANCE_SEARCH_URL : "api/document/paginglookupdocument/",
    GET_DOC_ADVANCE_SEARCH_URL : "api/document/lookupdocument/",
    GET_COUNT_DOC_MARK_URL : "api/document/pagingsigneddocument/",
    GET_DOC_MARK_URL : "api/document/getlistsigneddocument/",
    GET_DETAIL_DOCUMENT_MARK_URL : "api/document/getdetaildocument/{id}/",
    GET_LOGS_DOCUMENT_MARK_URL : "api/document/getactivitylog/{id}/",
    GET_ATTACH_FILE_DOCUMENT_MARK_URL : "api/file/getfileattach/{id}/",
    GET_RELATED_DOCUMENT_MARK_URL : "api/document/getdocrelated/{id}/",
    GET_RELATED_FILE_MARK_URL : "api/file/getfilerelated/{id}/",
    GET_SCHEDULES_URL : "api/schedule/getlistworkingschedule/",
    CHECK_MARK_DOC_URL : "api/document/checksigneddocument/{id}/",
    MARK_DOC_URL : "api/document/signeddocument/",
    SIGN_DOC_URL : "VNPTsignature/rest/ioffice/signature",
    GET_DETAIL_SCHEDULE_MEETING_URL : "api/schedule/getdetailmeetingschedule/{id}/",
    GET_DETAIL_SCHEDULE_BUSSINESS_URL : "api/schedule/getdetailworkingschedule/{id}/",
    GET_PERSONS_PROCESS_URL : "api/document/getusertotranfer/",
    GET_PERSONS_SEND_URL : "api/document/getuserconcurrentsend/",
    GET_PERSONS_NOTIFY_URL : "api/getuserunitnotify/",
    GET_REPORT_DOCUMENT_URL : "api/report/documentreport/",
    GET_REPORT_WORK_URL : "api/report/jobreport/{month}/",
    CHECK_COMMENT_DOC_URL : "api/incommingdocument/checksendcomment/{id}/",
    COMMENT_DOC_URL : "api/incommingdocument/sendcomment/",
    CHANGE_DOC_SEND_URL : "api/outgoingdocument/tranferdocument/",
    CHANGE_DOC_RECEIVE_URL : "api/incommingdocument/tranferdocument/",
    CHANGE_DOC_PROCESS_URL : "api/document/forwarddocument/",
    CHANGE_DOC_NOTIFY_URL : "api/document/forwarddocument/",
    CHANGE_DOC_DIRECT_URL : "api/incommingdocument/promulgatedocument/",
    GET_NOTIFY_URL : "api/notifycation/getlistnotify/",
    READED_NOTIFY_URL : "api/notifycation/setreadnotify/",
    GET_JOB_POSSITION_URL : "api/jobposition/getlistjobposition/",
    GET_UNIT_URL : "api/document/getlistunit/",
    DOWNLOAD_FILE_URL : "api/file/download/{id}/",
    GET_FILE_URL_DOC : "api/generateotp/",
    GET_AVATAR_URL : "api/getavatar/{userid}/",
    GET_CHIDAO_NHAN_URL : "api/information/getlistreceive/",
    GET_CHIDAO_GUI_URL : "api/information/getlistsend/",
    UPLOAD_FILE_URL : "api/file/upload/",
    CREATE_CHIDAO_URL : "api/information/create/",
    EDIT_CHIDAO_URL : "api/information/edit/",
    GET_PERSON_CHIDAO_URL : "api/getuserunit/",
    SAVE_PERSON_CHIDAO_URL : "api/information/updateemployee/",
    GET_PERSON_RECEIVE_CHIDAO_URL : "api/information/getlistnotify/",
    GET_PERSON_GROUP_CHIDAO_URL : "api/information/getgroup/",
    SEND_CHIDAO_URL : "api/information/send/",
    GET_FLOW_CHIDAO_URL : "api/information/getflow/{id}/",
    GET_FILE_CHIDAO_URL : "api/information/getfiles/{id}/",
    GET_DELETE_CHIDAO_URL : "api/information/delete/{id}/",
    GET_DETAIL_CHIDAO_URL : "api/information/getdetail/{id}/",
    DOWNLOAD_FILE_CHIDAO_URL : "api/information/download/",
    GET_PERSON_IN_GROUP_CHIDAO_URL : "api/information/getuserbygroup/",
    GET_PERSON_REPLY_CHIDAO_URL : "api/information/getlistuser/",
    GET_PERSON_RECEIVED_CHIDAO_URL : "api/information/getuserreceiver/",
    FINISH_DOC_URL : "api/document/finish/{id}/",
    CHECK_FINISH_DOC_URL : "api/document/checkfinish/",
    GET_LIEN_THONG_XL_URL : "api/unit/getlistinternaltranfer/",
    GET_LIEN_THONG_BH_URL : "api/unit/getlistinternal/{id}/",
    GET_SCHEDULES_BOSS_URL : "api/schedule/getlistworkingschedule/",
    CHECK_CHANGE_DOC_PROCECSSED_URL : "api/document/checktranferadditional/{id}/",
    CHANGE_DOC_NOTIFY_XEMDB_URL : "api/document/tranfernotify/",
    GET_GROUP_PERSON_CN_URL : "api/group/getlistgroupuser/",
    GET_GROUP_PERSON_DV_URL : "api/group/getlistgroupunit/",
    GET_PERSONS_SEND_PROCESS_URL : "api/document/getlistusertranfer/",
    GET_UNIT_CLERK_URL : "api/document/getlistunitpublish/",
    CHECK_STORE_DOC_URL : "api/notifycation/getdetailnotify/{id}/",
    GET_LIST_COMMENT_URL : "api/document/getlistcomment/",
    GUI_Y_KIEN_TRAO_DOI : "api/outgoingdocument/contributecomments/",
}
export default apiUrl;