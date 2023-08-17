import Navbar from "./Pages/Navbar"
import Login from "./Pages/Login"
import Dashboard from "./Pages/Dashboard"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Pages/Home"


function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    }
  ])

  return(
    <>
      <Navbar/>
      <RouterProvider router={routes}/>
    </>

  )
}

export default App
