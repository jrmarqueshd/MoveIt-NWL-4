import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";

import challenges from "../../challenges.json";
import LevelupModal from "../components/LevelupModal";

interface ChallengeType {
	children: ReactNode;
	level: number;
	currentExperience: number;
	challengesCompleted: number;
}

interface Challenge {
	type: "body" | "eye";
	description: string;
	amount: number;
}

interface ChanllengeContextTypes {
	level: number;
	currentExperience: number;
	challengesCompleted: number;
	experienceToNextLevel: number;
	activeChallenge: Challenge;
	openModalLevelup: boolean;
	startNewChallenge: () => void;
	closeLeveupModal: () => void;
	levelUp: () => void;
	resetChallenge: () => void;
	completeChallenge: () => void;
}

export const ChallengeContext = createContext({} as ChanllengeContextTypes);

export function ChallengeProvider({ children, ...rest }: ChallengeType) {
	const [level, setLevel] = useState(rest.level ?? 1);
	const [currentExperience, setCurrentExperience] = useState(
		rest.currentExperience ?? 0
	);
	const [challengesCompleted, setChallengesCompleted] = useState(
		rest.challengesCompleted ?? 0
	);
	const [openModalLevelup, setOpenModalLevelup] = useState(false);

	const [activeChallenge, setActiveChallenge] = useState(null);

	const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

	useEffect(() => {
		Cookies.set("level", String(level));
		Cookies.set("currentExperience", String(currentExperience));
		Cookies.set("challengesCompleted", String(challengesCompleted));
	}, [level, currentExperience, challengesCompleted]);

	useEffect(() => {
		Notification.requestPermission();
	}, []);

	function levelUp() {
		setLevel(level + 1);
		setOpenModalLevelup(true);
	}

	function startNewChallenge() {
		const randomChallenges = Math.floor(Math.random() * challenges.length);
		const challenge = challenges[randomChallenges];

		setActiveChallenge(challenge);

		new Audio("/notification.mp3").play();

		if (Notification.permission === "granted") {
			new Notification("Novo desafio 💪", {
				body: `Valendo ${challenge.amount} xp`,
			});
		}
	}

	function resetChallenge() {
		setActiveChallenge(null);
	}

	function closeLeveupModal() {
		setOpenModalLevelup(false);
	}

	function completeChallenge() {
		if (!activeChallenge) return null;

		const { amount } = activeChallenge;

		let finalExperience = currentExperience + amount;

		if (finalExperience > experienceToNextLevel) {
			finalExperience = finalExperience - experienceToNextLevel;
			levelUp();
		}

		setCurrentExperience(finalExperience);
		setActiveChallenge(null);
		setChallengesCompleted(challengesCompleted + 1);
	}

	return (
		<ChallengeContext.Provider
			value={{
				level,
				currentExperience,
				challengesCompleted,
				activeChallenge,
				experienceToNextLevel,
				openModalLevelup,
				closeLeveupModal,
				startNewChallenge,
				levelUp,
				resetChallenge,
				completeChallenge,
			}}
		>
			{children}

			<LevelupModal />
		</ChallengeContext.Provider>
	);
}
