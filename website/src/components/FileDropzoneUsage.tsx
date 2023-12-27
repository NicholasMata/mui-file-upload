import { FileDropzoneBody, FileDropzoneInputBody, MultiFileUpload, SingleFileUpload } from 'mui-file-upload';
import { type ReactNode } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { ThemeProvider, createTheme } from '@mui/material';
import { useFakeService } from './FileUploadUsage';

export const CustomFileDropzoneBodyUsage = (): ReactNode => {
  const uploadService = useFakeService({});
  const { colorMode } = useColorMode();
  const theme = createTheme({ palette: { mode: colorMode } });
  return (
    <ThemeProvider theme={theme}>
      <MultiFileUpload
        uploadService={uploadService}
        body={
          <FileDropzoneBody
            title='Custom Title'
            dropTitle='Custom Drop Title'
            disabledTitle='Custom Disabled Title'
            dragRejectedTitle='Custom Rejected Title'
            fileOverloadTitle='Custom Too Many Files'
          />
        }
      />
    </ThemeProvider>
  );
};

export const CustomFileDropzoneInputBodyUsage = (): ReactNode => {
  const uploadService = useFakeService({});
  const { colorMode } = useColorMode();
  const theme = createTheme({ palette: { mode: colorMode } });
  return (
    <ThemeProvider theme={theme}>
      <SingleFileUpload
        uploadService={uploadService}
        body={
          <FileDropzoneInputBody
            title='or Custom Title'
            dropTitle='or Custom Drop Title'
            disabledTitle='Custom Disabled Title'
            dragRejectedTitle='Custom Rejected Title'
            fileOverloadTitle='Custom Too Many Files'
          />
        }
      />
    </ThemeProvider>
  );
};
