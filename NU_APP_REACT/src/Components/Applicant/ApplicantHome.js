import React, {useState, useEffect} from "react";
import {useSelector} from 'react-redux';
import {APPLICANT_HOME_TABS} from '../../Utils/Constants';
import TopBanner from '../Common/TopBanner';
import {FORM_FIELDS_ERROR, APPLICATION_SUBMITTED_SUCCESS} from '../../Utils/Constants';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Chip from '@mui/material/Chip';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AxiosFetchPost, {AxiosFetchGet, AxiosFetchPut} from'../../Utils/AxiosFetch'
import OffersAccordion from './OffersAccordion';
//import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const ApplicantHome = () => {
    const [selectedTab, setSelectedTab] = useState(0)
    const [courses, setCourses] = useState([]);
    const token = useSelector(state => state.login.token);
    const applicant_id = useSelector(state => state.profile.id);
    const [applyFor, setApplyFor] = useState('');
    const [priorExperience, setPriorExperience] = useState('No')
    const [expericeInCourse, setExperienceInCourse] = useState('')
    const [fromDate, setFromDate] = useState(dayjs('2022-04-17'));
    const [toDate, setToDate] = useState(dayjs('2023-04-17'));
    const [selectedFile, setSelectedFile] = useState({});
    const [cvFileId, setCvFileId] = useState('');
    const [error, setError] = useState(false);
    const [applicationSuccessfullySubmitted, setApplicationSuccessfullySubmitted] = useState(false);
    const [allOffers, setAllOffers] = useState([]);
    const [offerAccepted, setOfferAccepted] = useState(false);
    const [offerDeclined,  setOfferDeclined] = useState(false);

    useEffect(() => {
                const config = {headers:{'Authorization':token}}
                AxiosFetchGet(`course/getCourses`, config)
                .then(response => {
                    if (response.data && !response.error) {
                        const courseNames = response.data.map(course => {
                            return {courseName: course.course}
                        });
                        setCourses(courseNames);
                    }
                    }
                ) 
    }, [])
    
    useEffect(() => {
        if ((applicant_id && allOffers.length === 0) || (applicationSuccessfullySubmitted === true) || (offerAccepted ===true) || offerDeclined === true) {
            const config = {headers:{'Authorization':token}}
        AxiosFetchGet(`applicant/getOffers/${applicant_id}`, config)
        .then(response => {
            if (response.data && !response.error) {
                setAllOffers([...response.data]);
            }
            }
        ) 
        }
    }, [applicant_id, applicationSuccessfullySubmitted, offerAccepted, offerDeclined])

    const courseChangeHandler = (event) => {
        const course = event.target.value;
        setApplyFor(course);
    }

    const priorExperienceChangeHandler = (event) => {
        setPriorExperience(event.target.value);
    }

    const ExpericeInCourseChangeHandler = (event) => {
        setExperienceInCourse(event.target.value)
    }

    const fileUploadHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        
    }

    useEffect (() => {
        if (selectedFile && selectedFile.type) {
            const formData = new FormData();
        formData.append('myFile', selectedFile);
        const header = {
            'Authorization' : token
        };
        AxiosFetchPost('applicant/uploadFile', formData, {headers: header})
            .then(response => {
                if (response.data && !response.error) {
                    setCvFileId(response.data);
                    setSelectedFile({});
                }
            });
        }
    }, [selectedFile]);

    const applyForTA = () => {
        // console.log('selected Course::', applyFor);
        // console.log('has prior experience::', priorExperience);
        // console.log('experice in course::', expericeInCourse);
        // console.log('From date::', fromDate.toDate());
        // console.log('To Date::', toDate.toDate());
        // console.log('File Selected::', cvFileName);
        const header = {
            'Authorization' : token
        };
        if (validateAllFields()) {
            const body = buildApplicationBody();
            setApplicationSuccessfullySubmitted(false);
            AxiosFetchPost('applicant/apply', body ,{headers: header})
             .then(response => {
                 if (response.data && !response.error) {
                    setApplicationSuccessfullySubmitted(true);
                    resetFields();
                 }
             })
        }
        // const formData = new FormData();
        // formData.append('file', selectedFile);
        // AxiosFetchPost('applicant/apply', {file: formData})
    }

    const buildApplicationBody = () => {
        if (priorExperience === "No") {
            return {
                "applyFor" : applyFor,
                "priorExperience" : priorExperience,
                "cvFileId" : cvFileId,
                "applicant_id" : applicant_id
        }
        } else {
            return {
                "applyFor" : applyFor,
                "priorExperience" : priorExperience,
                "cvFileId" : cvFileId,
                "applicant_id" : applicant_id,
                "experienceInCourse" : expericeInCourse,
                "fromDate" : fromDate.toDate(),
                "toDate" : toDate.toDate()
        }
        }
        
    }

    const validateAllFields = () => {
        if (priorExperience === 'No') {
            if (applyFor && cvFileId) {
                setError(false);
                return true;
            }
        } else {
            if (applyFor && expericeInCourse && cvFileId && fromDate && toDate) {
                if (toDate.toDate() > new Date()) {
                    setError(true);
                    return false;
                }
                setError(false);
                return true;
            }
        }
        setError(true);
        return false;
    }

    const resetFields = () => {
        setCvFileId('');
        setApplyFor('');
        setPriorExperience('No');
    }

    const acceptOffer = (application_id) => {
        const header = {
            'Authorization' : token
        };
        AxiosFetchPut(`applicant/acceptOffer/${applicant_id}/${application_id}`, {}, {headers: header})
                .then(response => {
                    if (response.data && !response.error) {
                        setOfferAccepted(true);
                    }
                    }
                ) 
    }

    const declineOffer = (application_id) => {
        const header = {
            'Authorization' : token
        };
        AxiosFetchPut(`applicant/declineOffer/${applicant_id}/${application_id}`, {}, {headers: header})
                .then(response => {
                    if (response.data && !response.error) {
                        setOfferDeclined(true);
                    }
                    }
                ) 
    }

    return(
        <div>
            <TopBanner navTabs = {APPLICANT_HOME_TABS} setSelectedTab={setSelectedTab} />
            {APPLICANT_HOME_TABS[selectedTab] === 'Apply' &&
                 <div className='TAApplyForm'>
                 <Box sx={{ p: 2, m: 'auto', mt: 10 , border: '1px dashed grey' , minWidth: 500, maxWidth: 750, minHeight: 500, maxHeight: 750, display:'flex', flexDirection: 'column', justifyContent:'space-evenly'}}>
                    <FormControl variant="filled" className = "inputField" sx={{minWidth: 500}}>
                    <InputLabel id="course-label">Course you want to apply for</InputLabel>
                        <Select
                        labelId="course-label"
                        id="lcourse"
                        value={applyFor}
                        onChange={courseChangeHandler}
                        >
                        {
                            courses.length && courses.map(course=>{
                                return <MenuItem key={course.courseName} value={course.courseName}>{course.courseName}</MenuItem>
                            })
                        }
                        </Select>
                    </FormControl>
                    
                    <div className='PriorExperienceFields'>
                    <FormControl>
                    <Typography variant="subtitle1"align="left">
                        Do you have Prior Experience working as a TA in this course?
                    </Typography>
                    <RadioGroup
                        row
                        name="prior-experience-yes-no"
                        value={priorExperience}
                        onChange={priorExperienceChangeHandler}
                    >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                    </FormControl>

                    {
                    priorExperience === 'Yes' && 
                    <div className='ExperienceSection'>
                        <FormControl variant="filled" className = "inputField" sx={{minWidth: 500}}>
                        <InputLabel id="course-label">Relevant course you have experience with</InputLabel>
                        <Select
                        labelId="course-label"
                        id="lcourse"
                        value={expericeInCourse}
                        onChange={ExpericeInCourseChangeHandler}
                        >
                        {
                            courses.length && courses.map(course=>{
                                return <MenuItem key={course.courseName} value={course.courseName}>{course.courseName}</MenuItem>
                            })
                        }
                        </Select>
                        </FormControl>

                        <div className='DateRange'>
                        <DatePicker
                        label="Start Date"
                        value={fromDate}
                        onChange={(newValue) => setFromDate(newValue)}
                        />
                        <span className='DateSeperator'> - </span>
                        <DatePicker
                        label="End Date"
                        value={toDate}
                        onChange={(newValue) => setToDate(newValue)}
                        />
                        </div>
                    </div>
                    
                    }
                    </div>

                    <Button
                        component="label"
                        variant="contained"
                        >
                        Upload file
                        <VisuallyHiddenInput
                        onChange={fileUploadHandler}
                        type="file" />
                    </Button>
                </Box>
                {error === true && 
                    <Chip color="error" size="small" sx={{ width: 500, margin:'auto', mt:5}} label={FORM_FIELDS_ERROR}/>
                }
                {applicationSuccessfullySubmitted === true && error === false &&
                    <Chip color="success" size="small" sx={{ width: 500, margin:'auto', mt:5}} label={APPLICATION_SUBMITTED_SUCCESS}/>
                }
                <Button sx={{width: 180, margin:'auto', mt: 5}}
                    variant="outlined"
                    onClick={applyForTA}>
                    Submit
                </Button>
                </div>
            }
            {APPLICANT_HOME_TABS[selectedTab] === 'Offers' &&
                <div className='offersAccordionContainer'>
                    <OffersAccordion allOffers = {allOffers} acceptOffer={acceptOffer} declineOffer = {declineOffer}/>
              </div>
            }
        </div>
    )
}

export default ApplicantHome;