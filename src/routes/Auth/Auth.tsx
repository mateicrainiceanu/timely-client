// AuthenticationPage.tsx
import React, {useState} from "react";
import {Tabs, Tab} from "react-bootstrap";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import {IAuthProps} from "../../types";

function AuthenticationPage({setUser}: IAuthProps) {
	const [activeTab, setActiveTab] = useState<string>("login");

	const handleTabSelect = (key: string | null) => {
		if (key) {
			setActiveTab(key);
		}
	};

	return (
		<div className="mt-5">
			<h2 className="text-center mb-4">Authentication</h2>
			<style>
				{`
          .nav-link, .nav-link:hover {
            color: white;
          }
          
          .nav-link.active {
            color: black; /* Change the color for the active tab if needed */
          }
        `}
			</style>
			<Tabs
				id="authentication-tabs"
				activeKey={activeTab}
				onSelect={handleTabSelect}
				className="justify-content-center tabs mx-auto">
				<Tab eventKey="login" title="Login">
					<LoginForm setUser={setUser} />
				</Tab>
				<Tab eventKey="register" title="Register">
					<RegisterForm setUser={setUser} />
				</Tab>
			</Tabs>
		</div>
	);
}

export default AuthenticationPage;
