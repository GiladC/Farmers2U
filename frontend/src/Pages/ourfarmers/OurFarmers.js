import React, { useEffect, useState } from 'react';
import Searchbar from './search';
import Catalogue from './Catalogue';
import List from '../../DummyData/CardList';
import './styles.css';
import { Box, Container } from '@mui/material';
import FarmerFilter from '../../components/newFilterPanel/farmerFilter';
import Filter from '../../components/newFilterPanel/filter'
import axios from 'axios';

function OurFarmers() {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]); // State to hold the filtered cards
  const [shownCards, setShownCards] = useState([]);

  const handleSearch = (searchTerm) => {
    const filtered = filteredCards.filter((item) =>
      item.farm_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if(searchTerm == ''){
      setFilteredCards(shownCards);
    }
    else{
    setFilteredCards(filtered);
    }
  };

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/businessCard')
      .then((response) => {
        console.log(response.data);
        setCards(response.data);
        setShownCards(response.data);
        setFilteredCards(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Box display='flex' flexDirection='column' overglowX= 'none'>
      <Container>
        <Searchbar onSearch={handleSearch} /> {/* Pass the handleSearch function as prop */}
      </Container>
      <Box display='flex' width='100%' justifyItems='flex-start' sx={{direction: 'ltr'}}>
        <Box flex='2.5' marginLeft='none' sx={{'&::-webkit-scrollbar': { display: 'none' }, direction: 'rtl', overflowY:'scroll', height:'70vh', scrollBehavior:'smooth'}}>
          <Catalogue List={filteredCards} /> {/*Pass the filtered cards to the Catalogue component */}
        </Box> 
        <Box className='filter' flex='1' sx={{'&::-webkit-scrollbar': { display: 'none' }, direction: 'rtl',borderLeft: 'solid 0.5px #1d3c45',overflowY:'scroll', height: '70vh'}}>
          <FarmerFilter setFilteredCards={setFilteredCards} cards={cards} setShownCards={setShownCards}/>
        </Box>
      </Box>
    </Box>
  );
}

export default OurFarmers;