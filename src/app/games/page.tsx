// import GameCard from "@/Components/UI/GameCard/GameCard";
import { Metadata } from "next";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
import Games from "./games";

export const metadata: Metadata = {
	title: "Games",
	description: "Browse games",
};

async function getGames(params: any) {
	const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
	let requestURL: string = `${BACKEND_URL}/api/games?`;
	const searchName: string = params.searchParams?.searchName;
	const category: string = params.searchParams?.category;
	const rate: string = params.searchParams?.rate;

	if (params.searchParams?.searchName) {
		requestURL += `search_name=${searchName}&`;
	}
	if (params.searchParams?.category) {
		requestURL += `category=${category}&`;
	}
	if (params.searchParams?.rate) {
		requestURL += `rate=${rate}`;
	}

	const res = await fetch(requestURL, {
		cache: "no-store",
	});
	const data = await res.json();
	return data;
}

export default async function GamesPage(params: any) {
	const games = await getGames(params);

	return (
		<Games
			games={games}
			categories={["Hero Shooter", "First-Person Shooter"]}
		/>
	);
}
