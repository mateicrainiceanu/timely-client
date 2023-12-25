import React, {useState, SetStateAction, Dispatch} from "react";
import {ITask, getEnumValueFromString} from "../../../types";
import ActionBtn from "./ActionBtn";
import {getProxyy} from "../../../App";
import {statusStrings} from "../../../types";
import TaskEditor from "./TaskEditor";

interface IProps {
	updateTasks: () => Promise<void>;
	task: ITask;
	setChangeOrders: Dispatch<SetStateAction<{firstId: number; secondId: number; ready: boolean}>>;
}

function ActivityRow({updateTasks, task, setChangeOrders}: IProps) {
	const [showEdit, setShowEdit] = useState(false);

	const statusValue = getEnumValueFromString(task.status);

	const date = new Date(task.startDate);

	// const dateString = date.toTimeString().slice(0, 5) + " " + date.toLocaleDateString().slice(0, 10);

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

			<td id={String(task.id)}>
				<i id={String(task.id)} className="bi bi-arrows-expand"></i>
			</td>
			<td id={String(task.id)}>
				<ActionBtn nextStatus={nextStatus} actionStatus={statusValue!}></ActionBtn>
			</td>
			<td id={String(task.id)}>{task.name}</td>
			<td id={String(task.id)}>{task.duration}</td>
			<td id={String(task.id)}>
				<span>{date.toTimeString().slice(0, 5)}</span>
				<span className="d-none d-md-block">{" " + date.toLocaleDateString().slice(0, 10)}</span>
			</td>
			<td id={String(task.id)}>
				<button
					className="btn"
					onClick={() => {
						setShowEdit(true);
					}}>
					<i className="bi bi-pencil-square"></i>
				</button>

				<button className="btn" onClick={deleteTask}>
					<i className="bi bi-x-circle"></i>
				</button>
			</td>
		</>
	);
}

export default ActivityRow;
