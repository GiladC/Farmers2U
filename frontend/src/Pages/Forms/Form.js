import React, { useState } from 'react';
import {
  Button,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import FormSignUpInfo from './FormSignUpInfo';
import FormPersonalInfo from './FormPersonalInfo';
import FormShippingOptions from './FormShippingOptions';
import FormProductsUpload from './FormProductsUpload';
import FormOpeningHours from './FormOpeningHours';
import FormOtherInfo from './FormOtherInfo';
import FormSubmitted from './FormSubmitted';

const steps = [
  'פרטים אישיים',
  'פרטי המשק',
  'משלוחים והזמנות',
  'מוצרי המשק',
  'שעות פתיחה וימי פעילות',
  'פרטים נוספים',
];

function Form() {
  const [page, setPage] = useState(0);
  const FormComponents = [
    FormSignUpInfo,
    FormPersonalInfo,
    FormShippingOptions,
    FormProductsUpload,
    FormOpeningHours,
    FormOtherInfo,
    FormSubmitted
  ];

  const handleNext = () => {
    if (page === FormComponents.length - 1) {
      alert('הטופס נשלח');
    } else {
      setPage((currPage) => currPage + 1);
    }
  };

  const handlePrevious = () => {
    setPage((currPage) => currPage - 1);
  };

  return (
    <div className='form' style={{ paddingBottom: '25px', paddingTop: '25px' }}>
      <div>
        <Stepper activeStep={page} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className='progressbar'>
        <div
          style={{
            marginTop: '-000px',
            width: `${((page + 1) / FormComponents.length) * 100}%`
          }}
        />
      </div>
      <div className='form-container'>
        <div className='header' style={{ textAlign: 'center' }}>
          {/* <h1>{FormTitles[page]}</h1> */}
        </div>
        <div className='body' style={{ display: 'flex', justifyContent: 'center' }}>
          {React.createElement(FormComponents[page])}
        </div>
        <div className='footer' style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            style={{
              minWidth: '80px',
              backgroundColor: '#ffb74d',
              display: page === FormComponents.length - 1 ? 'none' : 'block',
              marginRight: '20px',
              fontFamily: 'aleph',
              fontSize: 16,
              color: '#212121'
            }}
            variant='outlined'
            sx={{ borderColor: 'black' }}
            onClick={handleNext}
          >
            {page === FormComponents.length - 1 ? 'שלח' : 'הבא'}
          </Button>
          <Button
            style={{
              borderWidth: '1px',
              minWidth: '30px',
              backgroundColor: '#ffb74d',
              marginLeft: '20px',
              fontFamily: 'aleph',
              fontSize: 16,
              display: page === 0 ? 'none' : 'block',
              color: '#212121'
            }}
            variant='outlined'
            sx={{ borderColor: 'black' }}
            onClick={handlePrevious}
          >
            הקודם
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Form;