import { createBrowserRouter } from "react-router-dom";
import AddNew from "../pages/AddNew";
import Edit from "../pages/Edit";
import Home from "../pages/Home";
import Main from "../pages/Main";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/addNew',
                element: <AddNew />
            },
            {
                path: '/edit/:id',
                element: <Edit />
            }
        ]
    }
])