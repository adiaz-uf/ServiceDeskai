import { API_BASE_URL } from '../config/constants';
import { getAuthHeaders } from '../config/headers';


const registerUser = async (userData: object) => {
	try {
		const response = await fetch(`${API_BASE_URL}/auth/register`, {
			method: 'POST',
			headers: getAuthHeaders(),
			body: JSON.stringify(userData)
		});

		const result = await response.json();
		
		if (!response.ok) {
			throw new Error(result.message || 'Registration failed');
		}
		
		return result;
	} catch (err) {
		console.error(err);
		throw err;
	}
}

const loginUser = async (credentials: { email: string; password: string }) => {
	try {
		const response = await fetch(`${API_BASE_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		});

		const result = await response.json();
		
		if (!response.ok) {
			throw new Error(result.message || 'Login failed');
		}
		
		return result;
	} catch (err) {
		console.error(err);
		throw err;
	}
}

const logoutUser = async () => {
	try {
		const response = await fetch(`${API_BASE_URL}/auth/logout`, {
			method: 'POST',
			headers: getAuthHeaders()
		});

		const result = await response.json();
		
		if (!response.ok) {
			throw new Error(result.message || 'Logout failed');
		}
		
		return result;
	} catch (err) {
		console.error(err);
		throw err;
	}
}

export const authService = {
	registerUser,
	loginUser,
	logoutUser
};