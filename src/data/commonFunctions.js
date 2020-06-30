import moment from 'moment';

const formatDate = dateToFormat => {
  const dateArr = dateToFormat.split('T');
  dateArr[0] = moment(dateArr[0]).format('DD/MM/YYYY');
  return `Formulated on the day ${dateArr[0]} at ${dateArr[1]}`;
};

export { formatDate };
