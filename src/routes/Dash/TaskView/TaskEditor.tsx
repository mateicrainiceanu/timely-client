import React, {useState} from "react";
import {getProxyy} from "../../../App";
import {ITask} from "../../../types";

interface IProps {
	setShow: any;
	createMode: boolean;
	task?: ITask;
}

function formatDate(date: Date): string {
	const dt = new Date(date);
	var string = dt.getFullYear() + "-";
	string += (dt.getMonth() < 10 ? "0" : "") + (dt.getMonth() + 1) + "-";
	string += (dt.getDate() < 10 ? "0" : "") + dt.getDate() + "T";
	string += (dt.getHours() < 10 ? "0" : "") + dt.getHours() + ":";
	string += (dt.getMinutes() < 10 ? "0" : "") + dt.getMinutes();
	return(string);
}

function TaskEditor({setShow, createMode, task}: IProps) {
	const tempDate = formatDate(new Date(Date.now()));

	const taskStartingData = task ? task : {name: "", startDate: tempDate , duration: "01:00"};

	if (task) {
		const taskDate = formatDate(new Date(taskStartingData.startDate));
		taskStartingData.startDate = taskDate;
	}

	const [taskData, setTaskData] = useState(taskStartingData);

	function handleChange(e: any) {
		console.log(e.target.value);
		
		setTaskData((prevData) => ({...prevData, [e.target.name]: e.target.value}));
	}

	async function saveNew() {
		const lsToken = localStorage.getItem("token");

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(taskData),
		};

		const response = await fetch(getProxyy() + "/tasks?token=" + lsToken, options);

		if (response.status === 201) {
			//handle Closing window
			setShow(false);
		} else {
			let data = await response.json();
			alert(response.status + " " + data.err);
		}

		window.location.reload();
	}

	async function updateTask() {
		const lsToken = localStorage.getItem("token");

		const options = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({token: lsToken, taskId: task?.id, ...taskData}),
		};

		const response = await fetch(getProxyy() + "/tasks", options);

		if (response.status !== 201) {
			alert(response.status);
		}

		window.location.reload();
	}

	return (
		<div className="new-task card">
			<h3>{createMode ? "Create a new Task" : "Edit task"}</h3>
			<label htmlFor="task-name">Task Name</label>
			<input id="task-name" name="name" type="text" value={taskData.name} onChange={handleChange} />
			<label htmlFor="date-start">Start date and time</label>
			<input
				id="date-start"
				name="startDate"
				type="datetime-local"
				value={taskData.startDate as string}
				onChange={handleChange}
			/>
			<label htmlFor="duration">Duration</label>
			<input
				id="duration"
				name="duration"
				type="time"
				placeholder="Duration"
				value={taskData.duration}
				onChange={handleChange}
			/>
			<hr />
			<button className="btn btn-light" onClick={createMode ? saveNew : updateTask}>
				Save
			</button>
			<button
				className="btn btn-dark"
				onClick={() => {
					setShow(false);
				}}>
				Close
			</button>
		</div>
	);
}

export default TaskEditor;
