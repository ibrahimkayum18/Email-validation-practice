import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Components/MainLayout/MainLayout";
import Home from "../Components/Home/Home";
import LogIn from "../Components/LogIn/LogIn";
import Registration from "../Components/Registration/Registration";


const Route = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <LogIn></LogIn>
            },
            {
                path: '/registration',
                element: <Registration></Registration>
            }
        ]
    }
])

export default Route;