import React, {useState} from "react";
import {Form, Button, Container, Row, Col} from "react-bootstrap";
import { getProxyy } from "../App";
import { IUser, IAuthProps } from "../types";

function LoginForm({setUser}: IAuthProps) {
	const [email, setEmail] = useState("ion1@gmail.com");
	const [password, setPassword] = useState("Mircea");

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({email: email, password: password}),
		};

		fetch(getProxyy() + "/login", options)
			.then((response) => response.json())
			.then((data: IUser) => {
				setUser({...data});
				localStorage.setItem("token", data.token);
			});
	};



	return (
		<Container>
			<Row className="justify-content-md-center mt-5">
				<Col xs={12} md={6}>
					<Form onSubmit={handleLogin}>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</Form.Group>

						<Button variant="dark" type="submit" className="w-100 mt-3">
							Login
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default LoginForm;
