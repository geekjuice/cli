const got = require('got');
const yosay = require('yosay');

module.exports = async () => {
  const { body } = await got('https://api.github.com/zen');
  console.log(yosay(body));
};
