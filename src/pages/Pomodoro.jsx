import usePomodoro from '../hooks/usePomodoro.js'

const CIRCUMFERENCE = 2 * Math.PI * 88

function Pomodoro() {
  const {
    isFocus,
    remaining,
    running,
    sessions,
    totalSecs,
    focusCount,
    switchMode,
    start,
    pause,
    reset,
    resetSessions,
    fmt,
  } = usePomodoro()

  const offset = CIRCUMFERENCE * (1 - remaining / totalSecs)
  const pauseDisabled = !running && remaining === totalSecs

  return (
    <>
      <section className="hero">
        <h1 className="text-5xl font-bold tracking-tight mb-4">Pomodoro Timer</h1>
        <p className="text-lg opacity-70 max-w-xl mx-auto">
          Stay focused. Work in sprints, rest well, and track your sessions.
        </p>
      </section>

      <section className="pomodoro-section">
        <div className="pomo-tabs">
          <button
            className={`pomo-tab ${isFocus ? 'active' : ''}`}
            id="tabFocus"
            onClick={() => switchMode(true)}
          >
            Focus
          </button>
          <button
            className={`pomo-tab ${!isFocus ? 'active' : ''}`}
            id="tabBreak"
            onClick={() => switchMode(false)}
          >
            Break
          </button>
        </div>

        <div className="pomo-ring-wrapper">
          <svg className="pomo-ring" viewBox="0 0 200 200">
            <circle className="pomo-ring-bg" cx="100" cy="100" r="88" />
            <circle
              className={`pomo-ring-fill ${!isFocus ? 'break-mode' : ''}`}
              id="pomoRingFill"
              cx="100"
              cy="100"
              r="88"
              style={{ strokeDasharray: CIRCUMFERENCE, strokeDashoffset: offset }}
            />
          </svg>
          <div className="pomo-time-display" id="pomoDisplay">
            {fmt(remaining)}
          </div>
        </div>

        <div className="pomo-controls">
          <button className="pomo-btn" id="pomoStart" onClick={start} disabled={running}>
            Start
          </button>
          <button
            className="pomo-btn pomo-btn-secondary"
            id="pomoPause"
            onClick={pause}
            disabled={pauseDisabled}
          >
            {running ? 'Pause' : 'Resume'}
          </button>
          <button className="pomo-btn pomo-btn-secondary" id="pomoReset" onClick={reset}>
            Reset
          </button>
        </div>

        <div className="pomo-sessions">
          <p>
            Sessions completed today: <span id="pomoCount">{focusCount}</span>
          </p>
          <button id="pomoResetSessions" onClick={resetSessions}>
            Reset Count
          </button>
        </div>

        <div className="pomo-history">
          <h3>Today&apos;s Sessions</h3>
          <ul id="pomoHistoryList">
            {sessions.length === 0 ? (
              <li className="task-empty">No sessions yet. Start focusing!</li>
            ) : (
              [...sessions].reverse().map((s, i) => (
                <li className="pomo-history-item" key={i}>
                  <span>{s.time}</span>
                  <span
                    className={`pomo-history-badge ${
                      s.type === 'focus' ? 'pomo-badge-focus' : 'pomo-badge-break'
                    }`}
                  >
                    {s.type === 'focus' ? 'Focus' : 'Break'}
                  </span>
                  <span>{s.duration}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </section>
    </>
  )
}

export default Pomodoro
