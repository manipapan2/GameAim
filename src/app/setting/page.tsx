"use client";
import Button from "@/Components/UI/Button";
import Title from "@/Components/UI/Title";
import { Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { BsCameraVideoFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";

type PermissionType = "default" | "granted" | "denied" | null | "not supported";

const notify = (text: string) => toast.error(text);

const Setting: React.FC = () => {
	const [notificationState, setNotificationState] =
		useState<PermissionType>();
	const [cameraState, setCameraState] = useState<PermissionType>();

	const request_notification_permission = () => {
		if (!("Notification" in window)) {
			return;
		}
		if (Notification.permission === "default") {
			Notification.requestPermission().then((res) => {
				if (res == "granted") setNotificationState("granted");
				else notify("Notification permission has been blocked");
			});
		} else if (Notification.permission === "denied") {
			notify("Notification permission has been blocked");
		}
	};

	const request_camera_permission = () => {
		navigator.permissions.query({ name: "camera" }).then((result) => {
			if (result.state == "prompt") {
				console.log("camea is default");
				navigator.mediaDevices
					.getUserMedia({ video: true })
					.then(() => setCameraState("granted"));
			} else if (result.state == "denied") {
				notify("Camera permission has been blocked");
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
			<div className="bg-(--color-accent) rounded-sm">
				<Toaster />
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
		<div className="flex min-h-26 flex-col items-center justify-between border border-l-0 border-r-0 border-t-0 border-solid border-slate-500 p-3 pb-7 pt-7 last:border-b-0 md:flex-row">
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
