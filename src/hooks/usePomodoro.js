import { useState, useEffect, useRef } from 'react'

const FOCUS_SECS = 25 * 60
const BREAK_SECS = 5 * 60

function getTodayKey() {
  return 'pomo_' + new Date().toISOString().slice(0, 10)
}

function loadSessions() {
  try {
    return JSON.parse(localStorage.getItem(getTodayKey())) || []
  } catch {
    return []
  }
}

function saveSessions(sessions) {
  localStorage.setItem(getTodayKey(), JSON.stringify(sessions))
}

function fmt(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, '0')
  const s = String(secs % 60).padStart(2, '0')
  return `${m}:${s}`
}

function usePomodoro() {
  const [isFocus, setIsFocus] = useState(true)
  const [remaining, setRemaining] = useState(FOCUS_SECS)
  const [running, setRunning] = useState(false)
  const [sessions, setSessions] = useState(() => loadSessions())
  const intervalRef = useRef(null)

  const totalSecs = isFocus ? FOCUS_SECS : BREAK_SECS

  // countdown ticker
  useEffect(() => {
    if (!running) return

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => Math.max(prev - 1, 0))
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [running])

  // handle a session finishing
  useEffect(() => {
    if (remaining !== 0) return

    clearInterval(intervalRef.current)
    setRunning(false)

    const newSessions = loadSessions()
    const now = new Date()
    newSessions.push({
      type: isFocus ? 'focus' : 'break',
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      duration: isFocus ? '25 min' : '5 min',
    })
    saveSessions(newSessions)
    setSessions(newSessions)

    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      new Notification(isFocus ? 'Time to focus!' : 'Take a break. Well done!')
    }

    const nextFocus = !isFocus
    setIsFocus(nextFocus)
    setRemaining(nextFocus ? FOCUS_SECS : BREAK_SECS)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining])

  // keep tab title in sync
  useEffect(() => {
    document.title = `${fmt(remaining)} - ${isFocus ? 'Focus' : 'Break'} | Student Hub`
  }, [remaining, isFocus])

  function switchMode(focus) {
    setIsFocus(focus)
    setRemaining(focus ? FOCUS_SECS : BREAK_SECS)
    setRunning(false)
    clearInterval(intervalRef.current)
  }

  function start() {
    if (running) return
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission()
    }
    setRunning(true)
  }

  function pause() {
    setRunning((prev) => !prev)
  }

  function reset() {
    clearInterval(intervalRef.current)
    setRunning(false)
    setRemaining(totalSecs)
  }

  function resetSessions() {
    saveSessions([])
    setSessions([])
  }

  const focusCount = sessions.filter((s) => s.type === 'focus').length

  return {
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
  }
}

export default usePomodoro
