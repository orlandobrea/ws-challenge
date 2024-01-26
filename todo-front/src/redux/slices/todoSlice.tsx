import { createSlice } from "@reduxjs/toolkit";

interface ActionTypeOne {
  payload: Task;
}
interface ActionTypeList {
  payload: Task[];
}

interface StateType {
  todos: Task[];
}

const initialState: StateType = {
  todos: []
}


const todoSlice = createSlice({
  name: 'todoSlice',
  initialState,
  reducers: {
    populateTodo: (state: StateType, action: ActionTypeList) => {
      state.todos = action.payload
    },
    addTodo: (state: StateType, action: ActionTypeOne) => {
      state.todos.push(action.payload)
    },
    removeTodo: (state: StateType, action: ActionTypeOne) => {
      state.todos = state.todos.filter(item => item.id != action.payload.id)
    },
    updateTodo: (state: StateType, action: ActionTypeOne) => {
      state.todos = state.todos.map(item => {
        if (item.id == action.payload.id) {
          item.name = action.payload.name;
          item.done = action.payload.done;
        }
        return item
      })
    }
  }
})

export const { populateTodo, addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
