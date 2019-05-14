const tag = '[megalo-dev-tool-server]:';

module.exports = function(...args) {
  if (typeof args[0] === 'string') {
    args[0] = `${tag} ${args[0]}`;
  } else {
    args.push(tag);
  }
  console.log(...args);
}