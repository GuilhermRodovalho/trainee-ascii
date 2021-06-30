import { getRepository } from 'typeorm';
import Playlist from '../models/Playlist';
import Video from '../models/Video';

class DisconnectVideoFromPlaylistService {
  public async execute(playlistId: string, videoId: string): Promise<Playlist> {
    const playlistRepository = getRepository(Playlist);
    const videoRepository = getRepository(Video);

    const playlist = await playlistRepository.findOne({
      where: {
        id: playlistId,
      },
      relations: ['videos'],
    });

    if (!playlist) {
      throw new Error("This playlist doesn't exist");
    }

    const video = await videoRepository.findOne({
      where: {
        id: videoId,
      },
    });

    if (!video) {
      throw new Error("This vídeo doesn't exist");
    }

    // Testa se o vídeo já está na playlist.

    const isvideoalreadyonplaylist = playlist.videos.findIndex(
      playlistvideo => playlistvideo.id === video.id,
    );

    if (isvideoalreadyonplaylist === -1) {
      throw new Error("This video isn't connected to this playlist");
    }

    // Remove o vídeo
    try {
      const index = isvideoalreadyonplaylist;

      playlist.videos.splice(index, 1);

      playlistRepository.save(playlist);
    } catch (_) {
      throw new Error('Internal error');
    }

    return playlist;
  }
}

export default DisconnectVideoFromPlaylistService;
