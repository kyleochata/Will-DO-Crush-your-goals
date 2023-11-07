const format_date = (timestamp) => {
  console.log(timestamp);
  if (!timestamp) {
    return ""; // Handle empty timestamp
  }

  const date = new Date(parseInt(timestamp));

  // Adjust for the timezone offset to get the correct GMT date
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  const year = utcDate.getFullYear();
  let month = (utcDate.getMonth() + 1).toString().padStart(2, '0');
  let day = utcDate.getDate().toString().padStart(2, '0');
  console.log(`${year}-${month}-${day}`);
  return `${year}-${month}-${day}`;
};



export default format_date;