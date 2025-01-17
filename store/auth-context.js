// Managing app-wide user authentication status

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
	token: '',
	isAuthenticated: false,
	authenticate: (token) => {},
	logout: () => {},
});

function AuthContextProvider({ children }) {
	const [authToken, setAuthToken] = useState(); // To keep track of user's authentication status

	function authenticate(token) {
		setAuthToken(token);
		AsyncStorage.setItem('token', token); // Store auth token in local storage
	}

	function logout() {
		setAuthToken(null);
		AsyncStorage.removeItem('token'); // Remove auth token from local storage
	}

	const value = {
		token: authToken,
		isAuthenticated: !!authToken,
		authenticate: authenticate,
		logout: logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
