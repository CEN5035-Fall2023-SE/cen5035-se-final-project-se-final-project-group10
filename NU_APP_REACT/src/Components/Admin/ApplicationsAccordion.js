import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import AxiosFetchPost from '../../Utils/AxiosFetch';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {getAdmin_Application_Status_dropdownValues, BASE_URL, getMember_Application_Status_dropdownValues} from '../../Utils/Constants';

const ApplicationsAccordion = ({searchResults, search}) => {
    const token = useSelector(state => state.login.token);
    const role = useSelector(state => state.profile.role);
    const [application_status, setApplication_Status] = useState('');
    const [appStatusChangeSuccessful, setAppStatusChangeSuccessful] = useState(false);

    // const fileDownload = (fileName) => {
    //     const config = {headers:{'Authorization':token}}
    //     axios.get(`${BASE_URL}admin/download/${fileName}`, config, {responseType: 'blob'})
    //         .then(response => {
    //             console.log(response)
    //                 console.log('file succesfully downlaoded.');
    //                 console.log(response.headers);
    //                 // const filename =  response.headers.get('Content-Disposition').split('filename=')[1];
    //                     // response.blob().then(blob => {
    //                     //     let url = window.URL.createObjectURL(response.data);
    //                     //     let a = document.createElement('a');
    //                     //     a.href = url;
    //                     //     a.download = fileName;
    //                     //     a.click();
    //                     // })
    //                     //=============
    //                     console.log(response.data);
    //                     // var bytes = new Uint8Array(response.data); // pass your byte response to this constructor
    //                     // console.log(bytes);
    //                     // for (let i = 0; i < bytes.length; i++) {
    //                     //     bytes[i] = response.data.charCodeAt(i);
    //                     // }
    //                     // console.log(bytes)
    //                     var blob=new Blob([response.data], {type: "application/docx"});// change resultByte to bytes

    //                     var link=document.createElement('a');
    //                     link.href=window.URL.createObjectURL(blob);
    //                     link.download="myFileName.docx";
    //                     link.click();
    //                     //============
    //                     // var sampleArr = base64ToArrayBuffer(response.data);
    //                     // saveByteArray("Sample Report", sampleArr);
    //         })
    // }


    const downloadFile = (id) => {
        fetch(`${BASE_URL}admin/download/${id}`,{
            method: 'GET',
            headers: {
                'Authorization':token 
            }
        })
          .then(response => {
            const filename =  response.headers.get('Content-Disposition').split('filename=')[1];
            response.blob().then(blob => {
              let url=  window.URL.createObjectURL(blob);
              let a = document.createElement('a');
              a.href = url;
              a.download = filename;
              a.click();
            });
        });
      }
    

    function base64ToArrayBuffer(base64) {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
           var ascii = binaryString.charCodeAt(i);
           bytes[i] = ascii;
        }
        return bytes;
     }

     function saveByteArray(reportName, byte) {
        var blob = new Blob([byte], {type: "application/pdf"});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        var fileName = reportName;
        link.download = fileName;
        link.click();
    };

    const app_statusChangeHandler = (event) => {
        setApplication_Status(event.target.value);
    }

    const submitHandler = (application) => {
        if (application_status !== '' && application.application_status !== application_status) {
            const requestBody = {...application}
            submitApplication(requestBody, application_status)
        }
    }

    const submitApplication = (requestBody, application_status) => {
        const header = {
            'Authorization' : token
        };
            AxiosFetchPost(`admin/changeApplicationStatus/${application_status}`, requestBody ,{headers: header})
             .then(response => {
                 if (response.data && !response.error) {
                    console.log(response.data);
                    setAppStatusChangeSuccessful(true);
                 } else {
                     setAppStatusChangeSuccessful(false);
                 }
             })
    }

    useEffect(() => {
        if (appStatusChangeSuccessful) {
            search();
            setAppStatusChangeSuccessful(false);
        }
    },[appStatusChangeSuccessful]);

    return (
        searchResults.map(application => {
            return (
        <div className='applicationsAccoridionContainer' key= {application.application_id}>
        <Accordion disabled={false} sx={{width: '100%', margin: 'auto'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{fontWeight: 700}}>{application.firstName + ' ' + application.lastName + ' - ' + `${application.application_status === 'Offer Sent' ? application.offer_accepted !== null ?application.offer_accepted:application.application_status : application.application_status}`}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{width: '85%', margin: 'auto'}}>
            <Box sx={{border: '1px dashed grey' , minHeight: 150, maxHeight: 350, paddingBottom: 1}}>
                <div className = 'accordionBody'>
                    <div className='accoridionBodyRow'>
                         <span><b className='fieldLabel'>FirstName</b>  {application.firstName}</span>
                         <span><b className='fieldLabel'>LastName</b>  {application.lastName}</span>
                    </div>
                    <div className='accoridionBodyRow'>
                         <span><b className='fieldLabel'>Course Applied For</b>  {application.applyFor}</span>
                         <span><b className='fieldLabel'>Previous Experience In</b>  {application.experienceInCourse?application.experienceInCourse:'Not Applicable'}</span>
                    </div>
                    <div className='accoridionBodyRow'>
                         <span>
                             <b className='fieldLabel'>Resume</b> 
                             {
                               // <IconButton onClick={() => fileDownload(application.cvFileName)}>
                                <IconButton>
                                     <FileDownloadIcon onClick={() => downloadFile(application.cvFileId)}/>
                                </IconButton>
                            }
                         </span>
                         {  role === 'COMMITTEE_MEMBER' &&
                             <FormControl variant="filled" className = "inputField">
                             <InputLabel id="course-label">Status</InputLabel>
                             <Select
                             labelId="course-label"
                             id="course"
                             value={application_status}
                             onChange={app_statusChangeHandler}
                             >
                             {
                                 (getMember_Application_Status_dropdownValues(application.application_status).map(status=>{
                                     return <MenuItem key={status} value={status}>{status}</MenuItem>
                                 }))
                             }
                             </Select>
                         </FormControl>
                         }
                         {  role === 'ADMIN' &&
                             <FormControl variant="filled" className = "inputField">
                             <InputLabel id="course-label">Status</InputLabel>
                             <Select
                             labelId="course-label"
                             id="course"
                             value={application_status}
                             onChange={app_statusChangeHandler}
                             >
                             {
                                 (getAdmin_Application_Status_dropdownValues(application.application_status).map(status=>{
                                     return <MenuItem key={status} value={status}>{status}</MenuItem>
                                 }))
                             }
                             </Select>
                         </FormControl>
                         }
                    </div>
                    <div className='accoridionBodyRow'>
                    {application.application_status !== 'Rejected' && <Button
                        sx={{width: '20%', margin: 'auto'}}
                        variant="contained"
                        onClick={() => {submitHandler(application)}}>
                        Submit
                    </Button>
                    }  
                    </div>
                </div>
            </Box>
            </AccordionDetails>
        </Accordion>
        </div>
            )
        })
    )
}

export default ApplicationsAccordion;