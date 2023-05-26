import React from 'react';
import SearchIcon from '@mui/icons-material/Search';import './styles.css'

const Searchbar = ({ value, changeInput}) => {
    return(
        <div className="searchbar_wrap">
            <SearchIcon className="searchbar_icon" />
            <input tyle="text" 
            placeholder="!חפשו משק ספציפי"
            value={value} onChange={changeInput} />
        </div>
    )
}

export default Searchbar;