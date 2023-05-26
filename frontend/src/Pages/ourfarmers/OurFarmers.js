import React, { useState } from 'react';
import Searchbar from './search';
import Catalogue from './Catalogue';
import List from '../../DummyData/CardList';
import './styles.css';

function OurFarmers() {
  const [filteredCards, setFilteredCards] = useState(List); // State to hold the filtered cards

  const handleSearch = (searchTerm) => {
    const filtered = List.filter((item) =>
      item.farmName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCards(filtered);
  };

  return (
    <div>
      <Searchbar onSearch={handleSearch} /> {/* Pass the handleSearch function as prop */}
      <Catalogue List={filteredCards} /> {/* Pass the filtered cards to the Catalogue component */}
    </div>
  );
}

export default OurFarmers;