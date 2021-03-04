import { AuthProvider } from "../context/auth-context";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Component {...pageProps} />;
		</AuthProvider>
	);
}

export default MyApp;
