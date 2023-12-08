import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import BlockDetails from './component/blockDetails';
import { alchemy } from './utils/alchemy';

function App() {
	const [blockNumber, setBlockNumber] = useState();
	const [block, setBlock] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getBlockNumber() {
			setBlockNumber(await alchemy.core.getBlockNumber());
		}

		getBlockNumber();
	}, []);

	useEffect(() => {
		async function getBlock() {
			setLoading(true);
			try {
				setBlock(await alchemy.core.getBlockWithTransactions(blockNumber));
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		}

		if (blockNumber) {
			getBlock();
		}
	}, [blockNumber]);

	console.log(block);

	if (loading) {
		return <div className='loading'>Loading...</div>;
	}

	return (
		<main>
			<h1 className='header'>Ziks Explorer</h1>

			<div className='App explorer_container'>
				<section className='block'>
					<BlockDetails block={block} />
				</section>
				<div>
					{block?.transactions?.length > 0 && (
						<section className='transactions_container'>
							<h5>Latest Transactions</h5>
							<ul className='transactions'>
								{block?.transactions?.slice(0, 10)?.map((transaction) => (
									<li key={transaction.hash}>
										<Link to={`/transactions/${transaction.hash}`}>{`${transaction.hash.slice(0, 20)}...`}</Link>
									</li>
								))}
							</ul>
							<button className='btn_transactions'>
								<Link to={`/transactions`} state={{ transactions: JSON.stringify(block.transactions) }} className='view_all'>
									View All Transactions
								</Link>
							</button>
						</section>
					)}
				</div>
			</div>
		</main>
	);
}

export default App;
