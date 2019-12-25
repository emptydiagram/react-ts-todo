import React, { Component } from 'react'; // let's also import Component
import './Clock.css';

// the clock's state has one field: The current time, based upon the
// JavaScript class Date
type ClockState = {
  time: Date
}

// Clock has no properties, but the current state is of type ClockState
// The generic parameters in the Component typing allow to pass props
// and state. Since we don't have props, we pass an empty object.
export default class Clock extends Component<{}, ClockState> {

  // annotate the type of props since typescript will not compile implicit any
  constructor(props: {}) {
    super(props);
    this.state = {
      time: new Date()
    };
  }

  // The tick function sets the current state. TypeScript will let us know
  // which ones we are allowed to set.
  tick() {
    this.setState({
      time: new Date()
    });
  }

  // After the component did mount, we set the state each second.
  componentDidMount() {
    setInterval(() => this.tick(), 1000);
  }

  // render will know everything!
  render() {
    let message = "The current time is " + this.state.time.toLocaleTimeString();

    // let s = this.state.time.getSeconds();

    if (this.state.time.getSeconds() % 10 === 0) {
        return <p className="highlight-10">{ message }</p>
    } else {
        return <p>{ message }</p>
    }
  }
}
