import React from 'react';

const PaginationBtns = ({ currentPage, totalPages, itemsPerPage, totalItems, onPageChange }) => {
	const handlePageChange = (page) => {
		if (page < 1 || page > totalPages) return;
		onPageChange(page);
	};
	const renderPageButtons = () => {
		const pageButtons = [];

		// Determine the range of pages to display
		const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 5));
		const endPage = Math.min(totalPages, startPage + 2); // Show 5 pages in total

		// Always show the last two pages if there are more than 5 pages
		const lastTwoPages = Math.max(1, totalPages - 1);

		for (let i = startPage; i <= endPage; i++) {
			pageButtons.push(
				<button key={i} className={`pagination_page ${currentPage === i ? 'active' : ''}`} onClick={() => handlePageChange(i)}>
					{i}
				</button>
			);
		}

		// Show dots if there are more than 5 pages
		if (totalPages > 5 && endPage < totalPages - 1) {
			pageButtons.push(
				<span key='dots' className='pagination_dots'>
					...
				</span>
			);
		}

		// Always show the last three pages
		for (let i = lastTwoPages; i <= totalPages; i++) {
			pageButtons.push(
				<button key={i} className={`pagination_page ${currentPage === i ? 'active' : ''}`} onClick={() => handlePageChange(i)}>
					{i}
				</button>
			);
		}

		return pageButtons;
	};

	return {
		renderPageButtons,
		handlePageChange,
	};
};
export default PaginationBtns;
