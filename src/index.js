import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: props.time,
      started: false,
    }
  }

  componentDidMount() {
    this.start();
  } 

  componentWillUnmount() {
    this.stop();
  }

  toggle() {
console.log("toggle!");
    if (this.state.started) {
      this.stop();
    } else {
      this.start();
    }
  }

  stop() {
    if(this.state.started) {
      clearInterval(this.interval);
      this.interval = null;
      this.setState({
        started: false,
      });
    }
  }

  start() {
    if(!this.state.started && !this.interval) {
      this.interval = setInterval(() => { this.tick() }, 1000);
      this.setState({started: true,});
    }
  }

  tick(t = new Date()) {
    this.setState({ time: t, }); 
  }

  render() {
    const hours = this.state.time.getHours();
    const minutes = this.state.time.getMinutes();
    const seconds = this.state.time.getSeconds();
    return (
        <div className="App clock">
        <Toggle started = {this.state.started} onClick={() => { this.toggle(); }} />
        <Digit key="hours" kind="hours" digit={hours}/>
        <br />
        <Digit key="minutes" kind="minutes" digit={minutes}/>
        <br />
        <Digit key="seconds" kind="seconds" digit={seconds}/>
        <br />
        </div>
        );
  }
}

function Toggle(props) {
  return (
      <button onClick={() => { props.onClick() }}>{props.started ? 'Stop' : 'Start'}</button>
      );
}

function Digit(props) { 

  let first_dots = [];
  let first = Math.floor(props.digit / 10);

  let second_dots = [];
  let second = props.digit % 10;

  for (let i = 3; i >= 0; i--) {
    const bit_value = 2 ** i;
    let first_class = "dot";
    if (first >= bit_value) {
      first_class += " on";
      first -= bit_value;
    }

    let second_class = "dot";
    if (second >= bit_value) {
      second_class += " on";
      second -= bit_value;
    }
    first_dots.unshift(<div key={"first_" + props.kind + "_" + i} className={first_class}></div>);
    second_dots.unshift(<div key={"second_" + props.kind + "_" + i} className={second_class}></div>);
	}
	return (
			<div key={'d'+props.kind} className="digit">
				{first_dots}
				<br key='br'/>
				{second_dots}
			</div>
	);
}

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App time={new Date()} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
