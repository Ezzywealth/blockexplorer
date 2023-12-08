import React from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import PaginationBtns from './PaginationBtns';

const Pagination = ({ currentPage, totalPages, itemsPerPage, totalItems, onPageChange }) => {
	const { renderPageButtons, handlePageChange } = PaginationBtns({ currentPage, totalPages, itemsPerPage, totalItems, onPageChange });

	return (
		<div className='pagination_container'>
			<div className='pagination_info'>
				<p>Showing</p>
				<select
					value={currentPage}
					onChange={(e) => {
						onPageChange(+e.target.value);
					}}
					className='select_field'>
					{Array.from({ length: totalPages }, (_, index) => (
						<option key={index + 1} defaultValue={currentPage} value={index + 1} data-testid={`option-${index + 1}`}>
							{index + 1}
						</option>
					))}
				</select>
				out of {totalPages}
			</div>
			{totalPages > 1 && (
				<div className='pagination_pages'>
					<span className='pagination_arrow'>
						<MdKeyboardArrowLeft size={25} onClick={() => handlePageChange(currentPage - 1)} />
					</span>
					{renderPageButtons()}
					<span className='pagination_arrow'>
						<MdKeyboardArrowRight size={25} onClick={() => handlePageChange(currentPage + 1)} />
					</span>
				</div>
			)}
		</div>
	);
};

export default Pagination;
