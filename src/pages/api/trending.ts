import { NextApiRequest, NextApiResponse } from 'next';
import { createYouTubeClient } from '../../lib/youtube';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const youtube = await createYouTubeClient();
    const trending = await youtube.getTrending();
    const videos = trending.videos.slice(0, 50);
    
    res.status(200).json({ videos });
  } catch (error) {
    console.error('Trending API Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 