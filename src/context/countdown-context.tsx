import * as workerTimers from "worker-timers";

import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { ChallengeContext } from "../context/context-challenge";

interface CountdownType {
	children: ReactNode;
}

interface CountdownContextTypes {
	startCountDown: () => void;
	resetCountDown: () => void;
	isActive: boolean;
	hasFinish: boolean;
	minutes: number;
	seconds: number;
}

const INITIAL_TIME = 25 * 60;
let COUNTDOWN_TIMEOUT: number;

export const CountdownContext = createContext({} as CountdownContextTypes);

export function CountdownProvider({ children }: CountdownType) {
	const { startNewChallenge } = useContext(ChallengeContext);

	const [time, setTime] = useState(INITIAL_TIME);
	const [isActive, setIsActive] = useState(false);
	const [hasFinish, setHasFinish] = useState(false);

	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	function startCountDown() {
		setIsActive(true);
	}

	function resetCountDown() {
		workerTimers.clearTimeout(COUNTDOWN_TIMEOUT);
		setIsActive(false);
		setTime(INITIAL_TIME);
		setHasFinish(false);
	}

	useEffect(() => {
		if (isActive && time > 0) {
			COUNTDOWN_TIMEOUT = workerTimers.setTimeout(() => {
				setTime(time - 1);
			}, 1000);
		} else if (isActive && time === 0) {
			startNewChallenge();
			setHasFinish(true);
			setIsActive(false);
		}
	}, [isActive, time]);

	return (
		<CountdownContext.Provider
			value={{
				resetCountDown,
				startCountDown,
				isActive,
				hasFinish,
				minutes,
				seconds,
			}}
		>
			{children}
		</CountdownContext.Provider>
	);
}
