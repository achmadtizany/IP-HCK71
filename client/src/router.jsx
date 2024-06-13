import {createBrowserRouter, redirect } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import MainLayout from "./components/MainLayout"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import AgentAi from "./pages/AgentAi"
import AddPage from "./pages/AddPage"
import AgentPage from "./pages/AgentPage"
import AgentDetail from "./pages/AgentDetail"


const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
        loader: () => {
            if (localStorage.getItem("token")) {
                return redirect("/")
            }
            return null
        }
    },
    {
        path: "/register",
        element: <RegisterPage />,
        loader: () => {
            if (localStorage.getItem("token")) {
                return redirect("/login")
            }
            return null
        }
    },
    {
        element: <MainLayout />,
        loader: () => {
            if (!localStorage.getItem("token")) {
                return redirect("/login")
            }
            return null
        },
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path:"/agents/:id",
                element: <AgentDetail/>
            },
            {
                path: "/helpMe",
                element: <AgentAi/>
            },
            {
                path: "/agents-detail/:id",
                element: <AddPage />
            },
            {
                path: "/agents-add",
                element: <AddPage />
            },
            {
                path: "/table",
                element: <AgentPage />
            }
        ]
    }
])


export default router