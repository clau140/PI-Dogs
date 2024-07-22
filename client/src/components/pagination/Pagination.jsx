import React, { useState } from 'react';
import './pagination.css';

export default function Pagination({ allDogs, dogsPerPage, pagination }) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(allDogs / dogsPerPage);
    const pageNumbers = [];
    const maxPageNumbersToShow = 5; // Número máximo de páginas a mostrar

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            pagination(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            pagination(currentPage + 1);
        }
    };

    const visiblePageNumbers = pageNumbers.slice(
        Math.max(0, currentPage - Math.ceil(maxPageNumbersToShow / 2)),
        Math.min(totalPages, currentPage + Math.floor(maxPageNumbersToShow / 2))
    );

    return (
        <div className='container-pagination'>
            <ul className='nums'>
                {currentPage > 1 && (
                    <li>
                        <button className='buttonPages' onClick={handlePrevious}>
                            &laquo;
                        </button>
                    </li>
                )}
                {visiblePageNumbers.map(number => (
                    <li key={number}>
                        <button
                            className={`buttonPages ${number === currentPage ? 'active' : ''}`}
                            onClick={() => {
                                setCurrentPage(number);
                                pagination(number);
                            }}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                {currentPage < totalPages && (
                    <li>
                        <button className='buttonPages' onClick={handleNext}>
                            &raquo;
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
}
