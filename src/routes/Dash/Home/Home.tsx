import React from "react";
import "./Home.css";

function Home() {
	return (
		<>
			<section id="hero" className="container">
				<div className=" hero-content centerd">
					<h1>Welcome to Timely</h1>
					<h2>A new tool for managing your time...</h2>
					<hr />
					<a className="btn btn-get-started btn-lg" href="/auth">
						Get Started
					</a>
				</div>
			</section>

			<section id="about" className="container">
				<div className="half-width">
					<h3 className="text-center">About Timely</h3>
					<hr />
					<p>
						Timely is an app project designed to help students, as well as workers to keep track of their study-session,
						assigments and workdays. The main goal is to make it as easy as posible to study or work, without having to
						worry about your assignments, breaks and without adding more demanding apps to your computer.
					</p>
				</div>
			</section>

		</>
	);
}

export default Home;


