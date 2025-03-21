export function formatDate(date: string): string {
  const newDate: Date = new Date(date);

  const formatDate: string = newDate.toLocaleDateString('es-ES', {day: '2-digit', month: 'long', year: 'numeric'});
  return formatDate;
};

export function formatVoteCount(number: number): string {
  return number.toString().slice(0,3);
}

export function formatRuntime(number: number) {
  const hours: number = Math.floor(number/60);
  const minutes: number = Math.floor(number%60);
  let runtime: string;

  if(hours > 0) {
    runtime = `${hours}h ${minutes}min`;
    return runtime;
  }

  if(hours <= 0) {
    runtime = `${minutes}min`;
    return runtime;
  }
}

export function formatEpisodeNumber(number: number) {
  if(number < 10) {
    return `0${number}`;
  }

  return number;
}
