import { getRepository } from 'typeorm';
import Playlist from '../models/Playlist';

class CreatePlaylistService {
  public async execute(name: string): Promise<Playlist> {
    const playlistRepository = getRepository(Playlist);

    const playlist = playlistRepository.create({
      name,
      videos: [],
    });

    await playlistRepository.save(playlist);

    return playlist;
  }
}

export default CreatePlaylistService;
