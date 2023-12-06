import React, {useState} from "react";
import TopBanner from '../Common/TopBanner';
import {SEARCH_ERROR} from '../../Utils/Constants';
import {INSTRUCTOR_HOME_TABS} from '../../Utils/Constants';
import {useSelector} from 'react-redux';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import {AxiosFetchGet} from '../../Utils/AxiosFetch';
import FeedbackAccordion from './FeedbackAccordion';

const InstructorHome = () => {
     const [selectedTab, setSelectedTab] = useState(0);
     const [searchError, setSearchError] = useState(false);
     const [firstName, setFirstName] = useState('');
     const [lastName, setLastName] = useState('');
     const [searchResults, setSearchResults] = useState([]);
     const token = useSelector(state => state.login.token);
    

     const search = () => {
         if (firstName !== '' && lastName !== '') {
            searchWithFullname(firstName, lastName);
         } else if (firstName !== '' && lastName === '') {
            searchWithFirstName(firstName);
         }
     }

     const searchWithFullname = () => {
        const config = {headers:{'Authorization':token}}
        AxiosFetchGet(`instructor/searchWithFullName/${firstName}/${lastName}`, config)
        .then(response => {
            if (response.data && !response.error) {
                setSearchResults([...response.data]);
                setSearchError(false);
            } else {
                setSearchError(true);
                setSearchResults([]);
            }
        })
     }

     const searchWithFirstName = (firstName) => {
        const config = {headers:{'Authorization':token}}
        AxiosFetchGet(`instructor/searchWithFirstName/${firstName}`, config)
        .then(response => {
            if (response.data && !response.error) {
                setSearchResults([...response.data]);
                setSearchError(false);
            } else {
                setSearchError(true);
                setSearchResults([]);
            }
        })
    }
    return(
        <div>
            <TopBanner navTabs={INSTRUCTOR_HOME_TABS} setSelectedTab={setSelectedTab}></TopBanner>
            {
                INSTRUCTOR_HOME_TABS[selectedTab] === INSTRUCTOR_HOME_TABS[0] && 
                <>
                 <Box sx={{ p: 2, m: 'auto', mt: 10 , border: '1px dashed grey' , minWidth: 500, maxWidth: 750, minHeight: 200, maxHeight: 500, display:'flex', flexDirection: 'column', justifyContent:'space-evenly'}}>
                    <div className = "applicantSearchFields">
                    <TextField
                        className = "inputField"
                        id="firstname"
                        label="FirstName"
                        onChange = {(e)=>{setFirstName(e.target.value)}}
                        variant="filled" 
                    />
                    <TextField
                        className = "inputField"
                        disabled = {firstName === '' ? true : false}
                        id="lastname"
                        label="LastName"
                        onChange = {(e)=>{setLastName(e.target.value)}}
                        variant="filled"
                    />
                    </div>

                    {searchError === true && 
                    <Chip color="error" size="small" sx={{ width: '75%', margin:'auto', mt:5}} label={SEARCH_ERROR}/>
                    }       

                    <Button
                        sx={{width: '75%', margin: 'auto'}}
                        variant="contained"
                        onClick={search}>
                        Search
                    </Button>
                </Box>
                {
                    searchResults.length >0 && <FeedbackAccordion searchResults = {searchResults}/>
                }   
                </>
            }
        </div>
    )
}

export default InstructorHome;