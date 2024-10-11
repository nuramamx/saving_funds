export default interface BatchUploadCommand {
  process: string;
  filename: string;
  file: File;
  disableRules: boolean;
  validationOnly: boolean;
}