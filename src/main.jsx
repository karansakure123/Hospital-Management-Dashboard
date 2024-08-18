import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./ErrorBoundary"; // Import the AuthProvider
import { Toaster } from 'react-hot-toast'; // Import Toaster

// Render the App wrapped in AuthProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <Toaster position="top-center" />  
    </AuthProvider>
  </React.StrictMode>
);
