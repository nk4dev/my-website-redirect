import { NextApiRequest, NextApiResponse } from 'next';
import { urlOperations } from '../../lib/db';
// This API route redirects to a specified URL

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    const { id } = req.query;
    if (!id || Array.isArray(id)) {
        res.status(400).send('Bad Request');
        return;
    }
    
    try {
        const record = await urlOperations.findUnique({
            id: id as string,
        });
        
        if (record) {
            res.json({ redirect: record.original });
        } else {
            res.status(404).send('Not Found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}