import { NextApiRequest, NextApiResponse } from 'next';
import { createYouTubeClient } from '../../lib/youtube';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { q } = req.query;

  if (!q || typeof q !== 'string') {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const youtube = await createYouTubeClient();
    const suggestions = await youtube.getSearchSuggestions(q);

    res.status(200).json({ suggestions });
  } catch (error) {
    console.error('Suggestions API Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 