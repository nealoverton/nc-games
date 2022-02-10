const dayjs = require("dayjs");

exports.gaugeReaction = (votes) => {
  let rank = "";
  // if (votes < 5) return "";
  // else if (votes < 10) return "popular review";
  // else if (votes < 20) return "star review";
  // else return "legendary review";

  if (votes > 5) {
    rank = "popular review";
  }

  return rank;
};

exports.formatDate = (timestamp) => {
  return dayjs(timestamp).$d.toString().substring(4, 15);
};
