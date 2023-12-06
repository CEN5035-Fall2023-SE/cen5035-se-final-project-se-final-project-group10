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
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

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
        <div className='applicationsAccoridionContainer' key= {applicant.applicant_id}>
        <Accordion disabled={false} sx={{width: '100%', margin: 'auto'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{fontWeight: 700}}>{'FullName - ' + applicant.firstName + ' ' + applicant.lastName + ' ' + 'Id - '+ applicant.applicant_id}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{width: '85%', margin: 'auto'}}>
            <Box sx={{border: '1px dashed grey' , padding: '5px' ,minHeight: 50, maxHeight: 200, paddingBottom: 1, overflow: 'hidden', overflowY: 'scroll'}}>
                <List>
                {
                    applicant.instructorFeedbackList.length >0 && applicant.instructorFeedbackList.map(feedback => {
                        return (<ListItem divider key={feedback.id}>
                                    <ListItemText primary={feedback.feedback +' - ' + feedback.instructorName}/>
                                </ListItem>)
                    })
                }
                {
                   applicant.instructorFeedbackList.length == 0 && <p>There is no Feedback for this applicant.</p> 
                }
                </List>
            </Box>
            </AccordionDetails>
        </Accordion>
        </div>
            )
        })
        
    )
}

export default FeedbackAccordion;