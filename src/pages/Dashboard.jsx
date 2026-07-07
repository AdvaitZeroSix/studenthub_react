import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card.jsx'
import useTasks from '../hooks/useTasks.js'

function Dashboard() {
  const navigate = useNavigate()
  const { tasks, addTask, completeTask, deleteTask, clearCompleted } = useTasks()
  const [taskInput, setTaskInput] = useState('')
  const [priority, setPriority] = useState('low')

  const pendingTasks = tasks.filter((task) => !task.completed)
  const completedTasks = tasks.filter((task) => task.completed)

  function handleAddTask() {
    addTask(taskInput, priority)
    setTaskInput('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAddTask()
  }

  function scrollToTasks() {
    document.getElementById('task-section').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <section className="hero">
        <h1 className="text-5xl font-bold tracking-tight mb-4">Your Dashboard</h1>
        <p className="text-lg opacity-70 max-w-xl mx-auto mb-8">
          Manage your notes, tasks, and focus sessions all in one place.
        </p>
      </section>

      <section className="features py-16 px-10 text-center">
        <h2 className="text-2xl font-bold mb-8 tracking-tight">Dashboard Features</h2>
        <div className="feature-container">
          <Card
            title="Notes Storage"
            description="Store and organize your study notes in one place."
          >
            <button onClick={() => navigate('/notes')}>Go to Notes</button>
          </Card>
          <Card
            title="Pomodoro Timer"
            description="Stay focused with 25 and 5 minute work and break sprints."
          >
            <button onClick={() => navigate('/pomodoro')}>Open Timer</button>
          </Card>
          <Card
            title="Expense Tracker"
            description="Track your daily expenses with MongoDB."
          >
            <button onClick={() => navigate('/expenses')}>Open Expenses</button>
          </Card>
          <Card
            title="Tasks Manager"
            description="Manage assignments and deadlines efficiently"
          >
            <button onClick={scrollToTasks}>Go to Tasks</button>
          </Card>
        </div>
      </section>

      <section className="task-manager" id="task-section">
        <h2 className="text-2xl font-bold mb-8 tracking-tight">Task Manager</h2>
        <div className="task-input-container">
          <input
            type="text"
            id="taskInput"
            placeholder="Enter a task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <select
            id="prioritySelect"
            className="priority-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button id="addTaskBtn" onClick={handleAddTask}>
            Add Task
          </button>
        </div>

        <ul id="taskList">
          {pendingTasks.length === 0 && completedTasks.length === 0 && (
            <li className="task-empty">No tasks yet. Add one above!</li>
          )}

          {pendingTasks.map((task) => {
            const originalIndex = tasks.indexOf(task)
            const badgeLabel = task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
            return (
              <li className="task-item" key={originalIndex} data-index={originalIndex}>
                <input type="checkbox" onChange={() => completeTask(originalIndex)} />
                {task.text}
                <span className={`badge badge-${task.priority}`}>{badgeLabel}</span>
                <button
                  className="task-delete"
                  aria-label="Delete task"
                  onClick={() => deleteTask(originalIndex)}
                >
                  &#x2715;
                </button>
              </li>
            )
          })}

          {completedTasks.length > 0 && (
            <li className="completed-heading">
              <h3>Completed Tasks</h3>
            </li>
          )}

          {completedTasks.map((task) => {
            const originalIndex = tasks.indexOf(task)
            return (
              <li className="completed-task" key={originalIndex}>
                {task.text}
                <button
                  className="task-delete"
                  aria-label="Delete task"
                  onClick={() => deleteTask(originalIndex)}
                >
                  &#x2715;
                </button>
              </li>
            )
          })}
        </ul>
        <button id="clearHistoryBtn" onClick={clearCompleted}>
          Clear Completed
        </button>
      </section>
    </>
  )
}

export default Dashboard
