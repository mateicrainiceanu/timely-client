import React, {useEffect, useState} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Dash from "./routes/Dash/Dash";
import {NavbarComponent, Footer} from "./Navbar";
import AuthenticationPage from "./routes/Auth/Auth";
import Home from "./routes/Dash/Home/Home";

function getProxyy() {
	return process.env.REACT_APP_DEV_PROXY;
}

function App() {
	//MAMAGING USER ACCOUNT

	const [user, setUser] = useState({email: "", token: ""});
	const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

	function logout() {
		setUserIsLoggedIn(false);
		setUser({email: "", token: ""});
		localStorage.removeItem("token");
		window.location.replace("/")
	}

	useEffect(() => {
		const lsToken = localStorage.getItem("token");

		if (user.email) {
			setUserIsLoggedIn(true);
		} else if (lsToken !== null) {
			fetch(getProxyy() + "/user?token=" + lsToken).then((response) => {
				if (response.status === 201) {
					setUserIsLoggedIn(true);
				} else {
					setUserIsLoggedIn(false);
				}
			});
		} else {
			setUserIsLoggedIn(false);
		}

	}, [user]);

	//SETTING UP THE ROUTER

	const router = createBrowserRouter([
		{
			path: "/",
			element: <Home />,
		},
		{
			path: "/auth",
			element: <AuthenticationPage setUser={setUser} />,
		},
		{
			path: "/dash",
			element: <>{userIsLoggedIn ? <Dash /> : <AuthenticationPage setUser={setUser} />}</>,
		},
	]);

	return (
		<div className="">
			<NavbarComponent userIsLoggedIn={userIsLoggedIn} setUser={setUser} logout={logout} />
			<main>
				{/*  */}
				<RouterProvider router={router}></RouterProvider>
			</main>
			<Footer></Footer>
		</div>
	);
}

export default App;
export {getProxyy};
