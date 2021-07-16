import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import Video from './Video';

@Entity('Folder')
class Folder {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Video, { cascade: true })
  @JoinTable()
  videos: Video[];

  @ManyToOne(() => Folder, folder => folder.childFolders, {
    nullable: true,
  })
  parentFolder: Folder | null;

  @OneToMany(() => Folder, folder => folder.parentFolder)
  childFolders: Folder[];
}

export default Folder;
