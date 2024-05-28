export function formatDate(date: string) {
  const newDate = new Date(date);

  const formatDate = newDate.toLocaleDateString('es-ES', {day: '2-digit', month: 'long', year: 'numeric'});
  return formatDate;
};