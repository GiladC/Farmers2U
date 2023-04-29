import React, {useState} from 'react'
import FormSignUpInfo from './FormSignUpInfo';
import FormPersonalInfo from './FormPersonalInfo';
import FormOtherInfo from './FormOtherInfo';
import FormShippingOptions from './FormShippingOptions';
import FormProductsUpload from './FormProductsUpload';
import FormLogin from './FormLogin';
import { Button } from '@mui/material';


function Form() {
    const[page, setPage] = useState(0);
    /* const FormTitles = ["Sign Up", "Personal Info", "Other", "FormProducts","FormShippingDetails"]; */
    const FormTitles = ["Farmers2U", "Farmers2U", "Farmers2U", "Farmers2U","Farmers2U"]; 

    const PageDisplay = () => {
        if (page === 0) {
            return <FormSignUpInfo/>
        }
        else if (page === 1) {
            return <FormPersonalInfo/>
        }
        else if (page === 2){
            return <FormShippingOptions/>
        }
        else if (page === 3){
            return <FormProductsUpload/>
        }
        else if (page === 4){
            return <FormOtherInfo/>
        }
    }

    return (
    <div className='form'>
        <div className='progressbar'>
            <div style= {{marginTop: "-000px", width: page === 0 ? "20%" : page == 1 ? "40%" : page == 2 ? "60%": page == 3 ? "80%" : "100%"}}  > </div> 
        </div>
        <div className='form-container'>
            <div className='header'> 
                <h1>
                    {FormTitles[page]}
                </h1>
            </div>
            <div className='body' > 
                {PageDisplay()}   
            </div>
            <div className='footer'>    
                <Button style= {{backgroundColor: "#2F4F4F", marginRight: "20px", fontSize: 16, color: "#F0F8FF"}} onClick={() => { if (page == FormTitles.length - 1) {alert("הטופס נשלח")} else {setPage((currPage) => currPage + 1);}}} > {page == FormTitles.length - 1 ? "שלח": "הבא"} </Button> 
                <Button style= {{backgroundColor: "#2F4F4F", marginLeft: "20px", fontSize: 16, color: "#F0F8FF"}} variant="contained" disabled={page == 0} onClick={() => {setPage((currPage) => currPage - 1);}}> הקודם </Button>
            </div>
        </div> import React, {useState} from 'react'
import FormSignUpInfo from './FormSignUpInfo';
import FormPersonalInfo from './FormPersonalInfo';
import FormOtherInfo from './FormOtherInfo';
import FormShippingOptions from './FormShippingOptions';
import FormProductsUpload from './FormProductsUpload';
import FormLogin from './FormLogin';
import { Button } from '@mui/material';


function Form() {
    const[page, setPage] = useState(0);
    /* const FormTitles = ["Sign Up", "Personal Info", "Other", "FormProducts","FormShippingDetails"]; */
    const FormTitles = ["Farmers2U", "Farmers2U", "Farmers2U", "Farmers2U","Farmers2U"]; 

    const PageDisplay = () => {
        if (page === 0) {
            return <FormSignUpInfo/>
        }
        else if (page === 1) {
            return <FormPersonalInfo/>
        }
        else if (page === 2){
            return <FormShippingOptions/>
        }
        else if (page === 3){
            return <FormProductsUpload/>
        }
        else if (page === 4){
            return <FormOtherInfo/>
        }
    }

    return (
    <div className='form' style={{paddingBottom: '25px', paddingTop: '25px'}}>
        <div className='progressbar'>
            <div style= {{marginTop: "-000px",
             width: page === 0 ? "20%" : page == 1 ? "40%" : page == 2 ? "60%": page == 3 ? "80%" : "100%"}}  > </div> 
        </div>
        <div className='form-container'>
            <div className='header' style={{ textAlign: 'center' }}> 
                <h1>
                    {FormTitles[page]}
                </h1>
            </div>
            <div className='body' style={{ display: "flex", justifyContent: "center" }}> 
                {PageDisplay()}   
            </div>
            <div className='footer' style={{ display: "flex", justifyContent: "center" }}> {/* added */}
                <Button style= {{backgroundColor: "#2F4F4F", 
                marginRight: "20px", fontSize: 16, color: "#F0F8FF"}} 
                onClick={() => { 
                    if (page == FormTitles.length - 1) 
                    {alert("הטופס נשלח")} 
                    else {
                        setPage((currPage) => currPage + 1);}
                    }
                        } > {
                        page == FormTitles.length - 1 ? "שלח": "הבא"} 
                </Button> 
                <Button style= {{backgroundColor: "#2F4F4F", 
                marginLeft: "20px", fontSize: 16, 
                color: "#F0F8FF"}} variant="contained" 
                disabled={page == 0} onClick={
                    () => {setPage((currPage) => currPage - 1);
                    }}> הקודם </Button>
            </div>
        </div>        
    </div>
    );
    }

export default Form
       
    </div>
    );
    }

export default Form
