import { NextApiRequest, NextApiResponse } from 'next';
import { createYouTubeClient } from '../../lib/youtube';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const youtube = await createYouTubeClient();
        const homepage = await youtube.getHomeFeed();

        if (!homepage.videos || homepage.videos.length === 0) {
            return res.status(200).json({ 
                videos: [], 
                isEmpty: true,
                message: 'Ana sayfa boş görünüyor. Arama yaparak başlayın!'
            });
        }

        const videos = homepage.videos.slice(0, 20);
        res.status(200).json({ videos, isEmpty: false });
    } catch (error) {
        console.error('Homepage API Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
} 