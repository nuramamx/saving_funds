export default function ToShortDate(date: string) {
  return new Date(date).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};