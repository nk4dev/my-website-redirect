import { userOperations } from "../../../lib/db";
import { hash } from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }
  try {
    const existing = await userOperations.findUnique({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already in use" });
    }
    const hashed = await hash(password, 10);
    await userOperations.create({ email, password: hashed });
    return res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
