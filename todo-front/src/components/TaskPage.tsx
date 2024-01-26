import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, populateTodo, removeTodo, updateTodo } from '../redux/slices/todoSlice';
import { socket } from '../socket';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

export default function TaskPage() {
  const todos = useSelector((state: any) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    const onAddedTask = (task: Task) => {
      dispatch(addTodo(task))
    }
    const onRemovedTask = (task: Task) => {
      dispatch(removeTodo(task))
    }
    const onUpdateTask = (task: Task) => {
      dispatch(updateTodo(task))
    }
    const onLoad = (tasks: Task[]) => {
      dispatch(populateTodo(tasks))
    }
    socket.on('add', onAddedTask);
    socket.on('remove', onRemovedTask);
    socket.on('update', onUpdateTask);
    socket.on('load', onLoad);
    socket.emit('events', { type: 'load' })
    return () => {
      socket.off('add', onAddedTask);
      socket.off('remove', onRemovedTask);
      socket.off('update', onUpdateTask);
      socket.off('load', onUpdateTask);
    };
  }, []);

  const onAddTask = (task: Task) => {
    socket.emit('events', { type: 'add', data: task })
  }

  const onRemoveTask = (task: Task) => {
    socket.emit('events', { type: 'remove', data: task })
  }

  const onToggleDone = (task: Task) => {
    socket.emit('events', { type: 'update', data: { ...task, done: !task.done } })
  }

  return (
    <div className="w-full bg-black/60 bg-cover h-screen flex flex-col content-center items-center">
      <TaskForm onAdd={onAddTask} />
      <TaskList list={todos} onRemove={onRemoveTask} onToggleDone={onToggleDone} />
    </div>
  )
}
