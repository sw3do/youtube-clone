import { NextApiRequest, NextApiResponse } from 'next';
import { Innertube } from 'youtubei.js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { videoId } = req.query;

    if (!videoId || typeof videoId !== 'string') {
        return res.status(400).json({ message: 'Video ID gerekli' });
    }

    try {
        const youtube = await Innertube.create();
        
        const videoInfo = await youtube.getInfo(videoId);
        
        let relatedVideos: any[] = [];
        try {
            const searchQuery = videoInfo.basic_info.title?.split(' ').slice(0, 3).join(' ') || 'music';
            const searchResults = await youtube.search(searchQuery, { type: 'video' });
            relatedVideos = searchResults.videos?.slice(0, 15) || [];
        } catch (searchError) {
            console.log('İlgili videolar yüklenirken hata, ana sayfa videoları getiriliyor');
            const homeFeed = await youtube.getHomeFeed();
            relatedVideos = homeFeed.videos?.slice(0, 15) || [];
        }

        const video: any = {
            id: videoInfo.basic_info.id,
            title: videoInfo.basic_info.title,
            description: videoInfo.basic_info.short_description,
            channel: {
                name: videoInfo.basic_info.channel?.name,
                id: videoInfo.basic_info.channel?.id,
                verified: (videoInfo.basic_info as any).channel?.is_verified || false,
                subscriber_count: (videoInfo.basic_info as any).channel?.subscriber_count || 0,
                thumbnail: (videoInfo.basic_info as any).channel?.author?.best_thumbnail?.url || null
            },
            views: videoInfo.basic_info.view_count || 0,
            likes: videoInfo.basic_info.like_count || 0,
            published: (videoInfo.basic_info as any).publish_date || new Date().toISOString(),
            duration: typeof videoInfo.basic_info.duration === 'number' ? videoInfo.basic_info.duration : 0,
            thumbnail: videoInfo.basic_info.thumbnail?.[0]?.url,
            embed_url: `https://www.youtube.com/embed/${videoId}`,
            tags: videoInfo.basic_info.tags || []
        };

        const related = relatedVideos.map((video: any) => ({
            id: video.id,
            title: video.title?.text || video.title || 'Başlık yok',
            thumbnail: video.thumbnails?.[0]?.url || video.thumbnail?.url,
            channel: {
                name: video.author?.name || video.channel?.name || 'Kanal yok',
                verified: video.author?.is_verified || video.channel?.is_verified || false
            },
            views: video.view_count?.text || video.views || 0,
            duration: video.duration?.text || video.duration || '0:00',
            published: video.published?.text || video.published || 'Bilinmiyor'
        }));

        res.status(200).json({
            video,
            relatedVideos: related
        });

    } catch (error) {
        console.error('Video bilgileri alınırken hata:', error);
        res.status(500).json({ message: 'Video bilgileri alınamadı' });
    }
} 