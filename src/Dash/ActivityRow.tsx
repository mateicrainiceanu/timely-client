import React from "react";
import {Stats} from "../types";
import ActionBtn from "./ActionBtn";

interface IProps {
	currentStatus: Stats;
}

function ActivityRow(props: IProps) {
	return (
		<tr>
			<td>
				<ActionBtn actionStatus={props.currentStatus}></ActionBtn>
			</td>
			<td>Name</td>
			<td>2h</td>
			<td>15:45</td>
			<td>
				<button className="btn">
					<i className="bi bi-pencil-square"></i>
				</button>
			</td>
		</tr>
	);
}

export default ActivityRow;
