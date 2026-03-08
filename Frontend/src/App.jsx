import React from 'react'
import { RouterProvider } from 'react-router'
import {router} from "./App.routes.jsx"
import { AuthProvider } from './Feature/Auth/Auth.context.jsx'

const App = () => {
  return (
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App