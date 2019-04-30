import React, { Component } from 'react';
import classNames from 'classnames';
import { scaleLinear } from 'd3-scale'
import * as d3 from 'd3'

import './styles/index.scss';
import Clock from './components/Clock'
import Settings from './components/Settings'

import moment from 'moment'
import { months, tsToDays, Storage } from './util'

const storage = new Storage()

const clockRadius = 400,
      margin = 30;

const hands = ['Minute', 'Day', 'Year', 'Life']
const pages = { CLOCK: 'clock', SETTINGS: 'settings'}
const faces = {
  'Minute': {
    type: 'Minute',
    value: time => time.seconds(),
    length: -(clockRadius - 60),
    scale: scaleLinear().domain([0, 60]).range([0, 360]),
    balance: 0,
    ticks: d3.range(0, 60, 1),
    hover: val => `Time of day: ${val}`,
    text: d => d,
  },

  /* Shows hours 0-24 */
  'Day': {
    type: 'Day',
    value: time => time.seconds() + (60 * time.minutes()) + (3600 * time.hours()),
    length: -(clockRadius - 100),
    scale: scaleLinear()
      .domain([0, 86400])
      .range([0, 360]),
    balance: 0,
    ticks: d3.range(0, 86400, 3600),
    hover: val => `Time of day: ${val}`,
    text: (d, i) => moment({ hour: d / 3600, minute: 0 }).format('ha')
  },

  /* Shows months 0-12 */
  'Year': {
    type: 'Year',
    value: time => {
      const sy = moment().startOf('year')
      return time.diff(sy, 'days')
    },
    length: -(clockRadius - 100),
    balance: 0,
    ticks: d3.range(0, 360, 30),
    hover: val => `Year: ${val}`,
    text: (d, i) => months[d / 30],
    scale: scaleLinear()
      .domain([0, 365])
      .range([0, 360])
  },

  /* Life age. */
  'Life': {
    type: 'Life',
    value: time => tsToDays(time - storage.getDOB()) / 365,
    length: -(clockRadius - 100),
    balance: 0,
    ticks: d3.range(0, storage.getExp(), 5),
    hover: val => `Age: ${val}`,
    scale: scaleLinear()
      .domain([0, storage.getExp()])
      .range([0, 360]),
    text: (d, i) => {
      if (i === 0) return 'Born'
      else if (d % 10 === 0) return `${d} years`
      else return d
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      face: 'Hours',
      page: pages.CLOCK,
      now: moment()
    }
  }

  componentDidMount() {
    this.ticker = setInterval(
      () => this.tick(),
      1000
    )
    this.setState({
      face: 'Day'
    })
  }

  tick() {
    this.setState({
      now: moment()
    })
  }

  componentWillUnmount() {
    clearInterval(this.ticker)
  }

  renderHands() {
    const setFace = face => {
      this.setState({ face })
    }

    return hands.map(which => {
      return (
        <div key={which} className={classNames("hand-select", { 'active-hand': which === this.state.face })}>
          <button onClick={() => setFace(which)}>{which}</button>
        </div>
      )
    })
  }

  showSettings = () => this.setState({ page: pages.SETTINGS })
  showClock = () => this.setState({ page: pages.CLOCK })

  render() {
    const side = 2 * clockRadius + margin
    const setFace = face => this.setState({ face })

    const clockPage = (
      <div id="container">
        <div className='hands'>
          Show: {this.renderHands()}
        </div>
        {this.state.page === pages.CLOCK && <Clock
          now={this.state.now}
          faces={faces}
          onSetFace={setFace}
          activeFace={this.state.face}
          radius={clockRadius}
          width={side}
          height={side}
          margin={30}
          storage={storage}
        />}
      </div>
    )

    const onSubmit = evt => {
      evt.preventDefault();
      this.setState({ page: pages.CLOCK })
      return true
    }
    const settingsPage = (
      <Settings
        storage={storage}
        onSubmit={onSubmit}
      />
    )

    return (
      <div className='container'>
        <div className='title'>
          <h2>Four Handed Clock</h2>
          <div className="links">
            {this.state.page === pages.CLOCK && <button onClick={() => this.showSettings()}>Settings</button>}
            {this.state.page === pages.SETTINGS && <button onClick={() => this.showClock()}>Clock</button>}
          </div>
        </div>
        {this.state.page === pages.CLOCK && clockPage}
        {this.state.page === pages.SETTINGS && settingsPage}
      </div>
    )
  }
}

export default App;
