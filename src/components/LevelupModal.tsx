import Head from "next/head";
import { useContext, useEffect } from "react";
import { ChallengeContext } from "../context/context-challenge";
import styles from "../styles/components/LevelupModal.module.css";

export default function LevelupModal() {
	const { level, openModalLevelup, closeLeveupModal } = useContext(
		ChallengeContext
	);

	useEffect(() => {
		if (openModalLevelup) new Audio("/level_up.mp3").play();
	}, [openModalLevelup]);

	return (
		openModalLevelup && (
			<div className={styles.overlay}>
				<Head>
					<title>Level Up | MoveIt</title>
				</Head>

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
