import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./App.routes.jsx";
import { AuthProvider } from "./Feature/Auth/Auth.context.jsx";
import { InterviewProvider } from "./Feature/Interview/interview.context.jsx";
const App = () => {
  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  );
};

export default App;
