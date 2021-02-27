import { useContext } from "react";
import { ChallengeContext } from "../context/context-challenge";
import styles from "../styles/components/LevelupModal.module.css";

export default function LevelupModal() {
	const { level, openModalLevelup, closeLeveupModal } = useContext(
		ChallengeContext
	);

	return (
		openModalLevelup && (
			<div className={styles.overlay}>
				<div className={styles.modalContainer}>
					<header>{level}</header>
					<strong>Parabéns</strong>
					<p>Você alcançou um novo level.</p>

					<button type="button" onClick={closeLeveupModal}>
						<img src="/icons/close.svg" alt="Fechar modal" />
					</button>
				</div>
			</div>
		)
	);
}
