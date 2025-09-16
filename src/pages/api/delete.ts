import { NextApiRequest, NextApiResponse } from 'next';
import { urlOperations } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'URL ID is required' });
  }

  try {
    await urlOperations.delete({ id });

    return res.status(200).json({ success: true, message: 'URL deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return res.status(404).json({ error: 'URL not found or could not be deleted' });
  }
}