import React, {useEffect, useState} from "react";
import Dash from "./Dash/Dash";
import NavbarComponent from "./Navbar";
import AuthenticationPage from "./Auth/Auth";

// import {IUser} from "./types";

function getProxyy() {
	return process.env.REACT_APP_DEV_PROXY;
}

function App() {
	const [user, setUser] = useState({email: "", token: ""});
	const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

	function logout() {
		setUserIsLoggedIn(false);
		setUser({email: "", token: ""});
		localStorage.removeItem("token");
	}

	useEffect(() => {
		const lsToken = localStorage.getItem("token");

		if (user.email) {
			setUserIsLoggedIn(true);
		} else if (lsToken) {
			fetch(getProxyy() + "/user?token=" + lsToken).then((response) => {
				if (response.status === 201) {
					setUserIsLoggedIn(true);
				} else {
					setUserIsLoggedIn(false)
				}
			});
		} else {
			setUserIsLoggedIn(false);
		}
	}, [user]);

	return (
		<div className="App">
			<NavbarComponent userIsLoggedIn={userIsLoggedIn} setUser={setUser} logout={logout} />
			<main>{userIsLoggedIn ? <Dash /> : <AuthenticationPage setUser={setUser} />}</main>
		</div>
	);
}

export default App;
export {getProxyy};
