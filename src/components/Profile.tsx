import { GetServerSideProps } from "next";
import { useContext } from "react";
import { ChallengeContext } from "../context/context-challenge";
import styles from "../styles/components/Profile.module.css";

interface ProfileProps {
	userName: string;
	userImage: string;
}

export default function Profile({ userName, userImage }: ProfileProps) {
	const { level } = useContext(ChallengeContext);

	return (
		<div className={styles.profileContainer}>
			<img src={userImage || "/placeholder.png"} alt={userName} />

			<div>
				<strong>{userName}</strong>
				<p>
					<img src="icons/level.svg" alt="level" /> Level {level}
				</p>
			</div>
		</div>
	);
}
