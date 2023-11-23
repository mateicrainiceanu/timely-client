import {Stats} from "../types";
import React, {useEffect, useState} from "react";

interface IBtnProps {
	actionStatus: Stats;
}

function ActionBtn(props: IBtnProps) {
	const [btnProps, setBtnProps] = useState({color: "white", text: ""});

	useEffect(() => {
		switch (props.actionStatus) {
			case Stats.NotStarted:
				setBtnProps({color: "lightgreen", text: "Start"});
				break;
			case Stats.InProgress:
				setBtnProps({color: "red", text: "End"});
				break;
			case Stats.Finished:
				setBtnProps({color: "green", text: "Finished"});
				break;
			default:
				setBtnProps({color: "White", text: "ERROR"});
				break;
		}
	}, [props.actionStatus]);

	return (
		<button className="btn" style={{backgroundColor: btnProps.color}}>
			{btnProps.text}
		</button>
	);
}

export default ActionBtn;