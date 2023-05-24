import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import './profileSettings.css'
import { AccessTime, Email, Facebook, Home, Instagram, Language, Person2, Phone, WhatsApp } from '@mui/icons-material'
import farm from '../../assets/Board_images/farm1.jpeg'
import AddPost from '../../components/Post/AddPost'
import WorkingHours from '../../components/Settings/workingHours'

function profileSettings() {
  return (
    <Box sx={{
        direction: 'rtl'
    }}>
        <Typography variant='h2' sx={{
        display: 'flex',
        justifyContent: 'center',
        }}>הגדרות משתמש</Typography>
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: '3fr 4fr'
        }}>
            <Container sx={{
                flex: 5,
                width: '100%',
            }}>
                <form>
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label htmlFor='שם' className='inputLabel'>שם משתמש:</label>
                        <Box width= '100%' border='2px solid brown' borderRadius='1rem'
                        alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                            <Box fontSize='2rem' bgcolor= 'brown' padding= '0.5rem 1rem'
                            color='white' display= 'grid' cursor='pointer'>
                                <Person2/>
                            </Box>
                            <TextField
                            InputProps={{ disableUnderline: true }}
                            variant='standard'
                            width= '100%'
                            type='text'
                            defaultValue='משק הגולן'
                            className='Form_box_input'
                            />
                        </Box>
                    </Box>
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label htmlFor='כתובת/מיקום' className='inputLabel'>כתובת/מיקום:</label>
                        <Box width= '100%' border='2px solid brown' borderRadius='1rem'
                        alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                            <Box fontSize='2rem' bgcolor= 'brown' padding= '0.5rem 1rem'
                            color='white' display= 'grid' cursor='pointer'>
                                <Home/>
                            </Box>
                            <TextField
                            InputProps={{ disableUnderline: true }}
                            variant='standard'
                            width= '100%'
                            type='text'
                            defaultValue='גולן'
                            className='Form_box_input'
                            />
                        </Box>
                    </Box>
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label htmlFor='ימי ושעות עבודה' className='inputLabel'>ימי ושעות עבודה:</label>
                        <Box width= '100%' border='2px solid brown' borderRadius='1rem'
                        alignItems='center' display= 'flex' flexDirection= 'column' gap='1rem' overflow='hidden'>
                            <WorkingHours day = 'ראשון' />
                            <WorkingHours day = 'שני' />
                            <WorkingHours day = 'שלישי' />
                            <WorkingHours day = 'רביעי' />
                            <WorkingHours day = 'חמישי' />
                            <WorkingHours day = 'שישי' />
                            <div className="lastHour">
                                <WorkingHours day = 'שבת' />
                            </div>
                        </Box>
                    </Box>
                    <Box gap={3} sx={{display: 'flex'}}>
                    <Box gap= {1}  sx={{
                        mt: '2rem', flex: 4
                    }}>
                        <label htmlFor='טלפון' className='inputLabel'>טלפון:</label>
                        <Box width= '100%' border='2px solid brown' borderRadius='1rem'
                        alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                            <Box fontSize='2rem' bgcolor= 'brown' padding= '0.5rem 1rem'
                            color='white' display= 'grid' cursor='pointer'>
                                <Phone />
                            </Box>
                            <TextField
                            InputProps={{ disableUnderline: true }}
                            variant='standard'
                            width= '100%'
                            type='text'
                            defaultValue='0725437433'
                            className='Form_box_input'
                            />
                        </Box>
                    </Box>
                    <Box gap= {1}  sx={{
                            mt: '2rem', flex: 4
                        }}>
                            <label htmlFor='וואטסאפ' className='inputLabel'>וואטסאפ:</label>
                            <Box width= '100%' border='2px solid brown' borderRadius='1rem'
                            alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                                <Box fontSize='2rem' bgcolor= 'brown' padding= '0.5rem 1rem'
                                color='white' display= 'grid' cursor='pointer'>
                                    <WhatsApp />
                                </Box>
                                <TextField
                                InputProps={{ disableUnderline: true }}
                                type='text'
                                variant='standard'
                                defaultValue='0547984551'
                                className='Form_box_input'
                                sx={{justifyContent:'center' ,width:'100%', border: '0', bgcolor: 'transparent', outline:'none', height: '30px'}}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label htmlFor='מייל' className='inputLabel'>מייל:</label>
                        <Box width= '100%' border='2px solid brown' borderRadius='1rem'
                        alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                            <Box fontSize='2rem' bgcolor= 'brown' padding= '0.5rem 1rem'
                            color='white' display= 'grid' cursor='pointer'>
                                <Email />
                            </Box>
                            <TextField
                            InputProps={{ disableUnderline: true }}
                            variant='standard'
                            width= '100%'
                            type='text'
                            defaultValue='golanFarm@gmail.com'
                            className='Form_box_input'
                            />
                        </Box>
                    </Box>
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label htmlFor='אתר' className='inputLabel'>אתר:</label>
                        <Box width= '100%' border='2px solid brown' borderRadius='1rem'
                        alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                            <Box fontSize='2rem' bgcolor= 'brown' padding= '0.5rem 1rem'
                            color='white' display= 'grid' cursor='pointer'>
                                <Language />
                            </Box>
                            <TextField
                            InputProps={{ disableUnderline: true }}
                            variant='standard'
                            width= '100%'
                            type='text'
                            defaultValue=''
                            className='Form_box_input'
                            />
                        </Box>
                    </Box>
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label htmlFor='תיאור' className='inputLabel'>תיאור:</label>
                        <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={8}
                        fullwidth
                        width= '100%'
                        defaultValue="המשק קיים מזה 20 שנה והוא משק משפחתי שעובר מדור לדור. המטרה שלנו היא להביא את הירקות האיכותיים ביותר, במחירים הגונים.
אנו מגדלים את הירקות שלנו בתנאים הטובים ביותר, על מנת להבטיח לכם את הטוב ביותר.
הירקות שלנו גדלים תחת אוויר הרי גולן הפסטורליים, וצוות החקלאים שלנו משתמש בטכנולוגיה החדשנית ביותר בתחום."
                        sx={{
                            width: '100%'
                        }} />
                    </Box>
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label htmlFor='מחירון' className='inputLabel'>מחירון:</label>
                        <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={8}
                        fullwidth
                        width= '100%'
                        defaultValue= 'מלפפון: 5.9 ש"ח לק"ג
עגבניה: 5 ש"ח לק"ג
בצל: 6.4 ש"ח לק"ג
גזר: 6 ש"ח לק"ג
חציל: 7 ש"ח לק"ג'
                        sx={{
                            width: '100%'
                        }} />
                    </Box>
                    <Box gap= {1}  sx={{
                        mt: '2rem',
                    }}>
                        <label htmlFor='מדיניות משלוחים' className='inputLabel'>מדיניות משלוחים:</label>
                        <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={8}
                        fullwidth
                        width= '100%'
                        defaultValue= 'משלוחים רק בצפון, החל ממחיר הזמנה של 120 ש"ח.
ניתן לעשות הזמנות מראש ולקחת באיסוף עצמי.'
                        sx={{
                            width: '100%'
                        }} />
                    </Box>
                    <Box gap={3} sx={{display: 'flex'}}>
                        <Box gap= {1}  sx={{
                            mt: '2rem', flex: 4
                        }}>
                            <label htmlFor='אינסטגרם' className='inputLabel'>אינסטגרם:</label>
                            <Box width= '100%' border='2px solid brown' borderRadius='1rem'
                            alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                                <Box fontSize='2rem' bgcolor= 'brown' padding= '0.5rem 1rem'
                                color='white' display= 'grid' cursor='pointer'>
                                    <Instagram />
                                </Box>
                                <TextField
                                InputProps={{ disableUnderline: true }}
                                type='text'
                                variant='standard'
                                defaultValue='golan_farm20'
                                className='Form_box_input'
                                sx={{justifyContent:'center' ,width:'100%', border: '0', bgcolor: 'transparent', outline:'none', height: '30px'}}
                                />
                            </Box>
                        </Box>
                        <Box gap= {1}  sx={{
                            mt: '2rem', flex: 4
                        }}>
                            <label htmlFor='פייסבוק' className='inputLabel'>פייסבוק:</label>
                            <Box width= '100%' border='2px solid brown' borderRadius='1rem'
                            alignItems='center' display= 'flex' gap='1rem' overflow='hidden'>
                                <Box fontSize='2rem' bgcolor= 'brown' padding= '0.5rem 1rem'
                                color='white' display= 'grid' cursor='pointer'>
                                    <Facebook/>
                                </Box>
                                <TextField
                                InputProps={{ disableUnderline: true }}
                                type='text'
                                variant='standard'
                                defaultValue='משק גולן'
                                className='Form_box_input'
                                sx={{justifyContent:'center' ,width:'100%', border: '0', bgcolor: 'transparent', outline:'none', height: '30px'}}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box display= 'flex' mt={5} mb={5} justifyContent='center' sx={{color: 'brown'}}>
                    <Button variant='contained' color= 'success' sx={{justifyContent: 'center'}}>שמירת פרטים</Button>
                    </Box>
                </form>
            </Container>
            <Container>
                <Box gap={10} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Box className='account_box_img' sx={{
                        mt: '2rem',
                        cursor: 'pointer',
                        position: 'relative',
                        textAlign: 'center'
                    }}>
                        <img 
                        src = {farm}
                        width= {150}
                        height= {150}
                        className= 'profileImg'
                        />
                        <Typography className='account_box_img_para' sx={{
                        fontWeight: '700',
                        fontSize: '1.2rem',
                        lineHeight: '0',
                        mt: '10px',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        alignContent: 'center'
                        }}>החלפת תמונה</Typography>
                    </Box>
                    <Box className='account_box_img' sx={{
                        mt: '2rem',
                        cursor: 'pointer',
                        position: 'relative',
                        textAlign: 'center'
                    }}>
                        <img 
                        src = {farm}
                        width= {150}
                        height= {150}
                        className='profileImg'
                        />
                        <Typography className='account_box_img_para' sx={{
                        fontWeight: '700',
                        fontSize: '1.2rem',
                        lineHeight: '0',
                        mt: '10px',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        alignContent: 'center'
                        }}>החלפת לוגו</Typography>
                    </Box>
                </Box>
                <Container sx={{paddingTop: '30px', display: 'flex', justifyContent: 'center'}}>
                            <Typography>מקום לתמונות</Typography>
                </Container>
            </Container>
            <AddPost />
        </Box>
    </Box>
  )
}

export default profileSettings