import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Shipping() {
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
          <Typography>
            משלוחים רק בצפון, החל ממחיר הזמנה של 120 ש"ח.
          </Typography>
          <Typography>
            ניתן לעשות הזמנות מראש ולקחת באיסוף עצמי.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}