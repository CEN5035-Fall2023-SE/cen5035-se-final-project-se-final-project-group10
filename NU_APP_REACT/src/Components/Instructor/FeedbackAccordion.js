import react,{useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import AxiosFetchPost from '../../Utils/AxiosFetch';
import {FEEDBACK_SUCCESS, API_ERROR} from '../../Utils/Constants';
import Chip from '@mui/material/Chip';

const FeedbackAccordion = ({searchResults}) => {
    const token = useSelector(state => state.login.token);
    const instructorUsername = useSelector(state => state.profile.username);
    const [feedback, setFeedback] = useState('');
    const [submitFeedbackError, setSubmitFeedbackError] = useState('');
    const feedbackChangeHandler = (event) => {
        setFeedback(event.target.value);
    }

    const submitFeedback = (applicant) => {
        if (feedback !== '') {
            const filteredFeedback = filterText(feedback);
            setFeedback(filteredFeedback);
             if (filteredFeedback != '') {
                const header = {
                    'Authorization' : token
                };
                const requestBody = {
                    applicant_id : applicant.id,
                    feedback: filteredFeedback,
                    instructorName: instructorUsername
                }
                    AxiosFetchPost(`instructor/submitFeedback/`, requestBody ,{headers: header})
                     .then(response => {
                         if (response.data && !response.error) {
                            setSubmitFeedbackError(false);
                            setFeedback('');
                         } else {
                             setSubmitFeedbackError(true);
                         }
                     })
             }
        }
    }

    const filterText = (text) => {
       let filteredText =  text.replaceAll('<', '');
       filteredText = filteredText.replaceAll('>', '');
       filteredText = filteredText.replaceAll('&', '');
       return filteredText;
    }
    return (
        searchResults.map(applicant => {
            return (
        <div className='applicationsAccoridionContainer' key= {applicant.id}>
        <Accordion disabled={false} sx={{width: '100%', margin: 'auto'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{fontWeight: 700}}>{'FullName - ' + applicant.firstName + ' ' + applicant.lastName + ' ' + 'Id - '+ applicant.id}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{width: '85%', margin: 'auto'}}>
            <Box sx={{border: '1px dashed grey' , padding: '25px' ,minHeight: 150, maxHeight: 200, paddingBottom: 1}}>
                <div className = 'feedbackaccordionBody'>
                <TextareaAutosize 
                    sx={{width: '100px', margin: '25px'}} minRows = '6' maxRows = '6' 
                    onChange = {(e)=>feedbackChangeHandler(e)}
                    value={feedback}
                    />
                    {submitFeedbackError === true && <Chip color="error" size="small" sx={{ width: '75%', margin:'auto', mt:1, mb: 1}} label={API_ERROR}/>}
                    {submitFeedbackError === false && <Chip color="success" size="small" sx={{ width: '75%', margin:'auto', mt:1, mb: 1}} label={FEEDBACK_SUCCESS}/>}
                    <Button
                        sx={{width: '20%', margin: 'auto'}}
                        variant="contained"
                        disabled ={feedback === ''}
                        onClick={() => submitFeedback(applicant)}>
                        Submit
                    </Button>
                </div>
            </Box>
            </AccordionDetails>
        </Accordion>
        </div>
            )
        })
        
    )
}

export default FeedbackAccordion;