import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {IUser} from "./types";

interface INavProps {
	userIsLoggedIn: boolean;
	setUser: (user: IUser) => void;
	logout: ()=>void
}

function NavbarComponent({userIsLoggedIn, setUser, logout}: INavProps) {
	
	return (
		<Navbar bg="transparent" variant="dark" className="sticky-top">
			<Navbar.Brand href="#home">Timely</Navbar.Brand>
			<Nav className="ms-auto">
				{userIsLoggedIn ? (
					<>
						<Nav.Link href="/settings">Settings</Nav.Link>
						<Nav.Link onClick={logout}>Logout</Nav.Link>
					</>
				) : (
					<Nav.Link href="/">Login</Nav.Link>
				)}
			</Nav>
		</Navbar>
	);
}

export default NavbarComponent;
