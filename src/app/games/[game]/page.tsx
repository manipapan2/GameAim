'server-only'
import Game from "./game";
import { GameType } from "@/Types/games";

export const dynamic = 'force-dynamic'
// export const fetchCache = 'only-no-store'


async function getGame(seachParams: any) {
	const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
	let requestURL: string = `${BACKEND_URL}/api/games`

	const params = await seachParams
	const gameName = params.params.game
	
	if(gameName) {
		requestURL += `?name=${gameName}`
	}

	const res = await fetch(requestURL, {
		// cache: "no-store",
	});

	const data = await res.json();
	return data;
}


export default async function GamesPage(params: any) {
	const game: GameType = await getGame(params);

	console.log('game:', game)

	return (
		<Game game={game} />
	);
}
