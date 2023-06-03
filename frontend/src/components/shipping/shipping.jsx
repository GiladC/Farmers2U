import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Shipping({policy}) {
  return (
    <div>
      <Accordion sx={{
        position: 'relative',
        top: 20,
        width: '50%',
        mb: '5'
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          dir='rtl'
        >
          <Typography>מדיניות משלוחים:</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{policy}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}