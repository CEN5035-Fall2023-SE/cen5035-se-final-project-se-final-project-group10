export const BASE_URL = 'http://localhost:8080/';
export const ADMIN_HOME_TABS = ['Courses', 'Applications', 'Instructor Feedback'];
export const APPLICANT_HOME_TABS = ['Apply', 'Offers'];
export const COMMMEMBER_HOME_TABS = ['Applications', 'Instructor Feedback'];
export const INSTRUCTOR_HOME_TABS = ['Feedback'];
export const DEPARTMENT = ['Computer Science'];
export const FORM_FIELDS_ERROR = "One or more fields are blank or invalid. Please fill and try again.";
export const SEARCH_ERROR = "Could not find results matching the search criteria. Please modiry search and try again."
export const API_ERROR = 'Something went wrong. Please try again later.'
export const FEEDBACK_SUCCESS = 'Feedback is saved successfully.'
export const OPEN_POSITIONS_ERROR = 'Please change course and try again.'
export const APPLICATION_SUBMITTED_SUCCESS = "Application successfully submitted."
export const APPLICATION_APPROVAL_STATUS_PENDING = 'PENDING';
export const APPLICATION_APPROVAL_STATUS_APPROVED = 'APPROVED';
export const APPLICATION_APPROVAL_STATUS_REJECTED = 'REJECTED';
export const APPLICATION_ACCEPTED_STATUS_ACCEPTED = 'Accepted';
export const APPLICATION_ACCEPTED_STATUS_DECLINED = 'Declined';
export const APPLICATION_STATUS_ALL = 'All';
export const APPLICATION_STATUS_INREVIEW = 'In Review';
export const APPLICATION_STATUS_COMMMEMBERREVIEW = 'Committee Member Review';
export const APPLICATION_STATUS_COMMMEMBERAPPROVED = 'Committee Member Approved';
export const APPLICATION_STATUS_COMMMEMBERREJECTED = 'Committee Member Rejected';
export const APPLICATION_STATUS_OFFERSENT = 'Offer Sent';
export const APPLICATION_STATUS_REJECTED = 'Rejected';
export const APPLICATION_STATUS = [APPLICATION_STATUS_ALL, APPLICATION_STATUS_INREVIEW, APPLICATION_STATUS_COMMMEMBERREVIEW, APPLICATION_STATUS_COMMMEMBERAPPROVED, APPLICATION_STATUS_COMMMEMBERREJECTED, APPLICATION_STATUS_OFFERSENT, APPLICATION_STATUS_REJECTED];
export const COMMMEMBER_STATUS_LIST = [APPLICATION_STATUS_ALL, APPLICATION_STATUS_COMMMEMBERREVIEW, APPLICATION_STATUS_COMMMEMBERAPPROVED, APPLICATION_STATUS_COMMMEMBERREJECTED]
export const ADMIN_APPLICATION_STATUS_SENDOFFER = 'Send Offer';
export const ADMIN_APPLICATION_STATUS_REJECT = 'Reject';
export const APPLICANT_OFFER_STATUS = ['All', 'Offer Accepted', 'Offer Declined'];

export const getAdmin_Application_Status_dropdownValues = (currentStatus) => {
    if (currentStatus === APPLICATION_STATUS_INREVIEW) {
        return [APPLICATION_STATUS_COMMMEMBERREVIEW, ADMIN_APPLICATION_STATUS_REJECT];
    } else if (currentStatus === APPLICATION_STATUS_COMMMEMBERAPPROVED) {
        return [ADMIN_APPLICATION_STATUS_SENDOFFER, ADMIN_APPLICATION_STATUS_REJECT];
    } else if (currentStatus === APPLICATION_STATUS_COMMMEMBERREJECTED) {
        return [ADMIN_APPLICATION_STATUS_REJECT];
    } else {
        return [ADMIN_APPLICATION_STATUS_REJECT];
    }
}

export const getMember_Application_Status_dropdownValues = (currentStatus) => {
    if (currentStatus === APPLICATION_STATUS_COMMMEMBERREVIEW) {
        return [APPLICATION_STATUS_COMMMEMBERAPPROVED, APPLICATION_STATUS_COMMMEMBERREJECTED];
    } else if (currentStatus === APPLICATION_STATUS_COMMMEMBERAPPROVED) {
        return [APPLICATION_STATUS_COMMMEMBERREJECTED];
    } else {
        return [APPLICATION_STATUS_COMMMEMBERAPPROVED];
    }
}