exports.sendSuccess = (res, data) => {
  return res.status(200).json({
    success: true,
    data
  });
};

exports.sendError = (res, message) => {
  return res.status(500).json({
    success: false,
    message
  });
};
