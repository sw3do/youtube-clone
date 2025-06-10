import { NextApiRequest, NextApiResponse } from 'next';
import { createYouTubeClient } from '../../lib/youtube';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { q, limit = 20 } = req.query;

  if (!q || typeof q !== 'string') {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const youtube = await createYouTubeClient();
    const searchResults = await youtube.search(q, { type: 'video' });
    const videos = searchResults.videos.slice(0, parseInt(limit as string));
    
    res.status(200).json({ videos });
  } catch (error) {
    console.error('Search API Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 