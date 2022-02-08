const dayjs = require("dayjs");

exports.gaugeReaction = (votes) => {
  if (votes < -20) return "very negative reaction";
  else if (votes < -10) return "negative reaction";
  else if (votes < -5) return "slightly negative reaction";
  else if (votes < 5) return "neutral reaction";
  else if (votes < 10) return "slightly positive reaction";
  else if (votes < 20) return "positive reaction";
  else return "very positive reaction";
};

exports.formatDate = (timestamp) => {
  return dayjs(timestamp).$d.toString().substring(4, 15);
};
