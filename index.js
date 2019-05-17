#!/usr/bin/env node

const React = require('react');
const { render, Color } = require('ink');
const main = require('./src/main');

class Counter extends React.Component {
  constructor() {
    super();

    this.state = {
      i: 0,
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        i: this.state.i + 1,
      });
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return <Color green>{this.state.i} tests passed</Color>;
  }
}

(async () => {
  try {
    render(<Counter />);
    // await main();
  } catch (error) {
    require('./src/error')(error);
    process.exit(1);
  }
})();
