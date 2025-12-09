import { Metadata } from "next";
import Games from "./games";
import { categories } from "@/Types/games";

export const metadata: Metadata = {
	title: "Games",
	description: "Browse games",
};

async function getGames(params: any) {
	const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
	let requestURL: string = `${BACKEND_URL}/api/games?`;

	const serchParams = await params.searchParams;
	const {
		searchName,
		category,
		rate,
	}: { searchName: string; category: string; rate: string } =
		serchParams

	if (searchName) {
		requestURL += `search_name=${searchName}&`;
	}
	if (category) {
		requestURL += `category=${category}&`;
	}
	if (rate) {
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

	return <Games games={games} categories={categories} />;
}
