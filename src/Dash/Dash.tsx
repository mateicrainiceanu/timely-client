import React, {useState} from "react";
import TaskView from "./TaskView";
import NewTask from "./TaskEditor";

function Dash() {
	const [showNewTaskWindow, setShowNewTaskWindow] = useState(false);

	return (
		<>
			<h3>Hello</h3>
			<TaskView setShowNewTask={setShowNewTaskWindow}></TaskView>
			{showNewTaskWindow && <NewTask createMode={true} setShow={setShowNewTaskWindow} />}
		</>
	);
}

export default Dash;
