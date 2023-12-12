// RegisterForm.tsx
import React, {useState} from "react";
import {Form, Button, Container, Row, Col} from "react-bootstrap";
import {getProxyy} from "../App";

import {IAuthProps, IUser} from "../types";

function RegisterForm({setUser}: IAuthProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	async function handleRegister(e: React.FormEvent) {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}
		// Handle registration logic here
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({email: email, password: password}),
		};

		const response = await fetch(getProxyy() + "/register", options);

		if (response.status === 201) {
			const data: IUser = await response.json();
			setUser({...data});
			localStorage.setItem("token", data.token);
		} else {
			const errresp = await response.json();
			alert(response.status + ": " + errresp.err);
		}

		// .then((response) => {
		//     const data = response.json()
		//     if(response.status===201) {
		//         return response.json();
		//     } else {
		//         const dataerr = await response.json();
		//         alert(dataerr.err);
		//     }
		// })
		// .then((data:IUser) => {

		// });
	}

	return (
		<Container>
			<Row className="justify-content-md-center mt-5">
				<Col xs={12} md={6}>
					<Form onSubmit={handleRegister}>
						<Form.Group controlId="RegidterFormBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</Form.Group>

						<Form.Group controlId="registerFormBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</Form.Group>

						<Form.Group controlId="RegiterFormBasicConfirmPassword">
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Confirm Password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</Form.Group>

						<Button variant="dark" type="submit" className="w-100 mt-3">
							Register
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}

export default RegisterForm;
