import { FileUploadService } from "@hooks/useFileUploader";

export type FakeServiceOptions = {
  milliseconds?: number;
  failureRate?: number;
};
export const useFakeService = ({
  milliseconds = 2000,
  failureRate = 0.1,
}: FakeServiceOptions): FileUploadService<void> => {
  return (_, o) => {
    return new Promise<void>((resolve, reject) => {
      let progress = 0;
      let interval = setInterval(() => {
        if (progress == 100) clearInterval(interval);
        o(progress);
        if (progress == 100)
          setTimeout(() => {
            const value = Math.random();
            value >= failureRate ? resolve() : reject();
          }, 500);
        progress++;
      }, milliseconds / 100);
    });
  };
};
