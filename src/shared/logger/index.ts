const logger = function (message: string, time = Date.now()) {
  // eslint-disable-next-line no-console
  console.log(`${time} - ${message}`);
};

export default logger;
