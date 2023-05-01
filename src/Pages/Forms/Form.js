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
    <div className='form' style={{paddingBottom: '25px', paddingTop: '25px'}}>
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
                marginRight: "20px",fontFamily:"aleph", fontSize: 16, color: "#212121"}} variant="outlined" sx={{borderColor: 'black'}}
                onClick={() => { 
                    if (page == FormTitles.length - 1) 
                    {alert("הטופס נשלח")} 
                    else {
                        setPage((currPage) => currPage + 1);}
                    }
                        } > {
                        page == FormTitles.length - 1 ? "שלח": "הבא"} 
                </Button> 
                <Button style= {{borderWidth:'1px', minWidth:"30px", backgroundColor: "#ffb74d", 
                marginLeft: "20px", fontFamily:"aleph", fontSize: 16, 
                color: "#212121"}} variant="outlined" sx={{borderColor: 'black'}} 
                disabled={page == 0} onClick={
                    () => {setPage((currPage) => currPage - 1);
                    }}> הקודם </Button>
            </div>
        </div>        
    </div>
    );
    }

export default Form
