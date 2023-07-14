import mimeDb from "mime-db";
import { FileUtils } from "./file-utils";

export type FriendlyAcceptType = "extension" | "name" | "mime";

export interface MimeType {
  readonly key: string;
  readonly extensions: ReadonlyArray<string>;
}

export class AcceptUtils {
  /**
   * NOTE: Issue with mime-db doesn't line up with input tag when provided mime types.
   * 
   * Get all mime type present in an accept string which is comma separate.
   * 
   * This also supports file extensions as well.
   * @param accepts An accepts string to get mime types from. i.e. "application/pdf,application/json", ".pdf,.json"
   * @returns An array of mime types parse from accepts string.
   */
  static getMimeTypes(accepts: string) {
    return accepts
      .replace(/\s/g, "")
      .split(",")
      .reduce<MimeType[]>((all, accept) => {
        if (accept.startsWith(".")) {
          const withoutDot = accept.substring(1);
          all.push({ key: accept, extensions: [withoutDot] });
        } else {
          let mime = mimeDb[accept];
          let mimeEntries = [];
          if (mime) {
            mimeEntries.push({
              key: accept,
              extensions: mime.extensions ?? [],
            });
          }
          if (accept.includes("*")) {
            mimeEntries = Object.keys(mimeDb)
              .filter((k) => k.includes(accept.replace("*", "")))
              .map((k) => ({ key: k, extensions: mimeDb[k].extensions ?? [] }));
          }
          all.push(...mimeEntries);
        }
        return all;
      }, [] as MimeType[]);
  }
}

export class Accept {
  accepts: string;
  readonly mimeTypes: ReadonlyArray<MimeType>;
  constructor(accepts: string) {
    this.accepts = accepts;
    this.mimeTypes = AcceptUtils.getMimeTypes(accepts);
    console.log(this.mimeTypes);
  }
  /**
   * Parses out the include accept strings from accepts string.
   * @param type The type of friendly string to parse out.
   * @returns An array of accept strings.
   */
  asFormat(type: FriendlyAcceptType = "extension"): string[] {
    const mimeTypes = this.mimeTypes;
    return mimeTypes.reduce((all, mimeType) => {
      switch (type) {
        case "name":
          all.push(...(mimeType.extensions ?? []));
          break;
        case "extension":
          all.push(...(mimeType.extensions ?? []).map((e) => "." + e));
          break;
        case "mime":
          all.push(mimeType.key);
          break;
      }

      return all;
    }, [] as string[]);
  }

  /**
   * A user friendly display for an accepts string.
   * @param type The type aka "name" or "extension".
   * @returns A user friendly display string for the accepts.
   */
  toString(type: FriendlyAcceptType = "name") {
    return this.asFormat(type).join(", ");
  }

  /**
   * Validate whether or not filename matches accepts.
   * @param filename The filename which contains the extension as well.
   * @returns A boolean indicating if accept matches filename.
   */
  acceptsFilename(filename: string) {
    const extension = FileUtils.getExtension(filename);
    return this.asFormat("name").indexOf(extension) > -1;
  }

  acceptsMimeType(mimeType: string) {
    if (mimeType.length == 0) return true;
    return this.asFormat("mime").indexOf(mimeType) > -1;
  }
}
