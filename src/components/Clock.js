import React, { Component } from 'react'
import * as d3 from "d3";
import PropTypes from 'prop-types'

class Clock extends Component {
  static propTypes = {
    radius: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.number.isRequired,
    faces: PropTypes.object.isRequired,
    activeFace: PropTypes.string,
    onSetFace: PropTypes.func.isRequired,
    now: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      activeFace: 'Minute'
    }
  }

  componentDidMount() {
    this.drawFrame()
    this.drawFace('Minute')
    this.drawFace('Day')
    this.drawFace('Year')
    this.drawFace('Life')
    this.drawCover()
  }

  componentDidUpdate() {
    Object.keys(this.props.faces).forEach(face => {
      const { scale, value } = this.props.faces[face]

      d3.selectAll(`.${face}-arm`)
        .data([value(this.props.now)])
        .transition()
        .attr('transform', d => `rotate(${scale(value(this.props.now))})`)
    })

    d3.selectAll('.clock-face').classed('enabled', false)
    d3.select(`#${this.state.activeFace}-face`).classed('enabled', true)
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if(nextProps.activeFace !== prevState.activeFace) {
      return { activeFace: nextProps.activeFace }
    }
    return {}
  }

  drawFrame() {
    this.svg = this.svg
      .attr('id', 'clock')
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${this.props.width + (2 * this.props.margin)} ${this.props.height + (2 * this.props.margin)}`)
      .classed("svg-content-responsive", true);

    this.face = this.svg.append('g')
      .attr('transform', `translate(${this.props.radius + this.props.margin},${this.props.radius + this.props.margin})`)

    this.face.append('g')
      .append('circle')
      .attr('id', 'clock-background')
      .attr('x', 0)
      .attr('y', 0)
      .attr('r', this.props.radius)
  }

  drawCover() {
    /* Inner circle. */
    this.face.append('g')
      .attr('id', 'face-overlay')
      .append('circle').attr('class', 'hands-cover')
      .attr('x', 0)
      .attr('y', 0)
      .attr('r', 8);
  }

  drawFace(which) {
    const clock = this.props.faces[which]

    const faceId = `${which}-face`
    const _face = this.face.append('g')
      .datum(clock)
      .attr('id', faceId)
      .attr('class', 'clock-face')
      .on('click', (d, i) => {
        console.info(d.type)
        this.props.onSetFace(d.type)
      })

    // Major Ticks
    _face.selectAll(`.${which}-tick`)
      .data(clock.ticks)
      .enter()
      .append('line')
      .attr('class', `${which}-tick guide`)
      .attr('x1', 0).attr('x2', 0)
      .attr('y1', this.props.radius)
      .attr('y2', this.props.radius - 10)
      .attr('transform', d => `rotate(${clock.scale(d)})`);

    // Minor Ticks
    _face.selectAll(`.${which}-tick`)
      .data(clock.ticks)
      .enter()
      .append('line')
      .attr('class', `${which}-tick guide`)
      .attr('x1', 0).attr('x2', 0)
      .attr('y1', this.props.radius)
      .attr('y2', this.props.radius - 10)
      .attr('transform', d => `rotate(${clock.scale(d)})`);

    const labelRadius = this.props.radius - 40
    const radians = 0.0174532925

    _face.selectAll(`.${which}-label`)
      .data(clock.ticks).enter()
      .append('text')
      .attr('class', `${which}-label guide`)
      .attr('text-anchor', 'middle')
      .attr('x', d => labelRadius * Math.sin(clock.scale(d) * radians))
      .attr('y', d => -labelRadius * Math.cos(clock.scale(d) * radians))
      .text(clock.text)

    _face.selectAll(`.${which}-arm`)
      .data([clock])
      .enter()
      .append('line')
      .attr('class', d => `${d.type}-arm arm`)
      .attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', d => d.length)
      .attr('transform', d => `rotate(${d.scale(d.value(this.props.now))})`)
  }

  render() {
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        ref={handle => (this.svg = d3.select(handle))}>
      </svg>
    )
  }
}

export default Clock
