"use client";
import GameCard from "@/Components/UI/GameCard/GameCard";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import SelectComp, { OptionsProps } from "@/Components/UI/Select";
import { FaSearch } from "react-icons/fa";
import { GameCategoryType, GamesProps, GameType } from "@/Types/games";
import { Typography } from "@mui/material";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "@/Components/UI/Spinner";

export default function Games({
	games,
	categories,
}: {
	games: GamesProps;
	categories: GameCategoryType[];
}) {
	type rateNumberRange = "1" | "2" | "3" | "4";
	const [category, setCategory] = useState<undefined | GameCategoryType | "">(
		undefined,
	);
	const [rate, setRate] = useState<undefined | "" | rateNumberRange>(
		undefined,
	);
	const [searchName, setSearchName] = useState<undefined | "" | string>(
		undefined
	);

	const [searchInputValue, setSearchInputValue] = useState<"" | string>()
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	// optimize type from any to ...
	const [categoryObject, setCategoryObject] = useState<undefined | any>(
		undefined,
	);

	const rate_list: rateNumberRange[] = ["1", "2", "3", "4"];

	const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

	const {
		data,
		mutate: mutateGames,
		isPending,
	} = useMutation({
		mutationFn: () => {
			return axios
				.get(`${BACKEND_URL}/api/games`, {
					params: {
						...(rate && { rate: rate }),
						...(category && { category: category }),
						...(searchName && { search_name: searchName })
					},
				})
				.then((res) => {
					console.log('data:', res.data)
					return res.data;
				})
				.catch((err) => console.log("error:", err));
		},
	});

	useEffect(() => {
		const rateParam = searchParams.get("rate");
		if (rateParam && rate_list?.includes(rateParam as rateNumberRange)) {
			setRate(rateParam as rateNumberRange);
		} else {
			setRate("");
		}

		const categoryParam = searchParams.get("category");
		if (
			categoryParam &&
			categories?.includes(categoryParam as GameCategoryType)
		) {
			setCategory(categoryParam as GameCategoryType);
		} else {
			setCategory("");
		}

		const searchNameParam = searchParams.get("search_name");
		if (
			searchNameParam
		) {
			setSearchName(searchNameParam);
			setSearchInputValue(searchNameParam);
		} else {
			setSearchName("");
			setSearchInputValue("")
		}
	}, []);

	// bug use memo instead
	useEffect(() => {
		let rateParam = searchParams.get("rate");
		rateParam = rateParam == null ? "" : rateParam;

		if (rate != undefined && rate != rateParam) {
			const nextSearchParams = new URLSearchParams(
				searchParams.toString(),
			);

			if (rateParam) {
				if (rate == "") {
					nextSearchParams.delete("rate");
				} else {
					nextSearchParams.delete("rate");
					nextSearchParams.append("rate", rate);
				}

				router.replace(`${pathname}?${nextSearchParams}`);
			} else {
				if (rate != "") {
					nextSearchParams.append("rate", rate);
					router.replace(`${pathname}?${nextSearchParams}`);
				}
			}

			mutateGames();
		}
	}, [rate]);

	useEffect(() => {
		const categoryParam = searchParams.get("category");

		if (category != undefined && category != categoryParam) {
			const nextSearchParams = new URLSearchParams(
				searchParams.toString(),
			);

			if (categoryParam) {
				if (category == "") {
					nextSearchParams.delete("category");
				} else {
					nextSearchParams.delete("category");
					nextSearchParams.append("category", category);
				}

				router.replace(`${pathname}?${nextSearchParams}`);
			} else {
				if (category != "") {
					nextSearchParams.append("category", category);
					router.replace(`${pathname}?${nextSearchParams}`);
				}
			}

			mutateGames();
		}
	}, [category]);

	useEffect(() => {
		const nameParam = searchParams.get("name");

		if (name != undefined && name != nameParam) {
			const nextSearchParams = new URLSearchParams(
				searchParams.toString(),
			);

			if (nameParam) {
				if (name == "") {
					nextSearchParams.delete("name");
				} else {
					nextSearchParams.delete("name");
					nextSearchParams.append("name", name);
				}

				router.replace(`${pathname}?${nextSearchParams}`);
			} else {
				if (name != "") {
					nextSearchParams.append("name", name);
					router.replace(`${pathname}?${nextSearchParams}`);
				}
			}

			mutateGames();
		}
	}, [searchName]);

	useEffect(() => {
		if (categories) {
			setCategoryObject(() => {
				let changedCategory: OptionsProps[] = new Array();

				for (let index = 0; index < categories.length; index++) {
					const element = categories[index];
					changedCategory.push({ text: element, value: element });
				}

				return changedCategory;
			});
		}
	}, [categories]);
	

	return (
		<>
		
			<div className="relative z-50 flex w-full flex-col items-center justify-between p-1 md:flex-row">
				<div className="relative m-2 h-10 w-full flex-1 md:max-w-80">
					<i className="absolute left-3 top-[50%] translate-y-[-50%] text-[var(--color-primary)]">
						<FaSearch size={15} />
					</i>
					{/* optimize - make input disabled when page not fully loaded */}
					<input
						type="text"
						className="h-full w-full rounded-md bg-[var(--color-card)] p-3 pl-9 text-white outline-none transition-all focus:outline-[var(--color-primary)]"
						placeholder="Search..."
						onChange={(e) => setSearchInputValue(e.target.value)}
						onKeyUp={(e) => setSearchName(e.target.value)}
						value={searchInputValue}
					/>
				</div>
				<div className="mt-2 flex w-full justify-between md:mt-0 md:w-fit">
					<div className="mr-4 w-full md:w-32">
						{category != undefined &&
							categoryObject != undefined && (
								<SelectComp
									value={category}
									label="Category"
									Options={categoryObject}
									onChange={(e) =>
										setCategory(e.target.value)
									}
								/>
							)}
					</div>

					<div className="w-full md:w-32">
						{rate != undefined && (
							<SelectComp
								label="Rate"
								value={rate}
								Options={[
									{
										text: "Rate > 1",
										value: 1,
									},
									{
										text: "Rate > 2",
										value: 2,
									},
									{
										text: "Rate > 3",
										value: 3,
									},
									{
										text: "Rate > 4",
										value: 4,
									},
								]}
								onChange={(e) => setRate(e.target.value)}
							/>
						)}
					</div>
				</div>
			</div>
			{/* {Array.isArray(games) && games.length > 0 ? ( */}
				{isPending ? (
					<div className="flex w-full flex-grow items-center justify-center"><Spinner/></div>
				) : Array.isArray(data) && data.length > 0 ? (
					<div className="flex w-full flex-wrap justify-around flex-grow">
					{data.map((game: GameType) => (
						<GameCard
							key={game.id}
							Id={game.id}
							Name={game.name}
							ImageSrc={`/assets/${game.id}.png`}
							Rate={game.rate}
							Price={game.price}
							Category={game.category}
						/>
					))}
					</div>
				) :
				Array.isArray(data) && data.length == 0 ? (
					<NoGameFound />
				) : Array.isArray(games) && games.length > 0 ? (
					<div className="flex w-full flex-wrap justify-around">
					{games.map((game: GameType) => (
						<GameCard
							key={game.id}
							Id={game.id}
							Name={game.name}
							ImageSrc={`/assets/${game.id}.png`}
							Rate={game.rate}
							Price={game.price}
							Category={game.category}
						/>
						
					))}
					</div>
				) : (
					Array.isArray(games) && games.length == 0 && <NoGameFound />
				)}
		</>
	);
}

export const NoGameFound = (): ReactElement => {
	return (
		// fix style and height

		<div className="flex w-full flex-grow items-center justify-center text-white">
			<Typography variant="h1" sx={{fontSize: "2rem"}}>No game found</Typography>
		</div>
	);
};
