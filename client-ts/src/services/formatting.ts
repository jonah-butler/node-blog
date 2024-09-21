interface DateFormattingOptions {
  monthDayYear: Intl.DateTimeFormatOptions;
  [key: string]: Intl.DateTimeFormatOptions;
}


const dateOptions: DateFormattingOptions = {
  monthDayYear: {
    month: "long",
    day: "numeric",
    year: "numeric",
  }
}

const formatDate = (date: string, dateOptions: Intl.DateTimeFormatOptions): string => {
  return new Date(date).toLocaleDateString("en-US", dateOptions);
};

export {
  formatDate,
  dateOptions,
};