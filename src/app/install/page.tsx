"use client";
import Button from "@/Components/UI/Button";
import { ReactElement, useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa6";
import { MdDownloadForOffline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setIsAppInstalled } from "@/Hooks/Redux/appStateSlice";
import { useRouter } from "next/navigation";
import Spinner from "@/Components/UI/Spinner";

export default function Download(): ReactElement {
	const dispatch = useDispatch();
	const router = useRouter();

	const installApp = async () => {
		if (!installPrompt) {
			return;
		}
		const result = await installPrompt.prompt();
		if (result.outcome == "accepted") {
			dispatch(setIsAppInstalled(true));
			router.push("/");
		}

		disableInAppInstallPrompt();
	};

	function disableInAppInstallPrompt() {
		setInstallPrompt(null);
	}
	const [installPrompt, setInstallPrompt] = useState<
		undefined | null | any
	>(undefined);
	useEffect(() => {
		const beforeInstall = (event: Event) => {
			event.preventDefault();
			setInstallPrompt(event);
		};

		window.addEventListener("beforeinstallprompt", beforeInstall);

		// Interesting: below code will ruin the install process
		// return window.removeEventListener("beforeinstallprompt", beforeInstall);
	}, []);

	return (
		<div className="w-full">
			{/* <div className=" w-2/3 lg:w-auto lg:h-2/3 bg-red-600 aspect-square m-auto mt-5 mb-5"></div> */}
			{/* <Button className="mt-5" Icon={<FaDownload />}>Download</Button> */}

			<div className="bg-(--color-accent) flex w-full flex-col rounded-sm p-4 md:flex-row">
				{installPrompt == undefined ? (
					<div className="w-full h-full p-4 flex justify-center items-center">
						<Spinner/>
					</div>
				) : (
					<>
						<div>
							<MdDownloadForOffline
								size={90}
								className="m-auto text-white"
							/>
						</div>
						<Button
							className="mb-auto mt-5 md:ml-auto md:mt-auto md:h-14 md:max-w-64"
							Icon={<FaDownload />}
							onClick={installApp}
						>
							Install
						</Button>
					</>
				)}
			</div>
		</div>
	);
}
