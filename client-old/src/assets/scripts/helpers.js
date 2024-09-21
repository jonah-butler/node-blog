const dateFormat = (isoDate) => {
  const date = new Date(isoDate);
  return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
};

export default { dateFormat };
