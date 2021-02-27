import { useContext } from "react";
import { ChallengeContext } from "../context/context-challenge";
import styles from "../styles/components/CompletedChangelles.module.css";

export default function CompletedChangelles() {
	const { challengesCompleted } = useContext(ChallengeContext);

	return (
		<div className={styles.CompletedChangellesContainer}>
			<span>Desafios completos</span>
			<span>{challengesCompleted}</span>
		</div>
	);
}
