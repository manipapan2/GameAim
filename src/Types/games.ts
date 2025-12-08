import { StaticImageData } from "next/image";

export type GameCategoryType =
	| "Hero Shooter"
	| "First-Person Shooter"
	| "Action-Adventure"
	| "Sandbox / Survival"
	| "Racing";

export type GameType = {
	id: string;
	name: string;
	rate: number;
	price: number;
	category: GameCategoryType;
	description: string;
	image: StaticImageData;
	is_added_to_cart?: boolean;
};

export interface GamesProps {
	games: GameType[];
}

// Optimize: render categories from server
export const categories: GameCategoryType[] = [
	"Hero Shooter",
	"First-Person Shooter",
	"Action-Adventure",
	"Sandbox / Survival",
	"Racing",
];
