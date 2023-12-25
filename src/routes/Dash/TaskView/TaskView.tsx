import React, {useEffect, useState} from "react";
import ActivityRow from "./ActivityRow";
import {getProxyy} from "../../../App";
import PomTimer from "../Pomodoro/PomTimer";
import {ITask} from "../../../types";

interface IProps {
	setShowNewTask: Function;
}

function TaskView({setShowNewTask}: IProps) {
	const [tasks, setTasks] = useState([]);
	const [changeOrders, setChangeOrders] = useState({firstId: 0, secondId: 0, ready: false});

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

	//DRAG AND DROP FUNCTIONALITY
	useEffect(() => {
		if (changeOrders.ready) {
			setTasks((prevData) => {
				const newShowKeyForDragged = getNewShowKeyForDragged(changeOrders.secondId);
				const indexOfDraggedElement = tasks.findIndex((task: ITask) => task.id === changeOrders.firstId);
				const modifiedTasksArray: any = prevData;
				const prevElementAtIndex = modifiedTasksArray[indexOfDraggedElement];
				modifiedTasksArray[indexOfDraggedElement] = {...(prevElementAtIndex as ITask), showKey: newShowKeyForDragged};
				return modifiedTasksArray;
			});

			const newShowKeyForDragged = getNewShowKeyForDragged(changeOrders.secondId);

			const draggedId = changeOrders.firstId;
			const lsToken = localStorage.getItem("token");

			const options = {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({token: lsToken, taskId: draggedId, showKey: newShowKeyForDragged}),
			};

			fetch(getProxyy() + "/tasks?token=" + lsToken, options);
			setChangeOrders({firstId: 0, secondId: 0, ready: false});
		}
		// eslint-disable-next-line
	}, [changeOrders, tasks]);

	function getNewShowKeyForDragged(idOfSecElement: number) {
		const indexOfTheSecondElement = tasks.findIndex((task: ITask) => task.id === idOfSecElement);
		const showKeyOfTheSecondElement =
			indexOfTheSecondElement >= 0
				? (tasks[indexOfTheSecondElement] as ITask).showKey
				: (tasks[tasks.length - 1] as ITask).showKey;
		if (indexOfTheSecondElement > 0) {
			return (showKeyOfTheSecondElement + (tasks[indexOfTheSecondElement - 1] as ITask).showKey) / 2;
		} else if (indexOfTheSecondElement < 0) {
			return showKeyOfTheSecondElement + 1;
		} else {
			return showKeyOfTheSecondElement - 0.01;
		}
	}

	function handleDragStart(e: React.DragEvent) {
		console.log(Number((e.target as any).id));
		setChangeOrders((prevData) => ({...prevData, firstId: Number((e.target as any).id)}));
	}

	function handleDragOver(e: any) {
		e.preventDefault();
		e.target.classList.add("dragged-over");
	}

	function handleDragLeave(e: any) {
		console.log(e);
		e.target.classList.remove("dragged-over");
	}

	function handleDrop(e: any) {
		console.log(e);
		e.target.classList.remove("dragged-over");

		const id = e.target.id === "last" ? -1 : Number(e.target.id);
		setChangeOrders((prevData) => ({...prevData, secondId: id, ready: true}));
	}

	return (
		<div className="card pad-2">
			<div className="row">
				<div className="col-lg-6">
					<h2>Your Tasks</h2>
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
						<td></td>
						<td>Activity</td>
						<td>Duration</td>
						<td>StartDate</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					{tasks
						.sort((a: ITask, b: ITask) => a.showKey - b.showKey)
						.map((task: ITask, i) => (
							<tr
								draggable
								onDragStart={handleDragStart}
								onDragOver={handleDragOver}
								onDragLeave={handleDragLeave}
								onDrop={handleDrop}
								id={String((task as ITask).id)}
								key={i}>
								<ActivityRow task={task} updateTasks={updateData} setChangeOrders={setChangeOrders}></ActivityRow>
							</tr>
						))}
					<tr
						onDragStart={handleDragStart}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
						id="last">
						<td id="last"></td>
						<td id="last"></td>
						<td id="last"></td>
						<td id="last"></td>
						<td id="last"></td>
						<td id="last"></td>
					</tr>
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
