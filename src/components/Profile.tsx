import { useContext } from "react";
import { ChallengeContext } from "../context/context-challenge";
import styles from "../styles/components/Profile.module.css";

export default function Profile() {
	const { level } = useContext(ChallengeContext);

	return (
		<div className={styles.profileContainer}>
			<img src="https://github.com/jrmarqueshd.png" alt="meu perfil" />

			<div>
				<strong>Junior Marques</strong>
				<p>
					<img src="icons/level.svg" alt="level" /> Level {level}
				</p>
			</div>
		</div>
	);
}
