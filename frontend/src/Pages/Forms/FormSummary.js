import React, { useState, useEffect } from 'react';
import {
    TextField,
    Grid,
    Button,
    Box,
    ThemeProvider,
    createTheme,
    Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Work from '../../components/days/work.jsx';
import dayjs from 'dayjs'



const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const themeForButton = createTheme({
    palette: {
        nice: createColor('#37474f'),
        button: createColor('#E8AA42')
    }
});

const FormSummary = ({ values , props, isFormValid }) => {

    const navigate = useNavigate();
    let shipping
    let km
    let concatenatedNamesProducts = "" 
    let concatenatedNamesFarm = ""
    let logoName = "" 
    if (values.is_shipping){
        shipping = "כן"
        km = values.shipping_distance
    }
    else{
        shipping = "לא"
        km = ""
    }
    if (values.logo_picture){
        logoName = values.logo_picture[0].name
    }
    if (values.products_pictures){
        let fileNamesProducts = Array.from(values.products_pictures).map(file => file.name);
        concatenatedNamesProducts = fileNamesProducts.join(', ');
    }
    if (values.farm_pictures){
        let fileNamesFarm = Array.from(values.farm_pictures).map(file => file.name);
        concatenatedNamesFarm = fileNamesFarm.join(', ');
    }
    function addZero(val) {
        const ret = val < 10 ? "0" + val : val;
        return ret;
    }

    function hoursFormat(start, end) {
        if (start === "none" || end === "none") {
            return "סגור";
        }
        else {
            return addZero(dayjs(end).hour()) + ":" + addZero(dayjs(end).minute()) + " - " + addZero(dayjs(start).hour()) + ":" + addZero(dayjs(start).minute())
        }
    }
    //let openingHours2 = "none,none,none,none,none,none,none"
    //let closingHours2 = "none,none,none,none,none,none,none"
    /*if (values.opening_hours != "") {
        const opening_hours = values.opening_hours.map(p => {
            return p && p !== "none" ? p.format() : "none";
        });
    }
    if (values.closing_hours != "") {
        const closing_hours = values.closing_hours.map(p => {
            return p && p !== "none" ? p.format() : "none";
        });
    }*/
    let opening_hours2 = ["none","none","none","none","none","none","none"]
    let closing_hours2 = ["none","none","none","none","none","none","none"]
    if (values.opening_hours != "") {
        opening_hours2 = values.opening_hours.map(p => {
            return p && p !== "none" ? p.format() : "none";
        });
        //opening_hours2 = opening_hours2.join(",");
        //alert(opening_hours2)
    }
    if (values.closing_hours != "") {
        closing_hours2 = values.closing_hours.map(p => {
            return p && p !== "none" ? p.format() : "none";
        });
        //closing_hours2 = closing_hours2.join(",");
        //alert(closing_hours2)
    }
    const sunday = hoursFormat(opening_hours2[0], closing_hours2[0])
    const monday = hoursFormat(opening_hours2[1], closing_hours2[1])
    const tuesday = hoursFormat(opening_hours2[2], closing_hours2[2])
    const wednesday = hoursFormat(opening_hours2[3], closing_hours2[3])
    const thursday = hoursFormat(opening_hours2[4], closing_hours2[4])
    const friday = hoursFormat(opening_hours2[5], closing_hours2[5])
    const saturday = hoursFormat(opening_hours2[6], closing_hours2[6])

    const days = {
        sunday: sunday,
        monday: monday,
        tuesday: tuesday,
        wednesday: wednesday,
        thursday: thursday,
        friday: friday,
        saturday: saturday
    }
    const { farm_name, /*email,*/ google_profile_picture, google_name, google_family_name,
        shipping_distance, is_shipping, opening_hours, closing_hours, logo_picture, products_pictures, types_of_products,
        farm_pictures, phone_number_official, phone_number_whatsapp, phone_number_telegram, about, address,
        farmer_name, delivery_details, products, farm_site, facebook, instagram
    } = values
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {   
        window.scrollTo(0, 0); // Scroll to the top of the page
        if (showSuccessMessage) {
          const timer = setTimeout(() => {
            setShowSuccessMessage(false);
            navigate('/bullboard');
          }, 5000);
    
          return () => clearTimeout(timer);
        }
      }, [showSuccessMessage, navigate]);



    const submitHandler = (e) => {
        e.preventDefault();
        let openingHours = "none,none,none,none,none,none,none"
        let closingHours = "none,none,none,none,none,none,none"
        if (values.opening_hours != "") {
            const opening_hours = values.opening_hours.map(p => {
                return p && p !== "none" ? p.format() : "none";
            });
            openingHours = opening_hours.join(",");
        }
        if (values.closing_hours != "") {
            const closing_hours = values.closing_hours.map(p => {
                return p && p !== "none" ? p.format() : "none";
            });
            closingHours = closing_hours.join(",");
        }
        const data = new FormData();
        if (values.is_shipping == false) {
            values.shipping_distance = 0
        }

        data.append("jsonData", JSON.stringify({
            //email: "golan@gmail.com",
            email: values.email,
            google_name: values.google_name,
            google_family_name: values.google_family_name,
            google_profile_picture: values.google_profile_picture,
            shipping_distance: values.shipping_distance,
            is_shipping: values.is_shipping,
            opening_hours: openingHours,
            closing_hours: closingHours,
            farm_name: values.farm_name,
            about: values.about,
            phone_number_official: values.phone_number_official,
            phone_number_whatsapp: values.phone_number_whatsapp,
            phone_number_telegram: "0",
            address: values.address,
            types_of_products: values.types_of_products,
            farmer_name: values.farmer_name,
            delivery_details: values.delivery_details,
            products: values.products,
            farm_site: values.farm_site,
            facebook: values.facebook,
            instagram: values.instagram

        }))
        if (values.logo_picture) {
            for (let i = 0; i < values.logo_picture.length; i++) {
                data.append("files[]", values.logo_picture[i]);
                data.append("labels[]", "1");
            }
        }
        if (values.products_pictures) {
            for (let i = 0; i < values.products_pictures.length; i++) {
                data.append("files[]", values.products_pictures[i]);
                data.append("labels[]", "2");
            }
        }
        if (values.farm_pictures) {
            for (let i = 0; i < values.farm_pictures.length; i++) {
                data.append("files[]", values.farm_pictures[i]);
                data.append("labels[]", "3");
            }
        }
        //console.log(image)
        //console.log(productsImages)
        //console.log(farmImages)


        axios.post("http://127.0.0.1:5000/signup", data)
            .then(function (response) {
                localStorage.setItem('profilePicture', response.data.logo_picture);
                //handle success
                //setShowSuccessMessage(true);
                axios({
                    method: 'POST',
                    url: 'http://127.0.0.1:5000/logintoken',
                    data: {
                        email: values.email
                    }
                })
                    .then(function (response) {
                        props.setToken(response.data.access_token);
                        localStorage.setItem('email', values.email);
                        localStorage.setItem('farmName', values.farm_name)
                        setShowSuccessMessage(true);

                        //alert('נרשמת בהצלחה. מיד תועבר לאתר.');
                        
                        //navigate('/bullboard');
                    })
                    .catch(function (error) {
                        if (error.response && error.response.status === 409) {
                            alert('הפרטים שהוזנו שגויים');
                        }
                    });

                //alert('המשתמש נוסף בהצלחה.');  
                //window.location.href = '/';

            })
            .catch(function (error) {
                //handle error
                if (error.response && error.response.status === 409) {
                    alert("שגיאה");
                    alert("המייל שאיתו ביקשתם להירשם כבר רשום במערכת.");
                }
                if (error.response && error.response.status === 405) {
                    alert("שגיאה");
                    alert("יש להירשם עם כתובת גוגל תקינה בעמוד הראשון.");
                }

            });
    };

    return (

        <form autoComplete="off" >
            {!showSuccessMessage && (
            <Box marginTop={5} bgcolor="#f7f1e5" boxShadow={0} borderRadius={2} border={2} display="flex" flexDirection={"column"} width={580} height={164.7} alignItems={"center"} justifyContent={"center"} mt={3.2} mr={2.3} padding={20} sx={{ border: '1.5px solid #f7f1e5' }}  >
                <Typography marginTop= "550px" color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} marginBottom={"0px"} variant='h3' textAlign={"center"}> הרשמת חקלאי </Typography>
                <Typography color="#37474f" fontFamily="aleph" minHeight={45} fontWeight={'bold'} fontSize={22} margin={5} variant='h2' textAlign={"center"}> סיכום הרשמה</Typography>

                <>
                    <Grid container direction="column" spacing={2} dir="rtl">
                        <Grid item>
                            <Box>
                                <Typography variant="body1" color="textPrimary" fontSize={20}>
                                    שם העסק: {values.farm_name || "לא הוגדר"}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box>
                                <Typography variant="body1" color="textPrimary">
                                    שם איש הקשר: {values.farmer_name || "לא הוגדר"}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box>
                                <Typography variant="body1" color="textPrimary">
                                    כתובת: {values.address || "לא הוגדר"}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box>
                                <Typography variant="body1" color="textPrimary">
                                    מספר טלפון של העסק: {values.phone_number_official || "לא הוגדר"}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box>
                                <Typography variant="body1" color="textPrimary">
                                    מספר וואטסאפ: {values.phone_number_whatsapp || "לא הוגדר"}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box>
                                <Typography variant="body1" color="textPrimary">
                                    העסק עושה משלוחים? {shipping}
                                </Typography>
                            </Box>
                        </Grid>
                        {shipping == "כן" && (
                        <Grid item>
                            <Box>
                                <Typography variant="body1" color="textPrimary">
                                    טווח המשלוח: {km}
                                </Typography>
                            </Box>
                        </Grid>
                        )}

                        <Grid item>
                            <Box>
                                <Typography variant="body1" color="textPrimary">
                                    מדיניות הזמנות משלוחים: {values.delivery_details || "לא הוגדר"}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item>
                            <Typography variant="body1" color="textPrimary">
                                סוגי מוצרים: {values.types_of_products || "לא הוגדר"}
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Typography variant="body1" color="textPrimary">
                                מחירון: {values.products || "לא הוגדר"}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" color="textPrimary">
                                אתר העסק: {values.farm_site || "לא הוגדר"}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" color="textPrimary">
                                פייסבוק: {values.facebook || "לא הוגדר"}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" color="textPrimary">
                                אינסטגרם: {values.instagram || "לא הוגדר"}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" color="textPrimary">
                                ספרו על עצמכם: {values.about || "לא הוגדר"}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" color="textPrimary">
                                לוגו: {logoName || "לא נבחר"}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" color="textPrimary">
                                תמונות המוצרים: {concatenatedNamesProducts || "לא נבחרו"}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" color="textPrimary">
                                תמונות החווה: {concatenatedNamesFarm || "לא נבחרו"}
                            </Typography>
                        </Grid>
                        <div >
                            <Work days={days} />
                        </div>
                    </Grid>

                    <Button style={{
                        borderWidth: '1px', minWidth: "30px", backgroundColor: "#fff24d", position: "sticky",
                        marginTop: '0px',
                        marginRight: "400px", fontFamily: "aleph", fontSize: 16,
                        color: "#212121"
                    }} variant="outlined" sx={{ borderColor: 'black' }} onClick={submitHandler} > אישור ושליחה 
                    </Button>
                </>

            </Box>)}


            {showSuccessMessage && (
                <div>
                    <Box height="100vh" marginTop={5} bgcolor="#e1f5fe" boxShadow={2} borderRadius={2} border={2} display="flex" flexDirection={"column"} width={580} alignItems={"center"} justifyContent={"center"} margin={3} mt={4} padding={20} sx={{ border: '1.5px solid #bf360c' }}  >
                        <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} marginBottom={"0px"} variant='h3' textAlign={"center"}> שלום {values.farmer_name} ! </Typography>
                        <Typography color="#37474f" fontFamily="aleph" fontWeight={'bold'} fontSize={50} marginBottom={"0px"} variant='h3' textAlign={"center"}> אנחנו מודים לך על הרשמתך ל Farmers2U.</Typography>
                        <Typography color="#37474f" fontFamily="aleph" minHeight={45} fontWeight={'bold'} fontSize={22} margin={5} variant='h2' textAlign={"center"}> מיד תועברו ללוח המודעות.</Typography>
                    </Box>
                </div>
            )}
        </form>
    );
};

export default FormSummary;
