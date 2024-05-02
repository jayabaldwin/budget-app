import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
// import Error from './pages/Error.jsx'
// import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
// import Finances from './pages/Finances.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/', 
    element: <App/>,
    // errorElement: <Error/>
    children: [
      {
        index: true,
        element: <Dashboard />
      },
    //   {
    //     path: '/Dashboard',
    //     element: <Dashboard />
    //   },
    //   {
    //     path: '/Finances',
    //     element: <Finances />
    //   },
    ]
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
