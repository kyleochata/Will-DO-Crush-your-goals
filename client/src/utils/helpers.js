const format_date = (timestamp) => {
  //month is index 0-11. must add 1 to get correct month
  let timeStamp = new Date(parseInt(timestamp));
  console.log("date", timestamp)
  let monthNum = timeStamp.getMonth();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let currentMonth = months[monthNum];
  let day = timeStamp.getDate();
  let year = timeStamp.getFullYear();

  return `${year}-${monthNum + 1}-${day}`;
}

export default format_date;