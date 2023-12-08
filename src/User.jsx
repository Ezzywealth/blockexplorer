import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBalance } from './utils/alchemy';
import './user.css';

const User = () => {
	const { address } = useParams();
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);
	const [userAddress, setUserAddress] = useState('');

	useEffect(() => {
		setUserAddress(address);
		try {
			fetchBalance(address).then((data) => {
				setUser(data);
			});
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	}, [address]);
	console.log(user);
	console.log(address);
	return (
		<main>
			<h2>Account Overview</h2>

			<section className='overview_container'>
				<article className='balance'>
					<h3 className='details_property'>Eth Balance</h3>
					<p className='details_value'>{user?._hex}</p>
				</article>
				<article className='value'>
					<h3 className='details_property'>Eth Value</h3>
					<p className='details_value'>{user?.timestamp}</p>
				</article>
			</section>
		</main>
	);
};

export default User;
