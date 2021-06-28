import { getRepository } from 'typeorm';
import Playlist from '../models/Playlist';

export default class DeletePlaylistService {
  public async execute(id: string): Promise<void> {
    const playlistRepository = getRepository(Playlist);

    await playlistRepository.delete({ id });
  }
}
