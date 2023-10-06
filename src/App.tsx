import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';

import HeaderLogo from './components/HeaderLogo';

import './App.scss';

import AuthProvider from './context/AuthContext';
// import RouteAuth from './components/RouteAuth';
// import ToastProvider from './context/ToastContext';

// Telas
import Login from "./screens/Login";

function App() {
	return (

		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<HeaderLogo />
			<AuthProvider>
					<Routes>
						<Route path="/" element={<Login />} />
					</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
