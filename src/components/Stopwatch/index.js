// Write your code here
import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {
    isTimerRunning: false,
    timeElapsedInSeconds: 0,
    timerLimitInMinutes: 0,
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  incrementTimeElapsedInSeconds = () => {
    this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }))
  }

  onStart = () => {
    const {isTimerRunning} = this.state

    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  onStop = () => {
    const {isTimerRunning} = this.state

    if (isTimerRunning) {
      this.clearTimerInterval()
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  onReset = () => {
    this.setState({
      isTimerRunning: false,
      timeElapsedInSeconds: 0,
      timerLimitInMinutes: 0,
    })
    this.clearTimerInterval()
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const remainingTime = timerLimitInMinutes * 60 + timeElapsedInSeconds
    if (remainingTime < 59) {
      const minutes = Math.floor(timerLimitInMinutes)
      const seconds = Math.floor(remainingTime)

      const stringifiedminutes = minutes > 9 ? minutes : `0${minutes}`
      const stringifiedseconds = seconds > 9 ? seconds : `0${seconds}`

      return `${stringifiedminutes}:${stringifiedseconds}`
    }
    const minutes = Math.floor(remainingTime / 60)
    const seconds = Math.floor(remainingTime % 60)

    const stringifiedminutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedseconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedminutes}:${stringifiedseconds}`
  }

  render() {
    return (
      <div className="bg-container">
        <h1>StopWatch</h1>
        <div className="stop-watch-container">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              alt="stopwatch"
            />
            <span>Timer</span>
          </div>
          <h1>{this.getElapsedSecondsInTimeFormat()}</h1>
          <div className="buttons">
            <button
              type="button"
              className="start-button"
              onClick={this.onStart}
            >
              Start
            </button>
            <button type="button" className="stop-button" onClick={this.onStop}>
              Stop
            </button>

            <button
              type="button"
              className="reset-button"
              onClick={this.onReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
