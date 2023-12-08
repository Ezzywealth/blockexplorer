import { Alchemy, Network, Utils } from 'alchemy-sdk';

const settings = {
	apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
	network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface

export const alchemy = new Alchemy(settings);

export const fetchTransactions = async (hash) => {
	console.log(process.env.REACT_APP_ALCHEMY_API_KEY);
	const transactions = await alchemy.core.getTransaction(hash);
	return transactions;
};

export const fetchBalance = async (address) => {
	const balance = await alchemy.core.getBalance(address);
	return balance;
};
