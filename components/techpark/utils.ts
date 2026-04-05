export const getSpotsTone = (count: number) => {
  if (count === 0) {
    return { label: 'FULL', classes: 'text-red-300 border-red-500/30 bg-red-500/10' };
  }

  if (count <= 3) {
    return { label: 'FEW LEFT', classes: 'text-amber-300 border-amber-500/30 bg-amber-500/10' };
  }

  return { label: 'OPEN', classes: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10' };
};
