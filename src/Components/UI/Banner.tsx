import ImageSlider from "./ImageSlider";
import { Typography } from "@mui/material";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import Button from "./Button";
import Link from "next/link";
import MinecraftLogo from '../../../public/assets/MinecraftLogo.png'
import ForzaLogo from '../../../public/assets/ForzaLogo.webp'
import PubgLogo from '../../../public/assets/PubgLogo.png'

export default function Banner() {
	return (
		<div className="mb-10 flex w-full p-4 flex-col-reverse items-center justify-around rounded-md bg-(--CardColor) lg:flex-row">
			<div className="p-6">
				<Typography
					variant="h4"
					sx={{
						marginBottom: "1.25rem",
						fontSize: {xs: "2rem", sm: "2.5rem"},
						color: "white",

					}}
				>
					Find <span className="text-(--color-primary)">Whatever</span>{" "}
					suits <br /> you best &{" "}
					<span className="text-(--color-primary)">Play</span>
				</Typography>
				{/* <Typography sx={{
					marginBottom: "1rem",
					color: "white",
					opacity: "40%"
				}}>
					Enjoy And Install!
				</Typography> */}
				<Link href={"/games"}>
					<Button Icon={<VideogameAssetIcon/>}>
						View Games
					</Button>
				</Link>
			</div>
			<ImageSlider
				images={[MinecraftLogo, PubgLogo, ForzaLogo]}
			/>
		</div>
	);
}
