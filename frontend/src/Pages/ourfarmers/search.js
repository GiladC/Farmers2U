import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './searchbarstyles.css';
import { Box, Typography } from '@mui/material';

const Searchbar = ({ onSearch, searchTerm, setSearchTerm }) => {
  // const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="searchbar_wrap">
      <Box flex={1.5}  justifyContent='ceter'>
        <Typography variant='h4' sx={{alignSelf: 'center', paddingRight: '30px', paddingBottom: '5px', color: '#030443'}}>סינון מתקדם</Typography>
        <Typography width='300spx' sx={{paddingRight:'25px',color: 'rgb(141, 141, 138)'}}>לחצו על כפתור 'הפעלת סינון'.</Typography>
      </Box>
      <div
        className={`searchbar_input_wrapper ${
          isFocused ? 'glow' : 'permanent'
        }`}
      >
        <SearchIcon className="searchbar_icon" />
        <input
          type="text"
          placeholder="!חפשו משק ספציפי"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};

export default Searchbar;