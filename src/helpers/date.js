export const convertSecondsToFormattedDate = (seconds) => {
    const milliseconds = seconds * 1000;
    const date = new Date(milliseconds);
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
  
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
};