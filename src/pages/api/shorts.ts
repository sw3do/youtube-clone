import { NextApiRequest, NextApiResponse } from 'next';
import { createYouTubeClient } from '../../lib/youtube';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { limit = 100 } = req.query;

  try {
    const youtube = await createYouTubeClient();
    const searchResults = await youtube.search('shorts', { 
      type: 'video',
      duration: 'short'
    });
    
    const shortsVideos = searchResults.videos
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((video: any) => {
        if (video.thumbnail_overlays && Array.isArray(video.thumbnail_overlays)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return video.thumbnail_overlays.some((overlay: any) => 
            overlay.type === "ThumbnailOverlayTimeStatus" && 
            overlay.text === "SHORTS" && 
            overlay.style === "SHORTS"
          );
        }
        return false;
      })
      .slice(0, parseInt(limit as string));
    
    res.status(200).json({ videos: shortsVideos });
  } catch (error) {
    console.error('Shorts API Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 