import React, { useState } from 'react';
import Searchbar from './search';
import Catalogue from './Catalogue';
import List from '../../DummyData/CardList'
import './styles.css'

function OurFarmers() {

    return(
      <div>
        <Searchbar />
        <Catalogue List={List} />
      </div>
    );
}

export default OurFarmers;