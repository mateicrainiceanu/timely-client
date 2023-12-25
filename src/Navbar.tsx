import React, { useState } from "react";
import {Navbar, Nav} from "react-bootstrap";
import {IUser} from "./types";

interface INavProps {
	userIsLoggedIn: boolean;
	setUser: (user: IUser) => void;
	logout: () => void;
}

function NavbarComponent({userIsLoggedIn, setUser, logout}: INavProps) {

	const [showNavBg, setShowNavBg] = useState(false)

	window.addEventListener('scroll', () => {		
		if (window.scrollY > 50) {
			setShowNavBg(true);
		} else {
			setShowNavBg(false)
		}
	});

	return (
		<Navbar variant="dark" className={"sticky-top " + (showNavBg && "scrolled-nav")}>
			<Navbar.Brand href="#home" className="nav-txt">Timely</Navbar.Brand>
			<Nav className="ms-auto">
				{userIsLoggedIn ? (
					<>
						<Nav.Link href="/settings" className="nav-txt">Settings</Nav.Link>
						<Nav.Link onClick={logout} className="nav-txt">Logout</Nav.Link>
					</>
				) : (
					<Nav.Link href="/auth" className="nav-txt">Login</Nav.Link>
				)}
			</Nav>
		</Navbar>
	);
}

function Footer() {
	const year = new Date(Date.now()).getFullYear();

	return (
		<footer className="text-center">
			<h3>Thank you for visiting us!</h3>
			<span>Matei Crainiceanu © 2023-{year}</span>
		</footer>
	);
}

export {NavbarComponent, Footer};
