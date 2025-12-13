"use client";
import Button from "@/Components/UI/Button";
import { useEffect, useState } from "react";
import GameCarousel from "./GameCarousel/GameCarousel";
import FixedGameCarousel from "./FixedGameCarousel/FixedGameCarousel";
import { GameType } from "@/Types/games";
import Image, { StaticImageData } from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosRemoveCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addGame, removeGame } from "@/Hooks/Redux/cartSlice";
import ValorantImage from "../../../../public/assets/412354.png";
import OverwatchImage from "../../../../public/assets/2841233.png";
import MinecraftImage from "../../../../public/assets/577753.png";
import HaloImage from "../../../../public/assets/6464542.png";
import ForzaImage from "../../../../public/assets/68395442.jpg";
import { closePanel } from "@/Hooks/Redux/panelSlice";
import { RootState } from "@/Hooks/Redux/store";

const Game = ({ game }: { game: GameType }) => {
	const gameIdsInCart = useSelector((state: RootState) => state.cart.game_ids)
	const [scrollPercentage, setScrollPercentage] = useState<number>(0);
	const [imageScale, setImageScale] = useState<number>(1);
	const [isFixedGameCarouselOpen, setIsFixedGameCarouselOpen] =
		useState<boolean>(false);
	const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);
	const [isGameAddedToCart, setIsGameAddedToCart] = useState<boolean | undefined>(gameIdsInCart.includes(game.id));
	const [isPending, setIsPending] = useState<boolean>(false);
	const BACKEND_URL = process.env.NEXT_pUBLIC_BACKEND_URL;
	const dispatch = useDispatch();
	const mockImages: StaticImageData[] = [
		ValorantImage,
		OverwatchImage,
		MinecraftImage,
		HaloImage,
		ForzaImage,
	];

	// useEffect(() => {
	//   if(isFixedGameCarouselOpen) dispatch(closePanel())
	// }, [isFixedGameCarouselOpen])

	const notify_add_success = () =>
		toast.success(`${game.name} successfuly added to cart!`, {
			style: {
				color: "white",
				backgroundColor: "var(--color-primary)",
				border: "2px solid white",
			},
		});

	const notify_remove_success = () =>
		toast.success(`${game.name} successfuly removed from cart!`, {
			style: {
				color: "white",
				backgroundColor: "var(--color-primary)",
				border: "2px solid white",
			},
			icon: "🗑️",
		});

	const notify_error = () =>
		toast.error("Something went wrong", {
			style: {
				color: "white",
				backgroundColor: "oklch(63.7% 0.237 25.331)",
				border: "2px solid white",
			},
		});

	const addGameToCart = () => {
		setIsPending(true);
		setTimeout(() => {
			setIsGameAddedToCart(true);
			dispatch(addGame(game.id));
			notify_add_success();
			setIsPending(false);
		}, 1300);
	};
	const removeGameFromCart = () => {
		setIsPending(true);

		setTimeout(() => {
			setIsGameAddedToCart(false);
			dispatch(removeGame(game.id));
			notify_remove_success();
			setIsPending(false);
		}, 1300);
	};

	useEffect(() => {
		const pageContainer = document.getElementById("single-game-page");
		const parentPageContainer = pageContainer?.parentNode as HTMLElement;

		if (pageContainer && parentPageContainer) {
			parentPageContainer.addEventListener("scroll", (e: Event) =>
				setImageScale(() => {
					const scrollValue: number = (e.target as HTMLElement)
						.scrollTop;
					const scrollPercentageValue: number =
						(scrollValue * 100) /
						(parentPageContainer.scrollHeight -
							parentPageContainer.clientHeight);
					const maximumScale: number = 1.4;
					const scaleDifferece: number =
						(scrollPercentageValue * maximumScale) / 100;

					setScrollPercentage(scrollPercentageValue);

					return 1 + scaleDifferece;
				}),
			);
		}


		
	}, []);

	return (
		<div id="single-game-page" className="bg-(--color-accent) rounded-md">
			<Toaster />
			<div
				className="z-100 fixed left-0 top-0 flex h-full w-full items-center justify-center bg-indigo-600/10 text-white backdrop-blur-lg transition-all"
				style={{
					opacity: isFixedGameCarouselOpen ? "1" : "0",
					pointerEvents: isFixedGameCarouselOpen ? "auto" : "none",
				}}
			>
				<FixedGameCarousel
					images={mockImages}
					selectedSlideIndex={selectedSlideIndex}
					disabled={!isFixedGameCarouselOpen}
					onClose={() => {
						setIsFixedGameCarouselOpen((prev) => !prev);
					}}
				/>
			</div>

			<div className="pointer-events-none! aspect-16/8 md:aspect-16/4 relative w-full overflow-hidden rounded-t-md">
				{/* For optimization change scale to background size */}
				<Image
					src={game.image.src}
					className="max-h-full w-full select-none rounded-t-md object-cover"
					alt="test"
					width={game.image.width}
					height={game.image.height}
					blurDataURL={game.image.blurDataURL}
					style={{
						transform: `scale(${imageScale})`,
						opacity: `${1 - scrollPercentage / 100}`,
					}}
				/>
			</div>
			<div className="w-full p-2">
				<div className="flex h-fit w-full flex-col items-center justify-between p-2 text-white backdrop-blur-[3px] md:flex-row">
					<div className="w-full">
						<h1 className="text-3xl md:text-4xl">{game.name}</h1>
						<h2 className="mt-2 text-slate-500">{game.category}</h2>
					</div>
					<div className="mt-2 w-full md:mt-0 md:w-fit md:min-w-80">
						<Button
							Icon={
								isGameAddedToCart ? (
									<IoIosRemoveCircle />
								) : (
									<IoIosAddCircle />
								)
							}
							onClick={() => {
								if (isGameAddedToCart) removeGameFromCart();
								else addGameToCart();
							}}
							isLoading={isPending}
							className={`${isGameAddedToCart && "bg-red-600"}`}
						>
							{isGameAddedToCart
								? "Remove from cart"
								: "Add to cart"}
						</Button>
					</div>
				</div>
				<h2 className="text-(--color-primary) mb-3 mt-4 text-2xl">
					Description
				</h2>
				<p className="text-white">{game.description}</p>

				<div>
					<h2 className="text-(--color-primary) mb-3 mt-4 text-2xl">
						Images
					</h2>
					<GameCarousel
						images={mockImages}
						onClickEach={(index: number) => {
							setSelectedSlideIndex(index);
							setIsFixedGameCarouselOpen(true);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Game;
