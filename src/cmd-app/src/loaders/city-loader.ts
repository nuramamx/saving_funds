import data from '../seed/city.json';
import fs from 'fs';
import { appendFile } from 'fs/promises';

export default function CityLoader(): Promise<void> {
  return new Promise(async (resolve) => {
    const jsonData: ({ [key: string]: string[] }) = data;
    let content: string = '';

    Object.keys(jsonData).forEach((key: string) => {
      jsonData[key].map((city: string) => {
        content += `${key},${city.toUpperCase()}\r\n`;
      });
    });

    await appendFile('/Users/chachicha/Downloads/jeje.csv', content, { flag: 'w' });

    resolve();
  });
}