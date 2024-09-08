export default interface BatchReaderInfo<BatchReaderResult> {
  execute (file: Buffer): Promise<BatchReaderResult>
}