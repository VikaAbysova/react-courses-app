export const dateGenerator = (d) => {
  if (typeof d === 'object') {
    const date = new Date(d).getDate().toString();
    const correctDate = +date < 10 ? `0${date}` : date;
    const month = (new Date(d).getMonth() + 1).toString();
    const correctMonth = +month < 10 ? `0${month}` : month;
    const year = new Date(d).getFullYear().toString();
    return `${correctDate}.${correctMonth}.${year}`;
  }
  if (typeof d === 'string' && d.includes('/')) {
    const correctDate = d.replaceAll('/', '.');
    return correctDate;
  }
  return d;
};
