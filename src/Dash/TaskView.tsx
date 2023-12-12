import React, {useEffect, useState} from "react";
import ActivityRow from "./ActivityRow";
import {getProxyy} from "../App";

interface IProps {
	setShowNewTask: Function;
}

function TaskView({setShowNewTask}: IProps) {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		updateData();
		// eslint-disable-next-line
	},[]);

	async function updateData() {
		const lsToken = localStorage.getItem("token");

		const response = await fetch(getProxyy() + "/tasks?token=" + lsToken);

		if (response.status === 201) {
			const data = await response.json();
			setTasks(data.tasks[0]);
		} else {
			alert("An error occured on loading your tasks");
		}
	}

	return (
		<div className="card pad-2">
			<h4>Your Tasks</h4>
			<hr />
			<table>
				<thead>
					<tr>
						<td></td>
						<td>Activity</td>
						<td>Duration</td>
						<td>StartDate</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					{tasks.map((task, i) => (
						<ActivityRow key={i} task={task} updateTasks={updateData}></ActivityRow>
					))}
				</tbody>
			</table>

			<div className="table-buttons">
				<button className="btn btn-dark horiz-spacing" onClick={() => setShowNewTask(true)}>
					Add
				</button>
				<button className="btn btn-warning horiz-spacing">Pause</button>
			</div>
		</div>
	);
}

export default TaskView;
