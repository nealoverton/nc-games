const dayjs = require("dayjs");

exports.formatDate = (timestamp) => {
  return dayjs(timestamp).$d.toString().substring(4, 15);
};
