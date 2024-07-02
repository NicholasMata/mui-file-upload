import { type FileUploadService } from '../hooks/useFileUploader';

export type FakeServiceOptions = {
  milliseconds?: number;
  failureRate?: number;
};

export const useFakeService = ({
  milliseconds = 2000,
  failureRate = 0.1,
}: FakeServiceOptions): FileUploadService<void> => {
  return async (_, o) => {
    await new Promise<void>((resolve, reject) => {
      let progress = 0;
      const interval = setInterval(() => {
        if (progress === 100) clearInterval(interval);
        o(progress);
        if (progress === 100) {
          setTimeout(() => {
            const value = Math.random();
            value >= failureRate ? resolve() : reject(new Error('Failed on purpose'));
          }, 500);
        }
        progress++;
      }, milliseconds / 100);
    });
  };
};

export const useFakeImageService = ({
  milliseconds = 2000,
  failureRate = 0.1,
}: FakeServiceOptions): FileUploadService<string> => {
  return async (_, o) => {
    return await new Promise<string>((resolve, reject) => {
      let progress = 0;
      const interval = setInterval(() => {
        if (progress === 100) clearInterval(interval);
        o(progress);
        if (progress === 100) {
          setTimeout(() => {
            const value = Math.random();
            value >= failureRate
              ? resolve(`https://picsum.photos/seed/${new Date().getTime() + Math.random()}/1920/1080`)
              : reject(new Error('Failed on purpose'));
          }, 500);
        }
        progress++;
      }, milliseconds / 100);
    });
  };
};
