#!/usr/bin/env node

const main = require('./src/main');

(async () => {
  try {
    await main();
  } catch (error) {
    require('./src/error')(error);
    process.exit(1);
  }
})();
