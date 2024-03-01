import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@a1rth/css-normalize'
import './styles/index.css'
import { Provider } from 'react-redux'
import { store } from './store/index.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>Error</h1>,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} >
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>,
)
