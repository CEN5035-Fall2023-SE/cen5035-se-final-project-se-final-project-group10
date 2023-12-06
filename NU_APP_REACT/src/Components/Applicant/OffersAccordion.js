import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {AxiosFetchPut} from '../../Utils/AxiosFetch';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import {APPLICATION_ACCEPTED_STATUS_ACCEPTED, APPLICATION_STATUS_REJECTED, APPLICATION_ACCEPTED_STATUS_DECLINED, APPLICATION_STATUS_OFFERSENT} from '../../Utils/Constants';

const OffersAccordion = ({allOffers, acceptOffer, declineOffer}) => {
    const token = useSelector(state => state.login.token);

    const showStatusInAccoridionHeader = (app_status) => {
        if (app_status === APPLICATION_STATUS_REJECTED) {
            return true;
        } else {
            return false;
        }
    }

    return (
        allOffers.map(offer => {
            return (<Accordion key = {offer.application_id} disabled={offer.application_status===APPLICATION_STATUS_OFFERSENT?false:true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{fontWeight: 700}}>{`${offer.applyFor} ${showStatusInAccoridionHeader(offer.application_status)? '- '+ offer.application_status:''}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Box sx={{ p: 2, m: 'auto', mt: 1 , border: '1px dashed grey' , minWidth: 500, maxWidth: 750, minHeight: 150, maxHeight: 350, display:'flex', flexDirection: 'column', justifyContent:'space-evenly'}}>
            {
                !offer.offer_accepted && 
                <>
                <Typography>{`Congratulations! You have been selected as a Teaching Assistant for ${offer.applyFor}. Please accept or decline your offfer.`}</Typography>
                <div>
                <Button
                    component="label"
                    variant="contained"
                    sx={{mr: 2}}
                    onClick={() => acceptOffer(offer.application_id)}
                >
                    Accept
                </Button>
                <Button
                    component="label"
                    variant="outlined"
                    onClick={() => declineOffer(offer.application_id)}
                >
                    Decline
                </Button>
                </div>
                </>
            }
            {
                offer.offer_accepted === APPLICATION_ACCEPTED_STATUS_ACCEPTED && 
                <Typography>{`Congratulations! You have already accepted the offer.`}</Typography>
                
            }
            {
                offer.offer_accepted === APPLICATION_ACCEPTED_STATUS_DECLINED && 
                <Typography>{`You have already declined the offer. You can submit another application.`}</Typography>
                
            }
            </Box>
            </AccordionDetails>
          </Accordion>)
        })
    )
}

export default OffersAccordion;