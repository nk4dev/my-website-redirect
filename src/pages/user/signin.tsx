
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "../layout/main";

export default function Signin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		const res = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});
		if (res?.error) {
			setError(res.error);
		} else {
			router.query.callbackUrl
				? router.push(router.query.callbackUrl as string)
				: router.push("/url/create");
		}
	};

	return (
		<Layout>
			<div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
				<h2>Sign In</h2>
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
					<button type="submit" style={{ width: "100%" }}>Sign In</button>
					{error && <p style={{ color: "red" }}>{error}</p>}
				</form>
			</div>
		</Layout>
	);
}
