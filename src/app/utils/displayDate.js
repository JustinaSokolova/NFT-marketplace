export function displayDate(data) {
  const date = new Date(data * 1000);
  const oneDay = 1000 * 60 * 60 * 24;

  const dateNow = new Date(Date.now());
  const yearDif = dateNow.getFullYear() - date.getFullYear();

  if (yearDif <= 0) {
    const dayDifInMs = dateNow.getTime() - date.getTime();
    const diffInDays = Math.round(dayDifInMs / oneDay);

    if (diffInDays <= 0) {
      const hourDif = dateNow.getHours() - date.getHours();

      if (hourDif <= 0) {
        const minutesDif = dateNow.getMinutes() - date.getMinutes();

        if (minutesDif >= 0 && minutesDif < 5) return "1 minute ago";
        if (minutesDif >= 5 && minutesDif < 10) return "5 minutes ago";
        if (minutesDif >= 10 && minutesDif < 30) {
          return "10 minutes ago";
        }
        return "30 minutes ago";
      }
      if (hourDif === 1) return `${hourDif} hour ago`;
      return `${hourDif} hours ago`;
    }

    return date.toLocaleString("en-GB", { month: "long", day: "numeric" });
  }
  return (
    date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
  );
}
