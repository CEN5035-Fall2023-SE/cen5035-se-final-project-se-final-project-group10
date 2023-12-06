import react, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import AxiosFetchPost, {AxiosFetchGet} from '../../Utils/AxiosFetch';
import {DEPARTMENT, FORM_FIELDS_ERROR, OPEN_POSITIONS_ERROR} from '../../Utils/Constants';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

const OpenTAPositions = () => {
    const token = useSelector(state => state.login.token);
    const [courses, setCourses] = useState({});
    const [selectedCourse, setSelectedCourse] = useState('');
    const [numberOfOpenPositions, setNumberOfOpenPositions] = useState('');
    const [apiCallSuccess, setApiCallSuccess] = useState('');
    const [error, setError] = useState('');

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

    const courseChangeHandler = (event) => {
        setSelectedCourse(event.target.value);
    }

    const numberOfPositionsChangeHandler = (event) => {
        setNumberOfOpenPositions(event.target.value);
    }

    const submitNumberOfPositions = () => {
        const header = {
            'Authorization' : token
        };

        const body = {
            course: selectedCourse,
            positions:  numberOfOpenPositions
        };
        if (validateFields()) {
            AxiosFetchPost('admin/openTAPositions/open', body, {headers: header})
            .then(response => {
                if (response.data && !response.error) {
                    resetFields();
                    setApiCallSuccess(true);
                    console.log(response);
                } else {
                    setApiCallSuccess(false);
                }
            });
        }
        }
        

    const validateFields = () => {
        if (selectedCourse && numberOfOpenPositions) {
            setError(false);
            return true;
        }
        setError(true);
        setApiCallSuccess(false);
        return false;
    }

    const resetFields = () => {
        setSelectedCourse('');
        setNumberOfOpenPositions('');
    }

    return(
        <div className = 'AdminCourses'>
        <Box sx={{ p: 2, m: 'auto', mt: 10 , border: '1px dashed grey' , minWidth: 500, maxWidth: 750, minHeight: 350, maxHeight: 500, display:'flex', flexDirection: 'column', justifyContent:'space-evenly'}}>
            <FormControl variant="filled" className = "inputField" sx={{minWidth: 500}}>
                    <InputLabel id="course-label">Course you want to open positions for</InputLabel>
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

            <TextField sx={{width: '100%'}}
                    className = "inputField"
                    id="numOfOpenPositions"
                    label="Number of Positions"
                    value={numberOfOpenPositions}
                    onChange = {(e)=> numberOfPositionsChangeHandler(e)}
                    variant="filled" 
            />
            {
                error===true && <Chip color="error" size="small" sx={{ width: '100%'}} label={FORM_FIELDS_ERROR}/>
            }
            {
                apiCallSuccess===true && <Chip color="success" size="small" sx={{ width: '100%'}} label={'Course is now open for applications.'}/>
            }
            {
                apiCallSuccess===false && <Chip color="error" size="small" sx={{ width: '100%'}} label={OPEN_POSITIONS_ERROR}/>
            }
            <Button sx={{width: 'fit-content', ml: 'auto', mr: 'auto'}}
                    variant="contained"
                    onClick={submitNumberOfPositions}>
                    Submit
            </Button>           
        </Box>
        </div>
    )
}

export default OpenTAPositions;