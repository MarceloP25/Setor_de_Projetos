export function formatDateBR(data?: string | null): string {
  if (!data) return '-';

  const date = new Date(data);

  if (isNaN(date.getTime())) {
    return data; // fallback: mostra como veio
  }

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
