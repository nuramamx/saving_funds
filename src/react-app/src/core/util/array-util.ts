function chunkArray<T>(array: Array<T>, size: number) {
  const chunkedArray: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  
  return chunkedArray;
};

export { chunkArray };