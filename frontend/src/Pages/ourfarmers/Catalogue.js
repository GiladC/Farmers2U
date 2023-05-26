import React, { useState } from 'react';
import FarmCard from './profilecard';
import './styles.css'; 

const Catalogue = ({ List }) => {
    const cardsPerPage = 4; // Number of cards to display per page
    const totalPages = Math.ceil(List.length / cardsPerPage); // Calculate the total number of pages
    const [currentPage, setCurrentPage] = useState(1); // Current page state
  
    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
  
    // Get the cards to display on the current page
    const currentCards = List.slice(startIndex, endIndex);
  
    // Handle page navigation
    const goToPage = (page) => {
      setCurrentPage(page);
    };
  
    return (
      <div className="catalogue-container">
        <div className="card-grid">
          {currentCards.map((item, index) => (
            <FarmCard key={index} {...item} />
          ))}
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => goToPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default Catalogue;