import React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Transactions from './Transactions';
import TransactionDetails from './TransactionDetails';
import User from './User';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/transactions',
		element: <Transactions />,
	},
	{
		path: '/transactions/:hash',
		element: <TransactionDetails />,
	},
	{
		path: '/address/:address',
		element: <User />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
