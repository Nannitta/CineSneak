export function formatDate(date: string) {
  const newDate = new Date(date);

  const formatDate = newDate.toLocaleDateString('es-ES', {day: '2-digit', month: 'long', year: 'numeric'});
  return formatDate;
};

export function formatVoteCount(number: number) {
  return number.toString().slice(0,3);
}

export function formatRuntime(number: number) {
  const hours: number = Math.floor(number/60);
  const minutes: number = Math.floor(number%60);

  const runtime: string = `${hours}h ${minutes}min`;

  return runtime;
}