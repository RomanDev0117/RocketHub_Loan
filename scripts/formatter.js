exports.format = function (msgs) {
  const results = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [id, msg] of Object.entries(msgs)) {
    const message = msg.defaultMessage || '';

    results[id] = {
      message: message || id,
      description: '<no description>',
      // ...msg,
      // id,
    };
  }
  return results;
};
