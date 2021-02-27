import { useContext } from "react";
import { ChallengeContext } from "../context/context-challenge";
import { CountdownContext } from "../context/countdown-context";
import styles from "../styles/components/chellengeBox.module.css";

export default function ChellengeBox() {
	const { activeChallenge, resetChallenge, completeChallenge } = useContext(
		ChallengeContext
	);
	const { resetCountDown } = useContext(CountdownContext);

	function handlechallengeSucceded() {
		completeChallenge();
		resetCountDown();
	}

	function handleChallengeFailed() {
		resetChallenge();
		resetCountDown();
	}

	return (
		<div className={styles.chellengeBoxContainer}>
			{activeChallenge ? (
				<div className={styles.chellengeActive}>
					<header>Ganhe {activeChallenge.amount} xp</header>

					<main>
						<img
							src={`icons/${activeChallenge.type}.svg`}
							alt="complete o desafio"
						/>
						<strong>Novo desafio</strong>
						<p>{activeChallenge.description}</p>
					</main>

					<footer>
						<button
							onClick={handleChallengeFailed}
							type="button"
							className={styles.failedButton}
						>
							falhei
						</button>
						<button
							onClick={handlechallengeSucceded}
							type="button"
							className={styles.challengeSucceced}
						>
							completei
						</button>
					</footer>
				</div>
			) : (
				<div className={styles.chellengeNotActive}>
					<strong>Finalize um ciclo para receber um desafio</strong>
					<p>
						<img src="icons/level-up.svg" alt="level up" />
						Avance de level completando os desafios
					</p>
				</div>
			)}
		</div>
	);
}
