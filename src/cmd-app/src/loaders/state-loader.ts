// export default function LoadStates(): Promise<void> {
//   return new Promise((resolve) => {
//     const jsonData: ({ [key: string]: string[] }) = data;
//     const cityList: any[] = [];

//     Object.keys(jsonData).forEach((key: string) => {
//       jsonData[key].map((city: string) => {
//         cityList.push({ stateId: key, name: city.toUpperCase() });
//       });
//     });

//     resolve();
//   });
// }