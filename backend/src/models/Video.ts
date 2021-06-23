import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('videos')
class Video {
  @PrimaryGeneratedColumn('uuid')
  id: String;

  @Column()
  name: String;

  @Column('int')
  duration: Number;
}

export default Video;
