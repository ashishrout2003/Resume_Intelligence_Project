import { createBrowserRouter } from "react-router"
import Login from "./Feature/Auth/Pages/Login"
import Register  from "./Feature/Auth/Pages/Register";
import Protected from "./Feature/Auth/Components/Protected";


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element:<Protected><h1>Home Page</h1></Protected>
    }
])