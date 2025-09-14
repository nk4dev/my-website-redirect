import { PrismaClient } from "../../../generated/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { original } = req.body;
        if (!original) {
            return res.status(400).json({ error: "Original URL required" });
        }
        // Check if original URL already exists
        const existing = await prisma.urls.findUnique({ where: { original } });
        if (existing) {
            return res.status(200).json({ shorter: existing.shorter });
        }
        // Generate short code and URL
        // 0-9, a-z, A-Z, total 62 characters
        // Simple random generation, not collision-proof
        const N = 3;
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let shortCode = '';
        for (let i = 0; i < N; i++) {
            shortCode += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        const shortUrl = `http://localhost:3000/api/redirect?id=${shortCode}`;
        try {
            const created = await prisma.urls.create({
                data: {
                    id: shortCode,
                    original,
                    shorter: shortUrl,
                },
            });
            res.status(200).json({ shorter: created.shorter });
        } catch (err) {
            res.status(500).json({ error: "Failed to save URL" });
        }
    } else if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}