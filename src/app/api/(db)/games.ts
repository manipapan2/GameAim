import type { GameType } from "@/Types/games";
import ValorantImage from "../../../../Public/assets/412354.png";
import Overwatch2Image from "../../../../Public/assets/2841233.png";
import AssasinsCreedImage from "../../../../Public/assets/6275643.png";
import MinecraftImage from "../../../../Public/assets/577753.png";
// import GtaVImage from "../../../../Public/assets/73453454.png";
import ForzaHorizonImage from "../../../../Public/assets/68395442.jpg";
// import AmongUsImage from "../../../../Public/assets/8363534.avif";
import HaloImage from "../../../../Public/assets/6464542.png";

export const games: GameType[] = [
	{
		id: "412354",
		name: "Valorant",
		rate: 3.5,
		price: 0,
		category: "Hero Shooter",
		description:
			"A competitive 5v5 tactical shooter from Riot Games, blending gunplay with unique agent abilities.",
		image: ValorantImage,
	},
	{
		id: "2841233",
		name: "Overwatch2",
		rate: 2.5,
		price: 0,
		category: "Hero Shooter",
		description:
			"A team-based hero shooter featuring a diverse cast and objective-based multiplayer action.",
		image: Overwatch2Image,
	},
	{
		id: "6275643",
		name: "Assassin's Creed",
		rate: 4,
		price: 19.99,
		category: "Action-Adventure",
		description:
			"Step into the Animus and relive the memories of Altair in the original Assassin's Creed.",
		image: AssasinsCreedImage,
	},
	{
		id: "577753",
		name: "Minecraft",
		rate: 4.4,
		price: 29.99,
		category: "Sandbox / Survival",
		description:
			"An open-ended game where you build, explore, and survive in blocky, procedurally-generated worlds.",
		image: MinecraftImage,
	},
	// {
	// 	id: "73453454",
	// 	name: "Grand Theft Auto V",
	// 	rate: 4.4,
	// 	price: 29.99,
	// 	category: "Action / Open World",
	// 	description:
	// 		"Play as three criminals in Los Santos in one of the most expansive open-world games ever.",
	// 	image: GtaVImage,
	// },
	{
		id: "68395442",
		name: "Forza Horizon 5",
		rate: 4.5,
		price: 59.99,
		category: "Racing",
		description:
			"Forza Horizon 5 is a racing video game set in an open world environment based in a fictional representation of Mexico. The game has the largest map in the entire Forza Horizon series, being 50% larger than its predecessor, Forza Horizon 4, while also having the highest point in the Horizon series.",
		image: ForzaHorizonImage,
	},
	// {
	// 	id: "8363534",
	// 	name: "Among Us",
	// 	rate: 3.4,
	// 	price: 4.99,
	// 	category: "Social Deduction",
	// 	description:
	// 		"Among Us is a cartoon-like strategy game that can be played on a variety of PC, mobile and console devices. Based on teamwork and betrayal, players are either 'crewmates' or 'imposters'. Crewmates try to accomplish their tasks, while imposters try to sabotage these missions and murder other crewmates.",
	// 	image: AmongUsImage,
	// },
	{
		id: "6464542",
		name: "Halo: Combat Evolved",
		rate: 4.3,
		price: 9.99,
		category: "First-Person Shooter",
		description:
			"Master Chief begins his fight against the Covenant in this sci-fi FPS classic.",
		image: HaloImage,
	},
];
