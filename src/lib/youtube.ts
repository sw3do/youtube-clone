import { ClientType, Innertube } from 'youtubei.js';

export async function createYouTubeClient() {
  const config = {
    location: process.env.YOUTUBE_LOCATION || 'TR',
    lang: process.env.YOUTUBE_LANG || 'tr',
    client_type: process.env.YOUTUBE_CLIENT_TYPE as ClientType || 'WEB',
    enable_session_cache: process.env.YOUTUBE_ENABLE_CACHE === 'true',
    enable_safety_mode: process.env.YOUTUBE_ENABLE_SAFETY_MODE === 'true',
    retrieve_player: true,
    generate_session_locally: false,
  };

  return await Innertube.create(config);
} 