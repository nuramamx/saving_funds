export default function GetTotalRows(result: any) {
  if (result !== null && result !== undefined && result.length > 0)
    return result.length > 0 ? result[0].total_rows : 0;
  else
    return 0;
};