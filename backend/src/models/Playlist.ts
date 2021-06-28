import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import Video from './Video';

@Entity('playlists')
class Playlist {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Video, { cascade: true })
  @JoinTable()
  videos: Video[];
}

export default Playlist;
