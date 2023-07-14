export class FileUtils {
  /**
   * Used to build a file size string aka '10 KB', '1.23 MB'
   * @param bytes The number of bytes.
   * @returns The file size formatted string.
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) {
      return "0 B";
    }

    const sizes = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log10(bytes) / 3);
    const size = (bytes / Math.pow(1000, i)).toFixed(2);

    return `${size} ${sizes[i]}`;
  }

  static getExtension(fileName: string): string {
    const dotIndex = fileName.lastIndexOf(".");
    if (dotIndex === -1) {
      return ""; // No extension found
    }
    return fileName.substring(dotIndex + 1).toLowerCase();
  }
}
