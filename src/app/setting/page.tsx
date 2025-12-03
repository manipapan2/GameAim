"use client";
import Button from "@/Components/UI/Button";
import Title from "@/Components/UI/Title";
import { Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { BsCameraVideoFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";

type PermissionType = "default" | "granted" | "denied" | null | "not supported";

const Setting: React.FC = () => {
	const [notificationState, setNotificationState] =
		useState<PermissionType>();
	const [geolocationState, setGeolocationState] = useState<PermissionType>();
	const [cameraState, setCameraState] = useState<PermissionType>();

	const request_notification_permission = () => {
		if (!("Notification" in window)) {
			return;
		}
		if (Notification.permission === "default") {
			Notification.requestPermission().then(() =>
				setNotificationState("granted"),
			);
		} else if (Notification.permission === "denied") {
			alert("denied");
		}
	};

	const request_camera_permission = () => {
		// if (!("Notification" in window)) {
		// 	return;
		// }
		// if (Notification.permission === "default") {
		// 	Notification.requestPermission().then(() =>
		// 		setNotificationState("granted"),
		// 	);
		// } else if (Notification.permission === "denied") {
		// 	alert("denied");
		// 	setNotificationState("denied");
		// }

		// if (!("camera" in window)) {
		// 	return;
		// }

		navigator.permissions.query({ name: "camera" }).then((result) => {
			if (result.state == "prompt") {
				console.log("camea is default");
				navigator.mediaDevices
					.getUserMedia({ video: true })
					.then(() => setCameraState("granted"));
			} else if (result.state == "denied") {
				alert("denied");
			}
		});
	};

	const request_geolocation_permission = () => {
		if (!navigator.geolocation) {
			return;
		}
		navigator.permissions.query({ name: "geolocation" }).then((result) => {
			if (result.state == "prompt") {
				// bug
				navigator.geolocation.getCurrentPosition(
					() => {
						setGeolocationState("granted");
						console.log("geo granted");
					},
					() => setGeolocationState("denied"),
				);
			} else if (result.state == "denied") {
				alert("denied");
			}
		});
	};

	useEffect(() => {
		if ("Notification" in window) {
			if (Notification.permission == "default") {
				setNotificationState("default");
			} else if (Notification.permission == "granted") {
				setNotificationState("granted");
			} else {
				setNotificationState("denied");
			}
		} else {
			setNotificationState("not supported");
		}

		// bug
		// if ("geolocation" in navigator) {
		navigator.permissions.query({ name: "geolocation" }).then((result) => {
			if (result.state == "prompt") {
				setGeolocationState("default");
			} else if (result.state == "granted") {
				setGeolocationState("granted");
			} else {
				setGeolocationState("default");
			}
		});
		// } else {
		// 	setGeolocationState("not supported");
		// }

		navigator.permissions.query({ name: "camera" }).then((result) => {
			if (result.state == "prompt") {
				setCameraState("default");
			} else if (result.state == "granted") {
				setCameraState("granted");
			} else {
				setCameraState("default");
			}
		});
	}, []);

	return (
		<div>
			<Title Text="Permisions" />
			{/* optimize  - make a loading for buttons or rows */}
			<div className="rounded-sm bg-[var(--color-accent)]">
				{notificationState != "not supported" && (
					<SettingOption
						IsActive={notificationState == "granted"}
						Icon={<IoMdNotifications size={30} />}
						Text={"Notification"}
						onClick={() => request_notification_permission()}
					/>
				)}
				{cameraState != "not supported" && (
					<SettingOption
						IsActive={cameraState == "granted"}
						Icon={<BsCameraVideoFill size={30} />}
						Text={"Camera"}
						onClick={() => request_camera_permission()}
					/>
				)}

				{geolocationState != "not supported" && (
					<SettingOption
						IsActive={geolocationState == "granted"}
						Icon={<FaLocationDot size={30} />}
						Text={"Location"}
						onClick={() => request_geolocation_permission()}
					/>
				)}
			</div>
		</div>
	);
};

interface SettingOptionProps {
	Icon: ReactNode;
	Text: string;
	IsActive: boolean;
	onClick: () => any;
}

export const SettingOption = ({
	Icon,
	Text,
	IsActive,
	onClick,
}: SettingOptionProps) => {
	return (
		<div className="flex min-h-[6.5rem] flex-col items-center justify-between border-[1px] border-l-0 border-r-0 border-t-0 border-solid border-slate-500 p-3 pb-7 pt-7 last:border-b-0 md:flex-row">
			<div className="flex w-full items-center justify-start md:w-auto md:justify-normal">
				<i
					className="mr-3"
					style={{
						color: IsActive ? "var(--color-primary)" : "gray",
					}}
				>
					{Icon}
				</i>
				<Typography className="text-white">
					{Text} {IsActive ? "is active" : "is not active"}
				</Typography>
			</div>

			{!IsActive && (
				<div className="h-full w-full md:w-52">
					<Button
						className={`mt-4 max-h-full min-h-full w-full min-w-52 p-3 pb-2 pt-2 text-white md:mt-0`}
						onClick={() => onClick()}
					>
						Enable {Text}
					</Button>
				</div>
			)}
		</div>
	);
};

export default Setting;
