import React from 'react';

const BlockDetails = ({ block }) => {
	return (
		<>
			<div className='block_detail'>
				<h5> Current Block Number:</h5> <h6> {block?.number}</h6>
			</div>
			<div className='block_detail'>
				<h5>No of Transactions :</h5> <h6> {block?.transactions?.length}</h6>
			</div>
			<div className='block_detail'>
				<h5>DIfficulty :</h5> <h6> {block?.difficulty}</h6>
			</div>
			<div className='block_detail'>
				<h5>Gas Used :</h5> <h6> {parseInt(block?.gasUsed._hex.slice(2), 16)}</h6>
			</div>
			<div className='block_detail'>
				<h5>Gas Limit :</h5> <h6> {parseInt(block?.gasLimit._hex.slice(2), 16)}</h6>
			</div>
			<div className='block_detail'>
				<h5>Miner :</h5> <h6> {block?.miner}</h6>
			</div>
		</>
	);
};

export default BlockDetails;
