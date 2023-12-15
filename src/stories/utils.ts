import { type FileUploadService } from '../hooks/useFileUploader';

export interface FakeServiceOptions {
  milliseconds?: number;
  failureRate?: number;
}
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
