import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';

function SignupScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false); // To manage loading state

	async function signupHandler({ email, password }) {
		setIsAuthenticating(true);
		try {
			await createUser(email, password);
		} catch (error) {
			Alert.alert(
				'Authentication Failed!',
				'Could not create user. Please check your input and try again later!'
			);
		}
		setIsAuthenticating(false);
	}

	if (isAuthenticating) {
		return <LoadingOverlay message='Creating User...' />;
	}

	return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
