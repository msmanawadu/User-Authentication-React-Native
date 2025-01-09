import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { login } from '../util/auth';
import { Alert } from 'react-native';

function LoginScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false); // To manage loading state

	const authCtx = useContext(AuthContext);

	async function loginHandler({ email, password }) {
		setIsAuthenticating(true);
		try {
			const token = await login(email, password);
			authCtx.authenticate(token);
		} catch (error) {
			Alert.alert(
				'Authentication Failed!',
				'Could not log you in. Please check your credentials or try again later!'
			);
			setIsAuthenticating(false);
		}
	}

	if (isAuthenticating) {
		return <LoadingOverlay message='Logging User In...' />;
	}

	return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
