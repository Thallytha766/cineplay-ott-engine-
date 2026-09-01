import axios from 'axios';

export interface AccountSession {
  username: string;
  status: string;
  expirationDate: string;
  isExpired: boolean;
  activeConnections: string;
  maxConnections: string;
  serverUrl: string;
  authType: 'XTREAM_DNS' | 'M3U_PLAYLIST';
}

export interface MediaItem {
  id: string;
  title: string;
  posterUrl: string;
  streamUrl: string;
  trailerUrl?: string;
  category: string;
  rating: string;
}

export class IptvEngine {
  // 1. Conexão via DNS + Usuário + Senha (Xtream Codes API)
  static async loginWithXtream(
    dns: string,
    user: string,
    pass: string
  ): Promise<{ session: AccountSession; movies: MediaItem[] }> {
    const cleanDns = dns.replace(/\/+$/, '');
    const authEndpoint = `${cleanDns}/player_api.php?username=${encodeURIComponent(user)}&password=${encodeURIComponent(pass)}`;
    
    const authRes = await axios.get(authEndpoint, { timeout: 10000 });
    const authData = authRes.data;

    if (!authData?.user_info || authData.user_info.auth === 0) {
      throw new Error('Falha de autenticação: credenciais ou servidor inválidos.');
    }

    const userInfo = authData.user_info;
    const rawExp = userInfo.exp_date;
    let expFormatted = 'Vitalício / Ilimitado';
    let isExpired = false;

    if (rawExp && rawExp !== 'null' && rawExp !== '0') {
      const expTimestamp = parseInt(rawExp, 10) * 1000;
      const expDate = new Date(expTimestamp);
      expFormatted = expDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      isExpired = expDate.getTime() < Date.now();
    }

    const session: AccountSession = {
      username: userInfo.username,
      status: userInfo.status,
      expirationDate: expFormatted,
      isExpired,
      activeConnections: userInfo.active_cons || '1',
      maxConnections: userInfo.max_connections || '1',
      serverUrl: cleanDns,
      authType: 'XTREAM_DNS'
    };

    // Obtenção do catálogo VOD
    const vodEndpoint = `${authEndpoint}&action=get_vod_streams`;
    const vodRes = await axios.get(vodEndpoint, { timeout: 15000 });
    const rawMovies = Array.isArray(vodRes.data) ? vodRes.data : [];

    const movies: MediaItem[] = rawMovies.slice(0, 50).map((item: any) => ({
      id: String(item.stream_id),
      title: item.name || 'Sem Título',
      posterUrl: item.stream_icon || 'https://via.placeholder.com/300x450/141414/E50914?text=CinePlay',
      streamUrl: `${cleanDns}/movie/${user}/${pass}/${item.stream_id}.${item.container_extension || 'mp4'}`,
      category: item.category_name || 'Geral',
      rating: item.rating_5based ? `${item.rating_5based}/5` : '4.8/5'
    }));

    return { session, movies };
  }

  // 2. Parser nativo de Listas M3U / M3U8
  static parseM3U(rawM3uContent: string): MediaItem[] {
    const lines = rawM3uContent.split(/\r?\n/);
    const parsedItems: MediaItem[] = [];
    let currentTitle = '';
    let currentPoster = '';
    let currentCategory = 'Geral';

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('#EXTINF:')) {
        const titleMatch = trimmed.match(/,(.+)$/);
        const logoMatch = trimmed.match(/tvg-logo="([^"]+)"/);
        const groupMatch = trimmed.match(/group-title="([^"]+)"/);

        currentTitle = titleMatch ? titleMatch[1].trim() : 'Canal / Mídia';
        currentPoster = logoMatch ? logoMatch[1] : 'https://via.placeholder.com/300x450/141414/E50914?text=CinePlay';
        currentCategory = groupMatch ? groupMatch[1] : 'Ao Vivo';
      } else if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        parsedItems.push({
          id: `m3u-${parsedItems.length + 1}`,
          title: currentTitle,
          posterUrl: currentPoster,
          streamUrl: trimmed,
          category: currentCategory,
          rating: '4.5/5'
        });
      }
    }
    return parsedItems;
  }
}
