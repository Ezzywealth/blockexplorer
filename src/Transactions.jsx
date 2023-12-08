import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Pagination from './component/Pagination';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Transactions = (props) => {
	const [transactions, setTransactions] = useState([]);
	const [filteredTransactions, setFilteredTransactions] = useState([]);
	let { state } = useLocation();
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [totalItems, setTotalItems] = useState(transactions);
	const navigate = useNavigate();

	const onPageChange = (page) => {
		// set the current page to the payload
		setCurrentPage(() => page);
		setFilteredTransactions(transactions.slice((page - 1) * itemsPerPage, page * itemsPerPage));
	};

	// set transactions from state
	useEffect(() => {
		setTransactions(JSON.parse(state.transactions));
		setFilteredTransactions(JSON.parse(state.transactions).slice(0, itemsPerPage));
	}, [state]);

	// calculate total pages with items per page
	useEffect(() => {
		setTotalPages(Math.ceil(transactions.length / itemsPerPage));
	}, [transactions]);

	const handleClick = (link) => {
		navigate(link);
	};

	console.log(transactions);

	return (
		<div className='transaction_page_container'>
			<Link to='/'>Go home</Link>
			<h2>More than {transactions.length - 1} transaction found</h2>
			<div className='transaction-container'>
				<table className='transaction-table'>
					<thead>
						<tr>
							<th>Txn Hash</th>
							<th>Method</th>
							<th>Block</th>
							<th>Age</th>
							<th>From</th>
							<th>To</th>
							<th>Value</th>
							<th>Txn Fee</th>
						</tr>
					</thead>
					<tbody>
						{filteredTransactions.map((txn) => (
							<tr key={txn.hash} onClick={() => handleClick(`/transactions/${txn.hash}`)} style={{ cursor: 'pointer' }}>
								<td>{`${txn?.hash?.slice(0, 10)}...`}</td>
								<td>Transfer</td>
								<td>{txn?.blockNumber}</td>
								<td>{txn.age}</td>
								<td>{`${txn?.s?.slice(0, 10)}...`}</td>
								<td>{`${txn?.r?.slice(0, 10)}...`}</td>
								<td>{parseInt(txn?.value?.hex?.slice(2)) || 0}</td>
								<td>{parseInt(txn?.gasPrice?.hex?.slice(2))}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Pagination currentPage={currentPage} totalPages={totalPages} itemsPerPage={itemsPerPage} totalItems={totalItems} onPageChange={onPageChange} />
		</div>
	);
};

export default Transactions;
