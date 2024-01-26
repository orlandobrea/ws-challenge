import './App.css'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import TaskPage from './components/TaskPage'
function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <TaskPage />
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
