import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../layout/main";

export default function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		const res = await fetch("/api/auth/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});
		if (res.ok) {
			router.push("/user/signin");
		} else {
			const data = await res.json();
			setError((data as { error?: string }).error || "Signup failed");
		}
	};

	return (
		<Layout>
		<div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
			<h2>Sign Up</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
					style={{ width: "100%", marginBottom: 10 }}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
					style={{ width: "100%", marginBottom: 10 }}
				/>
				<button type="submit" style={{ width: "100%" }}>Sign Up</button>
				{error && <p style={{ color: "red" }}>{error}</p>}
			</form>
		</div>
		</Layout>
	);
}
