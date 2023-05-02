import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Price() {
  return (
    <div>
      <Accordion sx={{
        position: 'relative',
        top: 20,
        width: '30%',
        mb: '5'
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          dir='rtl'
        >
          <Typography>מחירון</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            מלפפון: 5.9 ש"ח לק"ג
          </Typography>
          <Typography>
            עגבניה: 5 ש"ח לק"ג
          </Typography>
          <Typography>
            בצל: 6.4 ש"ח לק"ג
          </Typography>
          <Typography>
            גזר: 6 ש"ח לק"ג
          </Typography>
          <Typography>
            חציל: 7 ש"ח לק"ג
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}