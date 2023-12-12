import React, {useState} from "react";
import {ITask, getEnumValueFromString} from "../types";
import ActionBtn from "./ActionBtn";
import {getProxyy} from "../App";
import {statusStrings} from "../types";
import TaskEditor from "./TaskEditor";
interface IProps {
	updateTasks: () => Promise<void>;
	task: ITask;
}

function ActivityRow({updateTasks, task}: IProps) {
	const [showEdit, setShowEdit] = useState(false);

	const statusValue = getEnumValueFromString(task.status);

	const date = new Date(task.startDate);

	const dateString = date.toTimeString().slice(0, 5) + " " + date.toLocaleDateString();
	
	async function deleteTask() {
		const lsToken = localStorage.getItem("token");

		const options = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({token: lsToken, taskId: task.id}),
		};

		const response = await fetch(getProxyy() + "/tasks", options);

		if (response.status !== 201) {
			const error = (await response.json()).err;
			alert(response.status + " - " + error);
		}

		updateTasks();
	}

	async function nextStatus() {
		const lsToken = localStorage.getItem("token");

		//Stauts computation
		const indexOfCurrentStatus = statusStrings.indexOf(task.status);
		const indexOfNextStatus = !(indexOfCurrentStatus + 1 < statusStrings.length) ? 0 : indexOfCurrentStatus + 1;

		const options = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({token: lsToken, taskId: task.id, status: statusStrings[indexOfNextStatus]}),
		};

		const response = await fetch(getProxyy() + "/tasks", options);

		if (response.status !== 201) {
			alert(response.status);
		}

		updateTasks();
	}

	return (
		<>
			{showEdit && (
				<tr>
					<td>
						<TaskEditor setShow={setShowEdit} createMode={false} task={task} />
					</td>
				</tr>
			)}

			<tr>
				<td>
					<ActionBtn nextStatus={nextStatus} actionStatus={statusValue!}></ActionBtn>
				</td>
				<td>{task.name}</td>
				<td>{task.duration}</td>
				<td>{dateString}</td>
				<td>
					<button className="btn" onClick={() => {setShowEdit(true)}}>
						<i className="bi bi-pencil-square"></i>
					</button>

					<button className="btn" onClick={deleteTask}>
						<i className="bi bi-x-circle"></i>
					</button>
				</td>
			</tr>
		</>
	);
}

export default ActivityRow;
