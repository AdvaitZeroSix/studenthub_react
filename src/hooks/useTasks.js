import { useState, useEffect } from 'react'

function useTasks() {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('tasks')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function addTask(text, priority) {
    const taskText = text.trim()
    if (taskText === '') return

    setTasks((prev) => [
      ...prev,
      { text: taskText, completed: false, priority },
    ])
  }

  function completeTask(index) {
    setTasks((prev) =>
      prev.map((task, i) => (i === index ? { ...task, completed: true } : task))
    )
  }

  function deleteTask(index) {
    setTasks((prev) => prev.filter((_, i) => i !== index))
  }

  function clearCompleted() {
    setTasks((prev) => prev.filter((task) => !task.completed))
  }

  return { tasks, addTask, completeTask, deleteTask, clearCompleted }
}

export default useTasks
