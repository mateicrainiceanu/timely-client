import React, {useState} from "react";
import "./pom.css";

function PomTimer() {
	const [timeLeft, setTimeLeft] = useState({min: 25, sec: 0});
	const [active, setActive] = useState(false);

	setTimeout(() => {
		console.log("StartTout: " + Date());

		var remSec = timeLeft.sec;
		var remMin = timeLeft.min;

		if (remSec > 0) {
			remSec--;
		} else if (remSec === 0 && remMin > 0) {
			remSec = 59;
			remMin--;
		} else {
			alert("over");
			setActive(false);
		}

		if (active) {
			setTimeLeft({sec: remSec, min: remMin});
		}
	}, 1000);

	function resetTimer() {
		setActive(false);
		setTimeout(() => {
			setTimeLeft({min: 25, sec: 0});
		}, 1000);
	}

	function breakTimer() {
		setActive(false);
		setTimeout(() => {
			setTimeLeft({min: 5, sec: 0});
			setActive(true);
		}, 1000);
	}

	return (
		<>
			<div className="row">
				<div className="col-md-6 t-center">
					<h5>Pomodoro Timer</h5>
					<button
						onClick={() => {
							setActive((prevData) => !prevData);
						}}
						className={"btn " + (active ? "btn-danger" : "btn-success")}>
						{active ? "Stop" : "Start"}
					</button>

					<button className="btn btn-warning" onClick={resetTimer}>
						Reset
					</button>

					<button className="btn btn-secondary" onClick={breakTimer}>
						Break
					</button>
					{/* <a href="/">Find out more</a> */}
				</div>
				<div className="col-md-6">
					<div className="timer">
						<time>
							{timeLeft.min}:{timeLeft.sec < 10 ? "0" + timeLeft.sec : timeLeft.sec}
						</time>
					</div>
				</div>
			</div>

			<hr />
		</>
	);
}

export default PomTimer;
