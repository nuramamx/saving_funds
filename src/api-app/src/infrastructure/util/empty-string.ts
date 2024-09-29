export default function EmptyString(value: string) {
  const data = String(value).trim();
  
  if (data === undefined || data === null || data === 'undefined') return '';

  return data;
}