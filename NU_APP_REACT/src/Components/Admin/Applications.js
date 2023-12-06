import react, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import {AxiosFetchGet} from '../../Utils/AxiosFetch';
import MenuItem from '@mui/material/MenuItem';
import {DEPARTMENT, APPLICANT_OFFER_STATUS, SEARCH_ERROR} from '../../Utils/Constants';


const Applications = ({app_status_list, search, searchError, application_status, setApplication_status, applicant_offer_status, setApplicant_offer_status, selectedCourse, setSelectedCourse}) => {

    const [courses, setCourses] = useState({});
    

    const token = useSelector(state => state.login.token);

    const courseChangeHandler = (event) => {
        setSelectedCourse(event.target.value);
    }

    const applicationStatusChangeHandler = (event) => {
            setApplication_status(event.target.value);
    }

    const applicantApplicationStatusChangeHandler = (event) => {
            setApplicant_offer_status(event.target.value);
    }

    useEffect(() => {
        const config = {headers:{'Authorization':token}}
        AxiosFetchGet(`course/getCourses/${DEPARTMENT}`, config)
        .then(response => {
            if (response.data && !response.error) {
                setCourses(response.data);
            }
            }
        ) 
}, [])

    return (
        <Box sx={{ p: 2, m: 'auto', mt: 10 , border: '1px dashed grey' , minWidth: 500, maxWidth: 750, minHeight: 350, maxHeight: 500, display:'flex', flexDirection: 'column', justifyContent:'space-evenly'}}>
            <FormControl variant="filled" className = "inputField" sx={{width: '75%', margin: 'auto'}}>
                    <InputLabel id="course-label">Select course to view the applications</InputLabel>
                        <Select
                        labelId="course-label"
                        id="course"
                        value={selectedCourse}
                        onChange={courseChangeHandler}
                        >
                        {
                            courses.length && courses.map(course=>{
                                return <MenuItem key={course.courseName} value={course.courseName}>{course.courseName}</MenuItem>
                            })
                        }
                        </Select>
            </FormControl>
            <div className = 'searchWithStatus'>
            <FormControl variant="filled" sx={{minWidth: 250}}>
                    <InputLabel id="status-label">Application status</InputLabel>
                        <Select
                        labelId="status-label"
                        id="status"
                        value={application_status}
                        onChange={applicationStatusChangeHandler}
                        >
                        {
                            app_status_list.map(status=>{
                                return <MenuItem key={status} value={status}>{status}</MenuItem>
                            })
                        }
                        </Select>
            </FormControl>
{/* 
            <FormControl variant="filled" sx={{minWidth: 250}}>
                    <InputLabel id="status-label">Offer status</InputLabel>
                        <Select
                        labelId="status-label"
                        id="status"
                        value={applicant_offer_status}
                        onChange={applicantApplicationStatusChangeHandler}
                        >
                        {
                            APPLICANT_OFFER_STATUS.map(status=>{
                                return <MenuItem key={status} value={status}>{status}</MenuItem>
                            })
                        }
                        </Select>
            </FormControl> */}
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
    )
}

export default Applications;
