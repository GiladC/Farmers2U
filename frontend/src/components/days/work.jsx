import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Work({days}) {
  return (
    <div>
      <Accordion sx={{
        position: 'relative',
        width: '100%',
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          dir='rtl'
        >
          <Typography>ימי ושעות עבודה</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            ראשון: {days.sunday}
          </Typography>
          <Typography>
          שני: {days.monday}
          </Typography>
          <Typography>
          שלישי: {days.tuesday}
          </Typography>
          <Typography>
          רביעי: {days.wednesday}
          </Typography>
          <Typography>
          חמישי: {days.thursday}
          </Typography>
          <Typography>שישי: {days.friday}</Typography>
          <Typography>
          שבת: {days.saturday}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}