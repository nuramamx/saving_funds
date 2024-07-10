export default function ToMoney(input: number, locale: string = 'es-MX', currency: string = 'MXN') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(input); 
};