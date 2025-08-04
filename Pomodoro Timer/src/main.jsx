import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './Pages/Home/Home.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />  {/* Use RouterProvider here */}
  </StrictMode>
)