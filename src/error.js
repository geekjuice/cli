const { red } = require('chalk');
const PrettyError = require('pretty-error');

const {
  env: { DEBUG },
} = process;

module.exports = error => {
  if (DEBUG) {
    console.log('\n', new PrettyError().render(error));
  } else {
    console.log(red('\nuh-oh... something went wrong...'));
  }
};
