import React,{useState, useEffect} from "react";
import {useSelector} from 'react-redux'
import TopBanner from '../Common/TopBanner'
import {ADMIN_HOME_TABS, APPLICATION_STATUS} from '../../Utils/Constants'
import OpenTAPositions from './OpenTAPositions';
import Applications from './Applications';
import ApplicationsAccordion from './ApplicationsAccordion';
import {AxiosFetchGet} from '../../Utils/AxiosFetch';
import ViewInstructorFeedback from './ViewInstructorFeedback';

const AdminHome = () => {
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
            AxiosFetchGet(`admin/search/${selectedCourse}`, config)
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
            AxiosFetchGet(`admin/search/${selectedCourse}/${application_status}`, config)
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
            <TopBanner navTabs={ADMIN_HOME_TABS} setSelectedTab={setSelectedTab}></TopBanner>
            {ADMIN_HOME_TABS[selectedTab] === ADMIN_HOME_TABS[0] && 
                <OpenTAPositions/>
            }
            {ADMIN_HOME_TABS[selectedTab] === ADMIN_HOME_TABS[1] && 
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
                    app_status_list={APPLICATION_STATUS}

                />
                {
                    searchResults.length > 0 && <ApplicationsAccordion searchResults = {searchResults} search={search}/>
                }
                </>
            }
            {ADMIN_HOME_TABS[selectedTab] === ADMIN_HOME_TABS[2] && 
                <ViewInstructorFeedback />
            }
        </div>
    )
}

export default AdminHome;