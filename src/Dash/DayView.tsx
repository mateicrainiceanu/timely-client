import React from "react";
import ActivityRow from "./ActivityRow";
import {Stats} from "../types";

function DayView() {
	return (
		<div className="card pad-2">
			<h4>Your day</h4>
			<hr />
			<table>
				<thead>
					<tr>
						<td></td>
						<td>Activity</td>
						<td>Duration</td>
						<td>Est. end</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					<ActivityRow currentStatus={Stats.NotStarted}></ActivityRow>
				</tbody>
			</table>
		</div>
	);
}

export default DayView;
