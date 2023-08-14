import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import validator from 'validator';
import {Client} from '@googlemaps/google-maps-services-js';

export function ValidateEmail({email, setValidFlag}) {
    useEffect(() => {
        isValidEmail();
    }, [email, setValidFlag])

    function isValidEmail() {
        const regexp = new RegExp('^.+@[^\\.].*\\[a-z]{2,}$');
        const res = validator.isEmail(email);
        if(!res) {
            setValidFlag(false);
        }
        else {
            setValidFlag(true);
        }
        return res;
      }

    return (
        isValidEmail()? null
        :
        <Stack sx={{color: 'red'}}>נא להזין כתובת מייל תקינה</Stack>
    )
}

export function ValidateWhatsapp({whatsapp, setValidFlag}) {

    const [valid, setValid] = useState(true);

    useEffect(() => {
        setValid(isValidWhatsapp());
    }, [whatsapp, setValidFlag]);
    
    function isValidWhatsapp() {
        const regexp = new RegExp('^[0][5][0|2|3|4|5|9]{1}[-]{0,1}[0-9]{7}$', 'g');
        const res = regexp.test(whatsapp) || whatsapp === "";
        // const res = validator.isMobilePhone(whatsapp, 'he-IL') || whatsapp === "";
        if (!res)
        {
            setValidFlag(false);
        }
        else {
            setValidFlag(true);
        }
        return res;
      }

    return (
        valid? null
        :
        <Stack sx={{color: 'red'}}>נא להזין מספר תקין</Stack>
    )
}

export function ValidatePhone({phone, setValidFlag}) {
    const [valid ,setValid] = useState(true);

    useEffect(() => {
        setValid(isValidPhone());
    }, [phone, setValidFlag]);

    function isValidPhone() {
        const regexp = new RegExp('^0(?:[234689]|5[0-689]|7[246789])(?![01])(\\d{7})$');
        const res = regexp.test(phone) || phone === "";
        if(!res) {
            setValidFlag(false);
        }
        else {
            setValidFlag(true);
        }
        return res;
      }

    return (
        valid? null
        :
        <Stack sx={{color: 'red'}}>נא להזין מספר תקין</Stack>
    )
}

export function ValidateWebsite({url, setValidFlag}) {
    const [valid ,setValid] = useState(true);
    
    useEffect(() => {
        setValid(isValidWebsite());
    }, [url, setValidFlag]);

    function isValidWebsite() {
        const regexp = new RegExp('(https:\\/\\/www\\.|http:\\/\\/www\\.|https:\\/\\/|http:\\/\\/)?[a-zA-Z]{2,}(\\.[a-zA-Z]{2,})(\\.[a-zA-Z]{2,})?\\/[a-zA-Z0-9]{2,}|((https:\\/\\/www\.|http:\\/\\/www\\.|https:\\/\\/|http:\\/\\/)?[a-zA-Z]{2,}(\\.[a-zA-Z]{2,})(\\.[a-zA-Z]{2,})?)|(https:\\/\\/www\\.|http:\\/\\/www\\.|https:\\/\\/|http:\\/\\/)?[a-zA-Z0-9]{2,}\\.[a-zA-Z0-9]{2,}\\.[a-zA-Z0-9]{2,}(\\.[a-zA-Z0-9]{2,})?');
        const res = regexp.test(url) || url === "";
        if(!res){
            setValidFlag(false);
        }
        else {
            setValidFlag(true);
        }
        return res;
      }

    return (
        valid? null
        :
        <Stack sx={{color: 'red'}}>נא להכניס קישור תקין</Stack>
    )
}

export function ValidateInstagram({instagram, setValidFlag}) {
    const [valid ,setValid] = useState(true);
    
    useEffect(() => {
        setValid(isValidInstagram());
    }, [instagram, setValidFlag]);

    function isValidInstagram() {
        const regexp = new RegExp("(http(s?)://)?(?:www.)?(?:instagram|instagr).([a-z])+/(\\w*)?/?", 'gs');
        const res = regexp.test(instagram) || instagram === "";
        if(!res){
            setValidFlag(false);
        }
        else {
            setValidFlag(true);
        }
        return res;
      }

    return (
        valid? null
        :
        <Stack sx={{color: 'red'}}>נא להכניס קישור תקין</Stack>
    )
}


export function ValidateFacebook({facebook, setValidFlag}) {
    const [valid ,setValid] = useState(true);
    
    useEffect(() => {
        setValid(isValidFacebook());
    }, [facebook, setValidFlag]);

    function isValidFacebook() {
        const regexp = new RegExp('/(?:https?:\\/\\/)?(?:www\\.)?(mbasic.facebook|m\\.facebook|facebook|fb)\\.(com|me)\\/(?:(?:\\w\\.)*#!\\/)?(?:pages\\/)?(?:[\\w\\-\\.]*\\/)*([\\w\\-\\.]*)/');
        const res =  regexp.test(facebook) || facebook === "";
        if(!res){
            setValidFlag(false);
        }
        else {
            setValidFlag(true);
        }
        return res;
      }

    return (
        valid? null
        :
        <Stack sx={{color: 'red'}}>נא להכניס קישור תקין</Stack>
    )
}

export function ValidateAddress({address, setValidFlag, isInitialized}){
    const [valid ,setValid] = useState(true);

    useEffect(() => {
        if(isInitialized) 
        {
           isValidAddress();
        }
    }, [address, setValidFlag]);

    async function isValidAddress(){
        const client = new Client();
        try {
            const response = await client.geocode({
                params: {
                address: address,
                country: 'il',
                language: 'iw',
                components: 'country: IL',
                key: 'AIzaSyAW-HDgK8fdEceybLwvRN_7wYgI_TtHmQ0'
                }
            });
            
            if (response.data.status === 'OK') {
                const res = response.data.results;
                const res_0 = res[0];
                const formatted_address = res_0.formatted_address;
                console.log(response.data);
                if(res > 1)
                {
                    setValid(false);
                    setValidFlag(false);
                }
                else if(res_0.partial_match)
                {
                    setValid(false);
                    setValidFlag(false);
                }
                else
                {
                    setValid(true);
                    setValidFlag(true);
                    // const len = formatted_address.length;
                    // console.log(formatted_address.slice(0,formatted_address.length - 7));
                    // if(address === formatted_address.slice(0,formatted_address.length - 7))
                    // {
                    //     setValid(true);
                    //     setValidFlag(true);
                    // }
                    // else {
                    //     setValid(false);
                    //     setValidFlag(false);
                    // }
                }
            }
            else
            {
                setValid(false);
                setValidFlag(false);
            }
        }
        catch (error) {
            console.log(error);
            setValid(false);
            setValidFlag(false);
        }
    }

    return (
        valid? null
        :
        <Stack sx={{color: 'red'}}> נא לוודא שנבחרה במדויק אופציה מבין הקיימות</Stack>
    )

}
