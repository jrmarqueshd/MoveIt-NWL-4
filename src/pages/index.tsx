import Head from "next/head";
import { CountdownProvider } from "../context/countdown-context";
import { ChallengeProvider } from "../context/context-challenge";
import { GetServerSideProps } from "next";

import ChellengeBox from "../components/ChellengeBox";
import CompletedChangelles from "../components/CompletedChangelles";
import CountDown from "../components/CountDown";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";

import styles from "../styles/pages/Home.module.css";

interface homeProps {
	level: number;
	currentExperience: number;
	challengesCompleted: number;
}

export default function Home(props: homeProps) {
	return (
		<ChallengeProvider {...props}>
			<div className={styles.container}>
				<Head>
					<title>Inicio | MoveIt</title>
				</Head>

				<ExperienceBar />

				<CountdownProvider>
					<section>
						<div>
							<Profile />
							<CompletedChangelles />
							<CountDown />
						</div>
						<div>
							<ChellengeBox />
						</div>
					</section>
				</CountdownProvider>
			</div>
		</ChallengeProvider>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

	return {
		props: {
			level: Number(level),
			currentExperience: Number(currentExperience),
			challengesCompleted: Number(challengesCompleted),
		},
	};
};
