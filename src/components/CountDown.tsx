import Head from "next/head";
import { useContext } from "react";
import { CountdownContext } from "../context/countdown-context";

import styles from "../styles/components/CountDown.module.css";

export default function CountDown() {
	const {
		hasFinish,
		isActive,
		minutes,
		seconds,
		resetCountDown,
		startCountDown,
	} = useContext(CountdownContext);

	const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
	const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

	return (
		<div>
			{isActive && (
				<Head>
					<title>
						{String(minutes).padStart(2, "0")}:
						{String(seconds).padStart(2, "0")} | MoveIt Running
					</title>
				</Head>
			)}

			{hasFinish && (
				<Head>
					<title>Novo Desafio 🥊 | MoveIt Running</title>
				</Head>
			)}

			<div className={styles.countDownContainer}>
				<div>
					<span>{minuteLeft}</span>
					<span>{minuteRight}</span>
				</div>
				<span>:</span>
				<div>
					<span>{secondLeft}</span>
					<span>{secondRight}</span>
				</div>
			</div>

			{hasFinish && (
				<button disabled type="button" className={styles.countDownButton}>
					Ciclo encerrado
				</button>
			)}

			{!hasFinish && (
				<>
					{isActive ? (
						<button
							type="button"
							onClick={resetCountDown}
							className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
						>
							Abandonar Ciclo <img src="icons/close-icon.svg" alt="close" />
							<div
								style={{ width: "100%" }}
								className={styles.progressCountDown}
							></div>
						</button>
					) : (
						<button
							type="button"
							onClick={startCountDown}
							className={styles.countDownButton}
						>
							Iniciar um ciclo <img src="icons/play_arrow.svg" alt="play" />
						</button>
					)}
				</>
			)}
		</div>
	);
}
