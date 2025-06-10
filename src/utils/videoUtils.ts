export const formatViews = (views: number | undefined | null): string => {
  if (!views || views === 0) {
    return '0 görüntüleme';
  }
  
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1).replace('.', ',')} Mn`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1).replace('.', ',')} B`;
  }
  return views.toLocaleString('tr-TR');
};

export const formatDuration = (duration: string | number): string => {
  if (typeof duration === 'string') {
    return duration;
  }
  if (typeof duration === 'number') {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  return '';
};

export const formatPublishDate = (publishDate: string | Date): string => {
  if (!publishDate) return '';
  
  try {
    const date = new Date(publishDate);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);
    
    if (diffInDays < 1) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours < 1) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        return `${diffInMinutes} dakika önce`;
      }
      return `${diffInHours} saat önce`;
    } else if (diffInDays < 7) {
      return `${diffInDays} gün önce`;
    } else if (diffInDays < 30) {
      const diffInWeeks = Math.floor(diffInDays / 7);
      return `${diffInWeeks} hafta önce`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths} ay önce`;
    } else {
      return `${diffInYears} yıl önce`;
    }
  } catch (error) {
    return publishDate.toString();
  }
};

export const getTextFromObject = (obj: any): string => {
  if (typeof obj === 'string') return obj;
  if (obj?.text) return obj.text;
  if (obj?.runs && Array.isArray(obj.runs)) {
    return obj.runs.map((run: any) => run.text || '').join('');
  }
  return '';
};

export const getViewCount = (video: any): number => {
  if (!video) return 0;
  
  if (video.view_count?.text) {
    const viewText = video.view_count.text;
    const match = viewText.match(/[\d.,]+/);
    if (match) {
      const numStr = match[0].replace(/[.,]/g, '');
      return parseInt(numStr) || 0;
    }
  }
  if (video.short_view_count?.text) {
    const shortViewText = video.short_view_count.text;
    if (shortViewText.includes('Mn')) {
      const num = parseFloat(shortViewText.replace(/[^\d.,]/g, '').replace(',', '.'));
      return Math.floor(num * 1000000);
    } else if (shortViewText.includes('B')) {
      const num = parseFloat(shortViewText.replace(/[^\d.,]/g, '').replace(',', '.'));
      return Math.floor(num * 1000);
    }
  }
  if (typeof video.views === 'number') {
    return video.views;
  }
  if (typeof video.view_count === 'number') {
    return video.view_count;
  }
  return 0;
};

export const getThumbnailUrl = (video: any): string => {
  if (video.thumbnails && Array.isArray(video.thumbnails) && video.thumbnails.length > 0) {
    return video.thumbnails[0].url;
  }
  if (video.thumbnail?.url) {
    return video.thumbnail.url;
  }
  return '';
};

export const getDuration = (video: any): string => {
  if (video.length_text?.text) {
    return video.length_text.text;
  }
  if (video.durationFormatted) {
    return video.durationFormatted;
  }
  if (video.duration) {
    const minutes = Math.floor(video.duration / 60);
    const seconds = video.duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  return '';
};

export const getChannelAvatar = (video: any): string => {
  if (video.author?.thumbnails && Array.isArray(video.author.thumbnails) && video.author.thumbnails.length > 0) {
    return video.author.thumbnails[0].url;
  }
  if (video.channel?.avatar) {
    return video.channel.avatar;
  }
  return '';
};

export const parseVideoData = (video: any) => {
  return {
    id: video.video_id || video.id,
    title: getTextFromObject(video.title),
    description: getTextFromObject(video.description_snippet || video.description),
    views: getViewCount(video),
    uploadedAt: getTextFromObject(video.published),
    durationFormatted: getDuration(video),
    thumbnail: {
      url: getThumbnailUrl(video)
    },
    channel: {
      name: getTextFromObject(video.author?.name) || video.channel?.name,
      verified: video.author?.is_verified || video.channel?.verified || false,
      avatar: getChannelAvatar(video)
    }
  };
}; 