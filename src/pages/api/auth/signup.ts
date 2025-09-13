import { PrismaClient } from "../../../../generated/prisma";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req, res) {
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
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ error: "Email already in use" });
  }
  const hashed = await hash(password, 10);
  await prisma.user.create({ data: { email, password: hashed } });
  return res.status(201).json({ message: "User created" });
}
