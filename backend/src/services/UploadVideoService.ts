import { getRepository } from 'typeorm';
import * as express from 'express';
import { getVideoDurationInSeconds } from 'get-video-duration';
import path from 'path';
import Video from '../models/Video';

class UploadVideoService {
  public async execute(req: express.Request): Promise<Video> {
    let time = 0;

    if (req.file) {
      time = await getVideoDurationInSeconds(path.resolve(`${req.file.path}`));
    } else {
      throw new Error('There must be a file passed to this service');
    }

    const videoRepository = getRepository(Video);

    const ntime = time.toFixed(0);

    time = Number(ntime);

    const video = videoRepository.create({
      name: req.file.filename,
      duration: time,
    });

    await videoRepository.save(video);

    return video;
  }
}

export default UploadVideoService;
