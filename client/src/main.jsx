import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Landing from './pages/Landing.jsx'
import Dashboard from './pages/Dashboard.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/', 
    element: <App/>,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: '/Home',
        element: <Dashboard />
      },
    ]
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
