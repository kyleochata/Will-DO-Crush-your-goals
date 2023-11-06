const format_date = (timestamp) => {
  if (!timestamp) {
    return ""; // Handle empty timestamp
  }

  const date = new Date(parseInt(timestamp));
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export default format_date;