import React, {useEffect, useState} from "react";
import ActivityRow from "./TaskView/ActivityRow";
import {getProxyy} from "../App";
import PomTimer from "./Pomodoro/PomTimer";

interface IProps {
	setShowNewTask: Function;
}

function TaskView({setShowNewTask}: IProps) {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		updateData();
		// eslint-disable-next-line
	}, []);

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
			<div className="row">
				<div className="col-lg-6">
					<h2>Your Tasks</h2>
					<hr />
				</div>
				<div className="col-lg-6">
					<PomTimer></PomTimer>
				</div>
			</div>
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
