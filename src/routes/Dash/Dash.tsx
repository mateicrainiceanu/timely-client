import React, {useState} from "react";
import TaskView from "./TaskView/TaskView";
import NewTask from "./TaskView/TaskEditor";

function Dash() {
	const [showNewTaskWindow, setShowNewTaskWindow] = useState(false);

	return (
		<>
			<TaskView setShowNewTask={setShowNewTaskWindow}></TaskView>
			{showNewTaskWindow && <NewTask createMode={true} setShow={setShowNewTaskWindow} />}
		</>
	);
}

export default Dash;
