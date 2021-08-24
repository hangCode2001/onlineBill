const isDayEqual = (day, selectedDay) => {
  if (day === selectedDay) {
    return true;
  } else {
    return false;
  }
};
export const dayFilter = (Items, selectedDay) => {
  return Items.filter((item) => {
    return (isDayEqual(item.date.day, selectedDay));
  });
};
const isMonthEqual = (date, in_out, selectedDate, selectedIn_out) => {
  if (date.year === selectedDate.year && date.month === selectedDate.month && in_out === selectedIn_out) {

    return true;
  } else {
    return false;
  }
};
export const monthFilter = (Items, selectedDate, selectedIn_out) => {
  return Items.filter((item) => {
    return (isMonthEqual(item.date, item.in_out, selectedDate, selectedIn_out));
  });
};

const localDate = new Date();
export const localYear = localDate.getFullYear();
export const localMonth = localDate.getMonth() + 1;
export const localDay = localDate.getDay();

export const isaNumber = (val) => {
  var regPos = /^\d+(\.\d+)?$/; //非负浮点数
  var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if (regPos.test(val) || regNeg.test(val)) {
    return true;
  } else {
    return false;
  }
}
export const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const year = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
export const day =
  [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
  ];

export const showDay = (month, year) => {
  let show = [];
  switch (month) {
    case 2:
      if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0))
        show = day[3];
      else
        show = day[2];
      break;
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      show = day[0];
      break;
    default:
      show = day[1];
      break;
  }
  return show;
}