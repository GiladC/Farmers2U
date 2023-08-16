import React, { useEffect, useState } from 'react';
import Searchbar from './search';
import Catalogue from './Catalogue';
import List from '../../DummyData/CardList';
import './styles.css';
import { Box, Container, Typography } from '@mui/material';
import FarmerFilter from '../../components/newFilterPanel/farmerFilter';
import Filter from '../../components/newFilterPanel/filter'
import axios from 'axios';

function OurFarmers() {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]); // State to hold the filtered cards
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCards, setCurrentCards] = useState([]);

  const handleSearch = (searchTerm) => {
    const searched = filteredCards.filter((item) =>
      item.farm_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if(searchTerm == '' || !searchTerm){
      setCurrentCards(filteredCards);
    }
    else{
    setCurrentCards(searched);
    }
  };

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/businessCard')
      .then((response) => {
        console.log(response.data);
        setCards(response.data);
        setCurrentCards(response.data);
        setFilteredCards(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [filteredCards])

  return (
    <Box display='flex' flexDirection='column' overflowX= 'none'>
      <div className='wrapper' style={{direction: 'ltr'}}>
        <div className='left' style={{direction: 'rtl', flex: "4", justifyContent: 'flex-start'}}>
          <Box>
            <Searchbar onSearch={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> {/* Pass the handleSearch function as prop */}
          </Box>
          <Box flex='2.5' marginLeft='none' sx={{'&::-webkit-scrollbar': { display: 'none' }, direction: 'rtl', overflowY:'scroll', height:'70vh', scrollBehavior:'smooth'}}>
            <Catalogue List={currentCards} /> {/*Pass the filtered cards to the Catalogue component */}
          </Box>
        </div>
        <div className='right' dir='rtl' style={{flex: '1.5'}}>
        <div className='filterHeader' style={{padding: '1rem 0rem'}}>
          <Typography variant='h4' sx={{textAlign: 'center', paddingBottom: '5px', color: '#030443'}}>סינון מתקדם</Typography>
          <Typography width='300spx' sx={{textAlign: 'center', color: 'rgb(141, 141, 138)', direction: 'rtl'}}>לחצו על כפתור 'הפעלת סינון'.</Typography>
        </div>
        <Box className='filter' flex='1' sx={{'&::-webkit-scrollbar': { display: 'none' }, direction: 'rtl',borderLeft: 'solid 0.5px #1d3c45',overflowY:'scroll', height: '70vh'}}>
            <FarmerFilter setFilteredCards={setFilteredCards} cards={cards} setCurrentCards={setCurrentCards} setSearchTerm={setSearchTerm}/>
        </Box>
        </div>
      </div>
    </Box>
  );
}

export default OurFarmers;