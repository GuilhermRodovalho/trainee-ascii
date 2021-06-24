import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity('videos')
class Video {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @Column('int')
  duration: number;
}

export default Video;
