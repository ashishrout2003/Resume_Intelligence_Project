import { createBrowserRouter } from "react-router"
import Login from "./Feature/Auth/Pages/Login"
import Register  from "./Feature/Auth/Pages/Register";
import Protected from "./Feature/Auth/Components/Protected";
import Home from "./Feature/Interview/Pages/Home";
import Interview from "./Feature/Interview/Pages/Interview";

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
        element:<Protected><Home /></Protected>
    },
    {
        path: "/interview/:interviewId",
        element: <Protected><Interview /></Protected>   
    }
])