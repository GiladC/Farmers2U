import React, { useState } from 'react';
import FormSignUpInfo from './FormSignUpInfo';
import FormPersonalInfo from './FormPersonalInfo';
import FormOtherInfo from './FormOtherInfo';
import FormShippingOptions from './FormShippingOptions';
import FormProductsUpload from './FormProductsUpload';
import FormLogin from './FormLogin';
import FormOpeningHours from './FormOpeningHours'
import FormSubmitted from './FormSubmitted'
import { Button,Stepper,Step,StepLabel,Typography } from '@mui/material';
import {ValidateFacebook, ValidateInstagram, ValidatePhone, ValidateWebsite, ValidateWhatsapp} from '../../components/validations'


const steps = [
    'פרטים אישיים',
    'פרטי המשק',
    'משלוחים והזמנות',
    'מוצרי המשק',
    'שעות פתיחה וימי פעילות',
    'פרטים נוספים',
  ];

  const Form = (props) => {
    const [multiFormValues, setMultiFormValues] = useState({
        farm_name: "",
        email: "",
        google_profile_picture: "",
        google_name: "",
        google_family_name: "",
        shipping_distance: "",
        is_shipping: "",
        opening_hours: "",
        closing_hours: "",
        logo_picture: "",
        products_pictures: "",
        types_of_products: "",
        farm_pictures: "",
        phone_number_official: "",
        phone_number_whatsapp: "",
        phone_number_telegram: "",
        about: "",
        address: "",
        farmer_name: "",
        delivery_details: "",
        products: "",
        farm_site: "",
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
    const setFormValue = (input, value) => {
        setMultiFormValues((prevValues) => ({
          ...prevValues,
          [input]: value,
        }));
      };
    const [isFormPersonalInfoValid, setIsFormPersonalInfoValid] = useState(true);
    const [isFormOtherInfoValid, setIsFormOtherInfoValid] = useState(true);

    const[page, setPage] = useState(0);
    /* const FormTitles = ["Sign Up", "Personal Info", "Other", "FormProducts","FormShippingDetails"]; */
    const FormTitles = ["Farmers2U", "Farmers2U", "Farmers2U", "Farmers2U","Farmers2U","Farmers2U", "Farmers2U"]; 

    const PageDisplay = () => {
        if (page === 0) {
            return <FormSignUpInfo values={multiFormValues} handleChange={handleChange} setFormValue={setFormValue}/>
        }
        else if (page === 1) {
            return <FormPersonalInfo setIsFormPersonalInfoValid={setIsFormPersonalInfoValid} 
             values={multiFormValues} handleChange={handleChange} setFormValue={setFormValue}/>
        }
        else if (page === 2){
            return <FormShippingOptions values={multiFormValues} handleChange={handleChange} setFormValue={setFormValue}/>
        }
        else if (page === 3){
            return <FormProductsUpload values={multiFormValues} handleChange={handleChange} setFormValue={setFormValue}/>
        }
        else if (page == 4){
            return <FormOpeningHours values={multiFormValues} handleChange={handleChange} setFormValue={setFormValue}/>
        }
        else if (page === 5){
            return <FormOtherInfo  setIsFormPersonalInfoValid={setIsFormPersonalInfoValid} setIsFormOtherInfoValid={setIsFormOtherInfoValid} values={multiFormValues} handleChange={handleChange} setFormValue={setFormValue} props={props}/>
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
                <Button style= {{
                 maxHeight: page == 0 || page == 1 ||page == 2 ||page == 3 ||page == 4 ? "100px":'0px',
                  minWidth:"80px", backgroundColor:  page == 0 || page == 1 ||page == 2 ||page == 3 ||page == 4 ? '#ffb74d' : "#f7f1e5" , 
                marginRight: "20px",fontFamily:"aleph", fontSize: 16, display: page == FormTitles.length - 1 ? 'none' : 'block',
                 color:  page == 0 || page == 1 ||page == 2 ||page == 3 ||page == 4 ? '#212121' : "#f7f1e5" }}
                disabled={ page == 6 || page == 5} variant="outlined"
                 sx={{borderColor:page == 0 || page == 1 ||page == 2 ||page == 3 ||page == 4 ? 'black': '"#f7f1e5"'}}
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
