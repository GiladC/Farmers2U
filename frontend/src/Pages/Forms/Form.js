import React, { useState } from 'react';
import FormSignUpInfo from './FormSignUpInfo';
import FormPersonalInfo from './FormPersonalInfo';
import FormOtherInfo from './FormOtherInfo';
import FormShippingOptions from './FormShippingOptions';
import FormProductsUpload from './FormProductsUpload';
import FormLogin from './FormLogin';
import FormOpeningHours from './FormOpeningHours'
import FormSubmitted from './FormSubmitted'
import { Button,Stepper,Step,StepLabel ,StepConnector, theme, styled,Typography } from '@mui/material';

const steps = [
    'פרטים אישיים',
    'פרטי המשק',
    'משלוחים והזמנות',
    'מוצרי המשק',
    'שעות פתיחה וימי פעילות',
    'פרטים נוספים',
  ];



function Form() {
    const [multiFormValues, setMultiFormValues] = useState({
        farmname: "",
        email: "",
        password: "",
        phoneNumber1: "0",
        phoneNumber2: "0",
        about: "",
        address: "",
        city: "",
        farmerName: "",
        prices: "",
        products: "",
        facebook: "",
        instagram: "",


      })
      function Lines() {
        return (
            <div style={{ position: 'relative', top: '13px', marginRight: '10%', display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                {Array(5).fill().map((_, index) => (
                    <div key={index} style={{flexGrow: 1, height: '1px', backgroundColor: 'lightgray',marginLeft: '0.5%', marginRight: index!==0 ? '5.2%':'0.5%'}} />
                ))}
            </div>
        );
    }
    
    //Handle form value state on change
    const handleChange = (input) => (e) => {
    setMultiFormValues({...multiFormValues, [input]: e.target.value})
    }
    const[page, setPage] = useState(0);
    /* const FormTitles = ["Sign Up", "Personal Info", "Other", "FormProducts","FormShippingDetails"]; */
    const FormTitles = ["Farmers2U", "Farmers2U", "Farmers2U", "Farmers2U","Farmers2U","Farmers2U", "Farmers2U"]; 

    const PageDisplay = () => {
        if (page === 0) {
            return <FormSignUpInfo values={multiFormValues} handleChange={handleChange}/>
        }
        else if (page === 1) {
            return <FormPersonalInfo values={multiFormValues} handleChange={handleChange}/>
        }
        else if (page === 2){
            return <FormShippingOptions values={multiFormValues} handleChange={handleChange}/>
        }
        else if (page === 3){
            return <FormProductsUpload values={multiFormValues} handleChange={handleChange}/>
        }
        else if (page == 4){
            return <FormOpeningHours values={multiFormValues} handleChange={handleChange}/>
        }
        else if (page === 5){
            return <FormOtherInfo values={multiFormValues} handleChange={handleChange}/>
        }
        else if (page == 6){
            return <FormSubmitted />
        }
    }

    return (
    <div className='form' style={{paddingBottom: '25px', paddingTop: '25px'}}>
              <div style={{ direction: "rtl" }}>
                <Lines></Lines>
              <Stepper alternativeLabel activeStep={page} connector={null} sx={{ '& .MuiStepIcon-root.MuiStepIcon-active': { color: 'secondary' } }}>
                          {steps.map((label) => (
            <Step key={label} >
              <StepLabel>
              <Typography style={{ fontFamily: 'aleph', fontSize: '13px' }}>
                    {label}
                </Typography></StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
        <div className='progressbar'>
            <div style= {{marginTop: "-000px",
             width: page === 0 ? "0%" : page == 1 ? "40%" : page == 2 ? "60%": page == 3 ? "80%" : "100%"}}  > </div> 
        </div>
        <div className='form-container'>
            <div className='header' style={{ textAlign: 'center' }}> 
{/*                 <h1>
                    {FormTitles[page]}
                </h1> */}
            </div>
            <div className='body' style={{ display: "flex", justifyContent: "center" }}> 
                {PageDisplay()}   
            </div>
            <div className='footer' style={{ display: "flex", justifyContent: "center" }}> {/* added */}
                <Button style= {{minWidth:"80px", backgroundColor: "#ffb74d", 
                marginRight: "20px",fontFamily:"aleph", fontSize: 16, display: page == FormTitles.length - 1 || page == 6 ? 'none' : 'block', color: "#212121"}} disabled={page == 6 || page == 5} variant="outlined" sx={{borderColor: 'black'}}
                onClick={() => { 
                    if (page == FormTitles.length) 
                    {alert("הטופס נשלח")} 
                    else {
                        setPage((currPage) => currPage + 1);}
                    }
                        } > {
                        page == FormTitles.length - 2 ? "שלח": "הבא"} 
                </Button> 
                <Button style= {{borderWidth:'1px', minWidth:"30px", backgroundColor: "#ffb74d", 
                marginLeft: "20px", fontFamily:"aleph", fontSize: 16, display: page === 0 || page == FormTitles.length - 1 ? 'none' : 'block',
                color: "#212121"}} variant="outlined" sx={{borderColor: 'black'}} 
                disabled={page == 0 || page == 6} onClick={
                    () => {setPage((currPage) => currPage - 1);
                    }}> הקודם </Button>
            </div>
        </div>        
    </div>
    );
    }

export default Form