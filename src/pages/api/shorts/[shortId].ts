import { NextApiRequest, NextApiResponse } from 'next';
import { createYouTubeClient } from '../../../lib/youtube';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { shortId } = req.query;

  if (!shortId || typeof shortId !== 'string') {
    return res.status(400).json({ message: 'Short ID is required' });
  }

  try {
    const youtube = await createYouTubeClient();
    
    const videoDetails = await youtube.getShortsVideoInfo(shortId);
    
    if (!videoDetails) {
      return res.status(404).json({ message: 'Short not found' });
    }

    const relatedVideos = await youtube.search('shorts', { 
      type: 'video',
      duration: 'short'
    });

    const filteredRelated = relatedVideos.videos
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((video: any) => {
        const videoId = video.basic_info?.id || video.id;
        return videoId !== shortId;
      })
      .slice(0, 10);

    res.status(200).json({ 
      video: videoDetails,
      relatedVideos: filteredRelated
    });
  } catch (error) {
    console.error('Short Detail API Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 