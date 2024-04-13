// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timeLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => clearInterval(this.intervalId)

  onDecreaseInMinutes = () => {
    this.setState(prevState => ({
      timeLimitInMinutes: prevState.timeLimitInMinutes - 1,
    }))
  }

  onIncreaseInMinutes = () => {
    this.setState(prevState => ({
      timeLimitInMinutes: prevState.timeLimitInMinutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timeLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonDisabled = timeElapsedInSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label"> Set Timer limit </p>
        <div className="timer-limit-controller">
          <button
            type="button"
            onClick={this.onDecreaseInMinutes}
            disabled={isButtonDisabled}
            className="limit-control-btn"
          >
            -
          </button>
          <div className="limit-label-value-container">
            <p className="limit-value"> {timeLimitInMinutes} </p>
          </div>
          <button
            type="button"
            onClick={this.onIncreaseInMinutes}
            disabled={isButtonDisabled}
            className="limit-control-btn"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimeInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSec = () => {
    const {timeElapsedInSeconds, timeLimitInMinutes} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timeLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPause = () => {
    const {timeElapsedInSeconds, timeLimitInMinutes} = this.state
    const {isTimerRunning} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timeLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSec, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const onStartOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    const onStartOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    return (
      <div className="timer-controller-container">
        <button
          type="button"
          onClick={this.onStartOrPause}
          className="timer-controller-btn"
        >
          <img
            src={onStartOrPauseImgUrl}
            alt={onStartOrPauseAltText}
            className="timer-controller-icon"
          />
          <p className="timer-controller-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>

        <button
          type="button"
          onClick={this.onResetTimer}
          className="timer-controller-btn"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="timer-controller-icon"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainSeconds = timeLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainSeconds / 60)
    const seconds = Math.floor(totalRemainSeconds % 60)
    const stringifiedMin = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSec = minutes > 9 ? seconds : `0${seconds}`

    return `${stringifiedMin} : ${stringifiedSec}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading"> Digital Timer </h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-controller">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-state"> {labelText} </p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
