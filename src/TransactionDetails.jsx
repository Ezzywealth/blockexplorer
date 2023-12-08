import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTransactions } from './utils/alchemy';
import './transactiondetails.css';
import { Link } from 'react-router-dom';

const TransactionDetails = () => {
	const [transactionDetails, setTransactionDetails] = useState({});
	const [loading, setLoading] = useState(true);
	const { hash } = useParams();

	useEffect(() => {
		try {
			setLoading(true);
			fetchTransactions(hash).then((data) => {
				setTransactionDetails(data);
				setLoading(false);
			});
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}, [hash]);
	console.log(transactionDetails);

	if (loading) {
		return <h2>Loading...</h2>;
	}

	return (
		<main className='transaction_container'>
			<h2 className='transaction_header'>Transaction Details</h2>
			<div className='details_container'>
				<section className='details_section'>
					<article className='details'>
						<h3 className='details_property'>Transaction hash</h3>
						<p className='details_value'>{transactionDetails.hash}</p>
					</article>
					<article className='details'>
						<h3 className='details_property'>Status</h3>
						<p className='details_value'>{!transactionDetails.timestamp ? 'pending' : 'success'}</p>
					</article>
					<article className='details'>
						<h3 className='details_property'>Block</h3>
						<p className='details_value'>{transactionDetails.blockNumber}</p>
					</article>
					{transactionDetails?.timestamp && (
						<article className='details'>
							<h3 className='details_property'>TimeStamp</h3>
							<p className='details_value'>{transactionDetails.timestamp}</p>
						</article>
					)}
				</section>
				<section className='details_section'>
					<article className='details'>
						<h3 className='details_property'>From</h3>
						<p className='details_value'>
							<Link to={`/address/${transactionDetails.from}`}>{transactionDetails.from}</Link>
						</p>
					</article>
					<article className='details'>
						<h3 className='details_property'>To</h3>
						<p className='details_value'>
							<Link to={`/address/${transactionDetails.from}`}>{transactionDetails.to}</Link>
						</p>
					</article>
				</section>
				<section className='details_section'>
					<article className='details'>
						<h3 className='details_property'>Value</h3>
						<p className='details_value'>{transactionDetails.value._hex}</p>
					</article>
					<article className='details'>
						<h3 className='details_property'>Transaction Fee</h3>
						<p className='details_value'>{transactionDetails.gas}</p>
					</article>
					<article className='details'>
						<h3 className='details_property'>Gas Price</h3>
						<p className='details_value'>{transactionDetails.gasPrice._hex}</p>
					</article>
				</section>
				<section className='details_section'>
					<article className='details'>
						<h3 className='details_property'>Gas Limit</h3>
						<p className='details_value'>{transactionDetails.gasLimit._hex}</p>
					</article>
					<article className='details'>
						<h3 className='details_property'>Gas Fees</h3>
						<p className='details_value'>{transactionDetails.gasPrice._hex}</p>
					</article>
				</section>
			</div>
		</main>
	);
};

export default TransactionDetails;
