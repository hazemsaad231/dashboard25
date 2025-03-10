import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/home'
import Users from './components/Users/users'
import AddUser from './components/Add/UpdateUser/addUser'
import Profile from './components/Profile/profile'
import Master1 from './components/Routing/master1'
import Master2 from './components/Routing/master2'
import Sign from './components/login/signIn'
import PrivateRoute from './components/Routing/protuct'


function App() {

  const route = createBrowserRouter([
    {

      path:'/',
      element:<Master1/>,
      children:[
        {index: true, element: <Sign/>},
        {path: "signIn", element: <Sign/>},
      ]
    },
    
    {
      path: "dashboard",
     element:<PrivateRoute><Master2/></PrivateRoute>,
      errorElement: <h1>Page Not Found</h1>,
      children:[
        {index: true, element: <Home/>},
        {path: "home", element: <Home/>},
        {path: "users", element: <Users/>},
        {path: "addUser", element: <AddUser/>},
        {path: "addUser/:id", element: <AddUser/>},
        {path: "profile", element: <Profile/>},

      ]
    },
   
  ])

  return (
    <>
    
  <RouterProvider router={route} ></RouterProvider>
     
    </>
  )
}

export default App
