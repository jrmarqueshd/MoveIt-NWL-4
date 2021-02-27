import "../styles/global.css";

import { ChallengeProvider } from "../context/context-challenge";

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default MyApp;
