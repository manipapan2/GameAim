"use client";
import Button from "@/Components/UI/Button";
import { ReactElement, useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa6";
import { MdDownloadForOffline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setIsAppInstalled } from "@/Hooks/Redux/appStateSlice";
import { useRouter } from "next/navigation";

export default function Download(): ReactElement {
	const dispatch = useDispatch();
	const router = useRouter();

	const installApp = async () => {
		if (!installPrompt) {
			return;
		}
		const result = await installPrompt.prompt();
		console.log(`Install prompt was: ${result.outcome}`);
		if (result.outcome == "accepted") {
			dispatch(setIsAppInstalled(true));
			router.push("/");
		}

		disableInAppInstallPrompt();
	};

	function disableInAppInstallPrompt() {
		setInstallPrompt(null);
	}
	const [installPrompt, setInstallPrompt] = useState<any>(null);
	useEffect(() => {
		const beforeInstall = (event: Event) => {
			event.preventDefault();
			setInstallPrompt(event);
		};

		window.addEventListener("beforeinstallprompt", beforeInstall);

		return window.removeEventListener("beforeinstallprompt", beforeInstall);
	}, []);

	return (
		<div className="w-full">
			{/* <div className=" w-2/3 lg:w-auto lg:h-2/3 bg-red-600 aspect-square m-auto mt-5 mb-5"></div> */}
			{/* <Button className="mt-5" Icon={<FaDownload />}>Download</Button> */}

			<div className="bg-(--color-accent) w-full rounded-sm p-4 flex flex-col md:flex-row">
				<div>
					<MdDownloadForOffline
						size={90}
						className="m-auto text-white"
					/>
				</div>
				<Button
					className="mt-5 md:mt-auto mb-auto md:h-14 md:max-w-64 md:ml-auto"
					Icon={<FaDownload />}
					onClick={installApp}
				>
					Install
				</Button>
			</div>
		</div>
	);
}
