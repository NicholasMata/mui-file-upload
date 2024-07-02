import { type FileUploadService, MultiFileUpload, SingleFileUpload } from 'mui-file-upload';
import { type ReactNode } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { ThemeProvider, createTheme } from '@mui/material';

export const SampleMultiFileUpload = (): JSX.Element => {
  const uploadService = useFakeService({});
  const { colorMode } = useColorMode();
  const theme = createTheme({ palette: { mode: colorMode } });
  return (
    <ThemeProvider theme={theme}>
      <MultiFileUpload uploadService={uploadService} />
    </ThemeProvider>
  );
};

export const SampleSingleFileUpload = (): JSX.Element => {
  const uploadService = useFakeService({});
  const { colorMode } = useColorMode();
  const theme = createTheme({ palette: { mode: colorMode } });
  return (
    <ThemeProvider theme={theme}>
      <SingleFileUpload uploadService={uploadService} />
    </ThemeProvider>
  );
};

interface FakeServiceOptions {
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
