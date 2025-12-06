"use client";
import "@/styles/globals.css";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import { IoIosStar } from "react-icons/io";
import Link from "next/link";

interface GameCardProps {
	Name: string;
	Rate: number;
	Price: number;
	image: StaticImageData;
	Category: string;
}

export default function GameCard({
	Name,
	image,
	Rate,
	Price,
	Category,
}: GameCardProps) {
	return (
		<Link
			href={`/games/${Name}`}
			className="relative z-10 m-5 flex h-fit w-full flex-col rounded-lg bg-(--CardColor) outline-3 outline-solid outline-offset-8 outline-transparent transition-all hover:outline-offset-0 hover:outline-white md:h-60 md:w-64"
		>
			<div className="relative aspect-video w-full">
				<Image
					src={image.src}
					alt={`${Name} Image`}
					className="h-full w-full rounded-tl-lg rounded-tr-lg object-cover"
					width={image.width}
					height={image.height}
					blurDataURL={image.blurDataURL}
				/>
			</div>

			<div className="flex grow flex-col justify-between rounded-bl-lg rounded-br-lg p-3">
				<div className="mb-4 flex justify-between lg:mb-0">
					<Typography color="white" className="truncate text-lg">
						{Name}
					</Typography>
					<div className="ml-2 flex items-center">
						<IoIosStar
							className="mr-2.5 text-xl"
							color="yellow"
						/>
						<Typography variant="subtitle1" color="white">
							{Rate}
						</Typography>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<Typography color="gray">{Category}</Typography>

					<Typography color="white">
						{Price === 0 ? "Free" : `${Price}$`}
					</Typography>
				</div>
			</div>
		</Link>
	);
}
