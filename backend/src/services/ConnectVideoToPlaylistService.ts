import { getRepository } from 'typeorm';
import Playlist from '../models/Playlist';
import Video from '../models/Video';

class ConnectVideoToPlaylistService {
  public async execute(
    playlistId: string,
    videoId: string,
  ): Promise<Playlist | boolean> {
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

    const isvideoalreadyonplaylist = playlist.videos.find(
      playlistvideo => playlistvideo.id === video.id,
    );

    if (isvideoalreadyonplaylist) {
      throw new Error('This video is already linked to this playlist');
    }

    try {
      playlist.videos.push(video);

      await playlistRepository.save(playlist);
    } catch (_) {
      throw new Error('Internal error');
    }
    return playlist;
  }
}

export default ConnectVideoToPlaylistService;
