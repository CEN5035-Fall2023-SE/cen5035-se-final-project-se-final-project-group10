import React,{useState} from "react";
import {useSelector} from 'react-redux';
import {AxiosFetchGet} from '../../Utils/AxiosFetch';
import TopBanner from '../Common/TopBanner';
import {COMMMEMBER_HOME_TABS, COMMMEMBER_STATUS_LIST} from '../../Utils/Constants';
import Applications from '../Admin/Applications';
import ApplicationsAccordion from '../Admin/ApplicationsAccordion';
import ViewInstructorFeedback from '../Admin/ViewInstructorFeedback';

const MemberHome = () => {
    const token = useSelector(state => state.login.token);
    const [selectedTab, setSelectedTab] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    const [searchError, setSearchError] = useState(false);
    const [application_status, setApplication_status] = useState('');
    const [applicant_offer_status, setApplicant_offer_status] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');


    const search = () => {
        if (selectedCourse === '') {
            setSearchError(true);
        }
        if ((application_status === 'All' || application_status === '') && (applicant_offer_status === 'All' || applicant_offer_status === '') && selectedCourse) {
            console.log('searching with course::', selectedCourse, ' app status::', application_status, ' applicant offer status::', applicant_offer_status )
            const config = {headers:{'Authorization':token}}
            AxiosFetchGet(`member/search/${selectedCourse}`, config)
            .then(response => {
                if (response.data && !response.error) {
                    console.log('search results::', response.data);
                    setSearchResults(response.data);
                    setSearchError(false);
                } else {
                    setSearchError(true);
                    setSearchResults([]);
                }
            }
        ) 
        }

        else if ((application_status !== 'All' || application_status !== '') && (applicant_offer_status === 'All' || applicant_offer_status === '') && selectedCourse) {
            console.log('searching with course::', selectedCourse, ' app status::', application_status, ' applicant offer status::', applicant_offer_status )
            const config = {headers:{'Authorization':token}}
            AxiosFetchGet(`member/search/${selectedCourse}/${application_status}`, config)
            .then(response => {
                if (response.data && !response.error) {
                    console.log('search results::', response.data);
                    setSearchResults(response.data);
                    setSearchError(false);
                } else {
                    setSearchError(true);
                    setSearchResults([]);
                }
            }
        ) 
        }
    }
    return(
        <div>
            <TopBanner navTabs={COMMMEMBER_HOME_TABS} setSelectedTab={setSelectedTab}></TopBanner>
            {COMMMEMBER_HOME_TABS[selectedTab] === COMMMEMBER_HOME_TABS[0] && 
                <>
                <Applications
                    searchResults={searchResults}
                    search = {search}
                    searchError={searchError}
                    application_status={application_status}
                    setApplication_status={setApplication_status}
                    applicant_offer_status={applicant_offer_status}
                    setApplicant_offer_status={setApplicant_offer_status}
                    selectedCourse={selectedCourse}
                    setSelectedCourse={setSelectedCourse}
                    app_status_list={COMMMEMBER_STATUS_LIST}
                />
                {
                    searchResults.length > 0 && <ApplicationsAccordion searchResults = {searchResults} search={search}/>
                }
                </>
            }
            {COMMMEMBER_HOME_TABS[selectedTab] === COMMMEMBER_HOME_TABS[1] && 
                <ViewInstructorFeedback />
            }
        </div>
    )
}

export default MemberHome;