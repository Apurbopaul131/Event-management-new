import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/Login";
import Register from "../components/Register";
import AddEvents from "../pages/AddEvents";
import Events from "../pages/Events";
import MyEvents from "../pages/MyEvents";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>page not found!</div>,
    children: [
      {
        index: true,
        element: <div>Welcome to the Event Management Application</div>,
      },
      {
        path: "events",
        element: <PrivateRoute><Events/></PrivateRoute>,
      },
      {
        path: "add-events",
        element: <PrivateRoute><AddEvents /></PrivateRoute>,
      },
      {
        path: "my-events",
        element: <PrivateRoute><MyEvents /></PrivateRoute>,
      },
    ],
  },
  {
    path: "/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  }
]);
