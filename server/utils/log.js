const tag = '[megalo-dev-tool-server]:';

module.exports = function log(...args) {
  const params = args;
  if (typeof params[0] === 'string') {
    params[0] = `${tag} ${args[0]}`;
  } else {
    params.push(tag);
  }
  console.log(...params);
};
