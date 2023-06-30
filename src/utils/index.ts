export const ConvertUsersGroupedBtInitialLetter = (dataList: any[]) => {
  const usersGroupedBtInitialLetter: { [key: string]: any[] } = {};

  dataList.forEach((data) => {
    // chu dau tien o ten
    const initialLetter = data.name.charAt(0).toUpperCase();
    if (!usersGroupedBtInitialLetter[initialLetter]) {
      usersGroupedBtInitialLetter[initialLetter] = [];
    }
    usersGroupedBtInitialLetter[initialLetter].push(data);
  });

  return usersGroupedBtInitialLetter;
};

export const formatTime = (time: any) => {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};
