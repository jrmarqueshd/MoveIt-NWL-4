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
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../components/Loading";

interface homeProps {
	level: number;
	currentExperience: number;
	challengesCompleted: number;
	userLogin: string;
	userName: string;
	userImage: string;
}

export default function Home(props: homeProps) {
	const [loading, setLoading] = useState(true);

	const router = useRouter();

	useEffect(() => {
		async function isLoggedIn() {
			if (!props.userLogin) {
				await router.push("/auth/login");
			}
			setLoading(false);
		}

		isLoggedIn();
	}, []);

	return (
		<ChallengeProvider {...props}>
			{loading ? (
				<Loading />
			) : (
				<div className={styles.container}>
					<Head>
						<title>Inicio | MoveIt</title>
					</Head>

					<ExperienceBar />

					<CountdownProvider>
						<section>
							<div>
								<Profile
									userImage={props.userImage}
									userName={props.userName}
								/>
								<CompletedChangelles />
								<CountDown />
							</div>
							<div>
								<ChellengeBox />
							</div>
						</section>
					</CountdownProvider>
				</div>
			)}
		</ChallengeProvider>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const {
		level,
		currentExperience,
		challengesCompleted,
		userLogin,
		userName,
		userImage,
	} = ctx.req.cookies;

	return {
		props: {
			level: Number(level),
			currentExperience: Number(currentExperience),
			challengesCompleted: Number(challengesCompleted),
			userLogin: userLogin || null,
			userName: userName || null,
			userImage: userImage || null,
		},
	};
};
